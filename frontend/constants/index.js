export const AppWebDisplayMode = Object.freeze({
  DetailPanelOff: 'DetailPanelOff',
  DetailPanelOn: 'DetailPanelOn'
})

export const AppMobileDisplayMode = Object.freeze({
  MainPanel: 'MainPanel',
  ListPanel: 'ListPanel',
  DetailPanel: 'DetailPanel',
})

export const LoadingState = Object.freeze({
  Idle: 'idle',
  Loading: 'loading',
  Loaded: 'loaded',
  Failed: 'failed',
})

export const ConnectionState = Object.freeze({
  Idle: 'idle',
  Connecting: 'connecting',
  Connected: 'connected',
  Closing: 'closing',
})

export const MessageSource = Object.freeze({
  Server: 'server',
  Client: 'client'
})
