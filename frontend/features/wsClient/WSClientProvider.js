import React from 'react'
import {useDispatch} from 'react-redux'
import useAsyncEffect from 'use-async-effect'
import {useTranslation} from 'next-i18next'
import {nanoid} from 'nanoid'

import {ConnectionState, MessageSource} from '../../constants'
import WSClient from '../../utils/WSClient'
import Scheduler from '../../utils/Scheduler'
import {appendMessage} from '../../redux/project'
import {useNotifications} from '../notifications'
import {useTracker} from '../tracker'


export const WSClientContext = React.createContext({
  ready: false,
})


export default function WSClientProvider({children}) {
  const dispatch = useDispatch()
  const tracker = useTracker()
  const notifications = useNotifications()
  const {t} = useTranslation()

  const [ready, setReady] = React.useState(false)
  const [wsClient, setWSClient] = React.useState(null)

  const [connectionState, setConnectionState] = React.useState(ConnectionState.Idle)
  const [scheduler, setScheduler] = React.useState(null)
  const [schedulerEnabled, setSchedulerEnabled] = React.useState(null)

  useAsyncEffect(async () => {
    const wsClient = new WSClient()
    wsClient.setOnConnectionChange(connectionState => setConnectionState(connectionState))
    wsClient.setOnError(error => {
      console.log(error)
      notifications.showErrorMessage(t('連線建立失敗'))
    })

    wsClient.setOnNewMessage(async message => {
      await dispatch(appendMessage({
        id: nanoid(),
        time: new Date().toISOString(),
        source: MessageSource.Server,
        body: message,
      }))
    })
    wsClient.setOnClose(() => {
      scheduler.disable()
      setSchedulerEnabled(false)
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
    try {
      wsClient.send(message)
      await dispatch(appendMessage({
        id: nanoid(),
        time: new Date().toISOString(),
        source: MessageSource.Client,
        body: message,
      }))
      notifications.showSuccessMessage(t('請求已送出'))
    } catch (e) {
      console.log(e)
      notifications.showErrorMessage(t('請求傳送失敗'))
    } finally {
      tracker.trace('send_message')
    }
  }

  const enableScheduler = async (message, timeInterval) => {
    scheduler.enable(async () => {
      await sendMessage(message)
    }, timeInterval)
    setSchedulerEnabled(true)
  }

  const disableScheduler = async () => {
    scheduler.disable()
    setSchedulerEnabled(false)
  }

  const isConnected = connectionState === ConnectionState.Connected

  const context = {
    ready,

    connectionState,
    isConnected,
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
