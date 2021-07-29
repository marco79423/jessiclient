import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getProjectData, getProjectDataWithoutMessages, getProjectState} from '../../redux/selectors'
import {downloadJsonData} from '../../utils/jsDownloader'
import useTracker from '../tracker/useTracker'
import {setProjectData} from '../../redux/project'
import useAsyncEffect from 'use-async-effect'
import {changeProjectState} from '../../redux/current'
import {LoadingState} from '../../constants'
import axios from 'axios'
import fileDialog from 'file-dialog'
import {Validator} from 'jsonschema'


export default function useProjectLoader() {
  const dispatch = useDispatch()
  const tracker = useTracker()

  const projectState = useSelector(getProjectState)
  const projectData = useSelector(getProjectData)
  const projectDataWithoutMessages = useSelector(getProjectDataWithoutMessages)

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
    const projectCode = await saveProjectDataToSharingServer(messageIncluded ? projectData : projectDataWithoutMessages)
    const shareLink = `${window.location.origin}?projectCode=${projectCode}`
    tracker.trace('generate_share_link', {messageIncluded})
    return shareLink
  }

  useAsyncEffect(async () => {
    await dispatch(changeProjectState(LoadingState.Loading))

    const projectData = await loadProjectData()
    if (projectData) {
      await dispatch(setProjectData(projectData))
    }

    await dispatch(changeProjectState(LoadingState.Loaded))
  }, [])

  return {
    projectState,

    exportProject,
    importProject,

    generateShareLink,
  }
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
  const projectData = JSON.parse(rawProjectData)

  const result = await validateProjectData(projectData)
  if (!result.valid) {
    throw new Error(result.toString())
  }

  return projectData
}

export async function loadProjectDataFromFile() {
  const files = await fileDialog({accept: '.json'})
  const selectedFile = files[0]

  const projectData = await new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = () => {
      const data = fileReader.result
      const projectData = JSON.parse(data)
      resolve(projectData)
    }
    fileReader.readAsText(selectedFile, 'UTF-8')
  })

  const result = await validateProjectData(projectData)
  if (!result.valid) {
    throw new Error(result.toString())
  }

  return projectData
}

export async function validateProjectData(projectData) {
  const resp = await axios.get('/api/schema/project.json')
  const schema = resp.data

  const validator = new Validator()
  return validator.validate(projectData, schema)
}
