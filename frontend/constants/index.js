export const SITE_TITLE = 'Jessiclient'


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

export const HistorySource = Object.freeze({
  Server: 'server',
  Client: 'client'
})
