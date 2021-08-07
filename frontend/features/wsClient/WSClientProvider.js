import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import useAsyncEffect from 'use-async-effect'

import {changeConnectionState, changeScheduleEnabledStatus} from '../../redux/current'
import {MessageSource} from '../../constants'
import generateRandomString from '../../utils/generateRandomString'
import WSClient from '../../utils/WSClient'
import {appendMessage} from '../../redux/project'
import useTracker from '../tracker/useTracker'
import Scheduler from '../../utils/Scheduler'
import useAlerter from '../alerter/useAlerter'
import {useTranslation} from 'next-i18next'


export const WSClientContext = React.createContext({
  ready: false,
})


export default function WSClientProvider({children}) {
  const dispatch = useDispatch()
  const tracker = useTracker()
  const alerter = useAlerter()
  const {t} = useTranslation()

  const [ready, setReady] = useState(false)
  const [wsClient, setWSClient] = useState(null)

  const [scheduler, setScheduler] = useState(null)
  const [schedulerEnabled, setSchedulerEnabled] = useState(null)

  useAsyncEffect(async () => {
    const wsClient = new WSClient()
    wsClient.setOnConnectionChange(connectionState => dispatch(changeConnectionState(connectionState)))
    wsClient.setOnError(error => {
      console.log(error)
      alerter.showErrorAlert(t('連線建立失敗'))
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
      setSchedulerEnabled(false)
      dispatch(changeScheduleEnabledStatus(false))
    })
    setWSClient(wsClient)

    const scheduler = new Scheduler()
    setScheduler(scheduler)

    setReady(true)
  }, [])

  const connect = (url) => {
    wsClient.connect(url)
    tracker.trace('connect', {url})
  }

  const disconnect = () => {
    if (wsClient) {
      wsClient.close()
    }
  }

  const sendMessage = async (message) => {
    wsClient.send(message)

    await dispatch(appendMessage({
      id: generateRandomString(),
      time: new Date().toISOString(),
      source: MessageSource.Client,
      body: message,
    }))

    tracker.trace('send_message')
    alerter.showSuccessAlert(t('請求已送出'))
  }

  const enableScheduler = async (message, timeInterval) => {
    scheduler.enable(async () => {
      await sendMessage(message)
    }, timeInterval)
    setSchedulerEnabled(true)
    await dispatch(changeScheduleEnabledStatus(true))
  }

  const disableScheduler = async () => {
    scheduler.disable()
    setSchedulerEnabled(false)
    await dispatch(changeScheduleEnabledStatus(false))
  }

  const context = {
    ready,

    connect,
    disconnect,
    sendMessage,

    schedulerEnabled,
    enableScheduler,
    disableScheduler,
  }

  return (
    <WSClientContext.Provider value={context}>
      {children}
    </WSClientContext.Provider>
  )
}