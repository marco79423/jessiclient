import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import useAsyncEffect from 'use-async-effect'
import getConfig from 'next/config'
import {nanoid} from 'nanoid'
import axios from 'axios'
import fileDialog from 'file-dialog'
import {useTranslation} from 'next-i18next'
import {Backdrop, CircularProgress} from '@material-ui/core'

import {LoadingState} from '../../constants'
import {
  selectFavoriteRequestCategories,
  selectProjectData,
  selectProjectDataWithoutMessages,
  selectProjectState
} from '../../redux/selectors'
import {changeProjectState, changeShareLink} from '../../redux/current'
import {addFavoriteRequestCategory, setProjectData} from '../../redux/project'
import {useNotifications} from '../notifications'
import {useTracker} from '../tracker'
import {downloadJsonData} from '../../utils/jsDownloader'


const {publicRuntimeConfig} = getConfig()
export const ProjectVersion = publicRuntimeConfig.projectVersion
export const BackendURL = publicRuntimeConfig.backendUrl

export const ProjectContext = React.createContext({})

/**
 * 處理 Project Loader 的 Provider
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export default function ProjectProvider({children}) {
  const dispatch = useDispatch()
  const notifications = useNotifications()
  const tracker = useTracker()
  const {t} = useTranslation()

  const projectState = useSelector(selectProjectState)
  const projectData = useSelector(selectProjectData)
  const favoriteRequestCategories = useSelector(selectFavoriteRequestCategories)
  const projectDataWithoutMessages = useSelector(selectProjectDataWithoutMessages)

  useAsyncEffect(async () => {
    await dispatch(changeProjectState(LoadingState.Loading))

    const projectData = await loadProjectData()
    if (projectData) {
      console.log('aaaa', projectData.version, ProjectVersion)
      if (projectData.version !== ProjectVersion) {
        await saveProjectDataToLocalStorage(null)
        notifications.showErrorMessage(t('本地專案版本過期'))
      } else {
        await dispatch(setProjectData(projectData))
      }
    }

    if (favoriteRequestCategories.length === 0) {
      dispatch(addFavoriteRequestCategory({
        id: nanoid(),
        label: t('未分類'),
        readonly: true,
      }))
    }

    await dispatch(changeProjectState(LoadingState.Loaded))
  }, [])

  useAsyncEffect(async () => {
    if (projectState === LoadingState.Loaded) {
      await saveProjectDataToLocalStorage(projectData)
    }
  }, [projectData, projectState])

  const exportProject = ({filename, messageIncluded}) => {
    downloadJsonData(filename, messageIncluded ? projectData : projectDataWithoutMessages)
    tracker.trace('export_project', {messageIncluded})
  }

  const importProject = async () => {
    const projectData = await loadProjectDataFromFile()
    if (projectData.version !== ProjectVersion) {
      await saveProjectDataToLocalStorage(null)
      notifications.showErrorMessage(t('本地專案版本過期'))
    } else {
      await dispatch(setProjectData(projectData))
    }
    tracker.trace('import_project')
  }

  const generateShareLink = async ({messageIncluded}) => {
    tracker.trace('generate_share_link', {messageIncluded})

    try {
      const projectCode = await saveProjectDataToSharingServer(messageIncluded ? projectData : projectDataWithoutMessages)
      const shareLink = `${window.location.origin}?projectCode=${projectCode}`
      await dispatch(changeShareLink(shareLink))
      return shareLink
    } catch (e) {
      console.log(e)
      notifications.showErrorMessage(t('產生分享連結失敗'))
    }
  }

  const context = {
    projectState,

    exportProject,
    importProject,

    generateShareLink,
  }

  return (
    <>
      <Backdrop style={{zIndex: 100}} open={projectState === LoadingState.Loading}>
        <CircularProgress color="inherit"/>
      </Backdrop>

      <ProjectContext.Provider value={context}>
        {children}
      </ProjectContext.Provider>
    </>
  )
}

async function loadProjectData() {
  const projectCode = new URLSearchParams(window.location.search).get('projectCode')
  if (projectCode) {
    return await loadProjectDataFromSharingServer(projectCode)
  }

  try {
    return await loadProjectDataFromLocalStorage()
  } catch {
    return null
  }
}

export async function saveProjectDataToSharingServer(projectData) {
  const resp = await axios.post(`${BackendURL}/api/jessiclient/sharing/projects`, projectData)
  return resp.data.data.projectCode
}

export async function loadProjectDataFromSharingServer(projectCode) {
  const resp = await axios.get(`${BackendURL}/api/jessiclient/sharing/projects/${projectCode}`)
  return resp.data.data
}

export async function saveProjectDataToLocalStorage(projectData) {
  localStorage.setItem('projectData', JSON.stringify(projectData))
}

export async function loadProjectDataFromLocalStorage() {
  const rawProjectData = localStorage.getItem('projectData')
  return JSON.parse(rawProjectData)
}

export async function loadProjectDataFromFile() {
  const files = await fileDialog({accept: '.json'})
  const selectedFile = files[0]

  return await new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = () => {
      const data = fileReader.result
      const projectData = JSON.parse(data)
      resolve(projectData)
    }
    fileReader.readAsText(selectedFile, 'UTF-8')
  })
}
