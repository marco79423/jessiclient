import {useDispatch, useSelector} from 'react-redux'
import {useGA4React} from 'ga-4-react'
import {getMessageCount, getSettingMaxMessageCount} from '../../selectors'
import React, {useState} from 'react'
import useAsyncEffect from 'use-async-effect'
import {changeConnectionState, changeProjectState, changeScheduleEnabledStatus} from '../../slices/current'
import {LoadingState, MessageSource} from '../../constants'
import wsClient from '../../features/wsClient'
import {appendMessage, removeFirstMessage, setProjectData} from '../../slices/project'
import generateRandomString from '../../utils/generateRandomString'
import scheduler from '../../features/scheduler'
import Alert from '../elements/Alert'
import {loadProjectDataFromLocalStorage, loadProjectDataFromSharingServer} from '../../features/project'

export default function AppController({children}) {
  const dispatch = useDispatch()
  const ga4React = useGA4React()

  const maxMessageCount = useSelector(getSettingMaxMessageCount)
  const messageCount = useSelector(getMessageCount)

  const [errorAlertOpen, setErrorAlert] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')


  const showErrorAlert = () => {
    setErrorAlert(true)
  }

  const hideAlert = () => {
    setErrorAlert(false)
  }


  useAsyncEffect(async () => {
    await dispatch(changeProjectState(LoadingState.Loading))

    wsClient.setOnConnectionChange(connectionState => dispatch(changeConnectionState(connectionState)))
    wsClient.setOnError(error => console.log(error))
    wsClient.setOnNewMessage(async message => {
      if (messageCount >= maxMessageCount) {
        await dispatch(removeFirstMessage())
      }

      await dispatch(appendMessage({
        id: generateRandomString(),
        time: new Date().toISOString(),
        source: MessageSource.Server,
        text: message,
      }))
    })
    wsClient.setOnClose(() => {
      scheduler.disable()
      dispatch(changeScheduleEnabledStatus(false))
    })

    const projectData = await loadProjectData()
    if (projectData) {
      await dispatch(setProjectData(projectData))
    }

    await dispatch(changeProjectState(LoadingState.Loaded))
  }, [])

  const connect = (url) => {
    wsClient.connect(url)
    ga4React.gtag('event', 'connect', {url})
  }

  const disconnect = () => {
    wsClient.close()
  }

  const sendMessage = async (message) => {
    wsClient.send(message)

    if (messageCount >= maxMessageCount) {
      await dispatch(removeFirstMessage())
    }

    await dispatch(appendMessage({
      id: generateRandomString(),
      time: new Date().toISOString(),
      source: MessageSource.Client,
      text: message,
    }))

    ga4React.gtag('event', 'send_message')
  }

  const enableScheduler = async (message, timeInterval) => {
    scheduler.setOnEvent(async () => {
      await sendMessage(message)
    })
    scheduler.enable(timeInterval)
  }

  const disableScheduler = () => {
    scheduler.disable()
  }

  const throwError = (message) => {
    setErrorMessage(message)
    showErrorAlert()
  }

  const appController = {
    connect,
    disconnect,
    sendMessage,
    throwError,
    enableScheduler,
    disableScheduler
  }

  return (
    <>
      {React.cloneElement(children, {appController})}

      <Alert
        open={errorAlertOpen}
        message={errorMessage}
        onClose={hideAlert}
      />
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
