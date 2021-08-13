import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import fileDialog from 'file-dialog'
import {useTranslation} from 'next-i18next'

import useTracker from '../tracker/useTracker'
import {downloadJsonData} from '../../utils/jsDownloader'
import {selectProjectData, selectProjectDataWithoutMessages, selectProjectState} from '../../redux/selectors'
import {setProjectData} from '../../redux/project'
import {changeShareLink} from '../../redux/current'
import {useNotifications} from '../notifications'


export default function useProject() {
  const dispatch = useDispatch()
  const tracker = useTracker()
  const notifications = useNotifications()
  const {t} = useTranslation()

  const projectState = useSelector(selectProjectState)
  const projectData = useSelector(selectProjectData)
  const projectDataWithoutMessages = useSelector(selectProjectDataWithoutMessages)

  const exportProject = ({filename, messageIncluded}) => {
    downloadJsonData(filename, messageIncluded ? projectData : projectDataWithoutMessages)
    tracker.trace('export_project', {messageIncluded})
  }

  const importProject = async () => {
    const projectData = await loadProjectDataFromFile()
    dispatch(setProjectData(projectData))
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

  return {
    projectState,

    exportProject,
    importProject,

    generateShareLink,
  }
}


export async function saveProjectDataToSharingServer(projectData) {
  const resp = await axios.post('/api/sharing/projects', projectData)
  return resp.data.data.projectCode
}

export async function loadProjectDataFromSharingServer(projectCode) {
  const resp = await axios.get(`/api/sharing/projects/${projectCode}`)
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
