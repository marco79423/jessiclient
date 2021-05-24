import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {GA4React} from 'ga-4-react'
import useAsyncEffect from 'use-async-effect'
import {useTranslation} from 'next-i18next'

import {getProjectData, getProjectDataWithoutMessages} from '../../selectors'
import {changeConnectionState, changeProjectState, changeScheduleEnabledStatus} from '../../slices/current'
import {LoadingState, MessageSource} from '../../constants'
import {appendMessage, setProjectData} from '../../slices/project'
import generateRandomString from '../../utils/generateRandomString'
import {
  loadProjectDataFromFile,
  loadProjectDataFromLocalStorage,
  loadProjectDataFromSharingServer,
  saveProjectDataToSharingServer
} from '../../features/project'
import {downloadJsonData} from '../../utils/jsDownloader'
import WSClient from '../../utils/WSClient'
import Scheduler from '../../utils/Scheduler'
import Alert from '../elements/Alert'


export default function AppController({children}) {
  const dispatch = useDispatch()
  const {t} = useTranslation('common')

  const projectData = useSelector(getProjectData)
  const projectDataWithoutMessages = useSelector(getProjectDataWithoutMessages)
  const track = useTrackFunc()

  const [alert, setAlert] = useState({})
  const [wsClient, setWSClient] = useState(null)
  const [scheduler, setScheduler] = useState(null)

  const showErrorAlert = (message) => {
    setAlert({
      severity: 'error',
      open: true,
      message,
    })
  }

  const showSuccessAlert = (message) => {
    setAlert({
      severity: 'success',
      open: true,
      message,
    })
  }

  const hideAlert = () => {
    setAlert({
      open: false,
    })
  }

  const connect = (url) => {
    wsClient.connect(url)
    track('connect', {url})
  }

  const disconnect = () => {
    wsClient.close()
  }

  const sendMessage = async (message) => {
    wsClient.send(message)

    await dispatch(appendMessage({
      id: generateRandomString(),
      time: new Date().toISOString(),
      source: MessageSource.Client,
      body: message,
    }))

    track('send_message')
    showSuccessAlert(t('請求已送出'))
  }

  const enableScheduler = async (message, timeInterval) => {
    scheduler.enable(async () => {
      await sendMessage(message)
    }, timeInterval)
    await dispatch(changeScheduleEnabledStatus(true))
  }

  const disableScheduler = async () => {
    scheduler.disable()
    await dispatch(changeScheduleEnabledStatus(false))
  }

  const exportProject = ({filename, messageIncluded}) => {
    downloadJsonData(filename, messageIncluded ? projectData : projectDataWithoutMessages)
    track('export_project', {messageIncluded})
  }

  const importProject = async () => {
    const projectData = await loadProjectDataFromFile()
    dispatch(setProjectData(projectData))
    track('import_project')
  }

  const generateShareLink = async ({messageIncluded}) => {
    const projectCode = await saveProjectDataToSharingServer(messageIncluded ? projectData : projectDataWithoutMessages)
    const shareLink = `${window.location.origin}?projectCode=${projectCode}`
    track('generate_share_link', {messageIncluded})
    return shareLink
  }

  const throwError = (message) => {
    showErrorAlert(message)
  }

  useAsyncEffect(async () => {
    await dispatch(changeProjectState(LoadingState.Loading))

    const wsClient = new WSClient()
    wsClient.setOnConnectionChange(connectionState => dispatch(changeConnectionState(connectionState)))
    wsClient.setOnError(error => {
      console.log(error)
      showErrorAlert(t('連線建立失敗'))
    })
    wsClient.setOnNewMessage(async message => {
      await dispatch(appendMessage({
        id: generateRandomString(),
        time: new Date().toISOString(),
        source: MessageSource.Server,
        body: message,
      }))
    })
    wsClient.setOnClose(() => {
      scheduler.disable()
      dispatch(changeScheduleEnabledStatus(false))
    })
    setWSClient(wsClient)

    const scheduler = new Scheduler()
    setScheduler(scheduler)

    const projectData = await loadProjectData()
    if (projectData) {
      await dispatch(setProjectData(projectData))
    }

    await dispatch(changeProjectState(LoadingState.Loaded))
  }, [])


  const appController = {
    track,

    connect,
    disconnect,

    sendMessage,

    enableScheduler,
    disableScheduler,

    exportProject,
    importProject,

    generateShareLink,

    throwError,
  }

  return (
    <>
      {React.cloneElement(children, {appController})}

      <Alert
        open={alert.open}
        severity={alert.severity}
        message={alert.message}
        onClose={hideAlert}
      />
    </>
  )
}


function useTrackFunc() {
  const [gaObj, setGAObj] = useState(null)

  useEffect(() => {
    if (!gaObj) {
      const ga4react = new GA4React('G-TQZV496TYL')
      ga4react.initialize()
        .then((ga4) => {
          setGAObj(ga4)
        })
        .catch(() => {
          // 什麼都不做
        })
    }
  }, [])

  return (key, data) => {
    if (gaObj) {
      gaObj.gtag('event', key, data)
    }
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
