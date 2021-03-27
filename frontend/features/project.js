import axios from 'axios'
import {Validator} from 'jsonschema'
import fileDialog from 'file-dialog'


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
