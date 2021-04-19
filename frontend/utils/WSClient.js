import {ConnectionState} from '../constants'

export default class WSClient {
  constructor() {
    this.wsClient = null

    this.onConnectionStateChange = null
    this.onNewMessage = null
    this.onError = null
    this.onClose = null
  }

  connect = (url) => {
    if (this.wsClient) {
      throw new Error('已經在連線了')
    }

    this.onConnectionStateChange(ConnectionState.Connecting)

    this.wsClient = new WebSocket(url)

    this.wsClient.onopen = () => {
      if (this.onConnectionStateChange) {
        this.onConnectionStateChange(ConnectionState.Connected)
      }
    }

    this.wsClient.onmessage = evt => {
      if (this.onNewMessage) {
        this.onNewMessage(evt.data)
      }
    }

    this.wsClient.onerror = (err) => {
      if (this.onError) {
        this.onError(err)
      }
    }

    this.wsClient.onclose = () => {
      if (this.onClose) {
        this.onClose()
      }

      if (this.onConnectionStateChange) {
        this.onConnectionStateChange(ConnectionState.Idle)
      }

      this.wsClient = null
    }
  }

  setOnConnectionChange = (onConnectionStateChange) => {
    this.onConnectionStateChange = onConnectionStateChange
  }

  setOnNewMessage = (onNewMessage) => {
    this.onNewMessage = onNewMessage
  }

  setOnError = (onError) => {
    this.onError = onError
  }

  setOnClose = (onClose) => {
    this.onClose = onClose
  }

  send = (message) => {
    if (this.wsClient) {
      this.wsClient.send(message)
    }
  }

  close = () => {
    this.onConnectionStateChange(ConnectionState.Closing)
    this.wsClient.close()
  }
}
