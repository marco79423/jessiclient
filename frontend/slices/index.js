import {
  combineReducers,
  createAsyncThunk,
  createDraftSafeSelector,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit'
import jsDownload from 'js-file-download'
import axios from 'axios'
import fileDialog from 'file-dialog'

import {ConnectionState, LoadingState, MessageSource} from '../constants'
import generateRandomString from '../utils/generateRandomString'


// Actions
export const changeProjectState = createAsyncThunk(
  'current/changeProjectState',
  async (projectState) => {
    return projectState
  }
)

export const changeConnectionState = createAsyncThunk(
  'current/changeConnectionState',
  async (connectionState) => {
    return connectionState
  }
)

export const setSelectedMessageID = createAsyncThunk(
  'current/setSelectedMessageID',
  async (messageID) => {
    return messageID
  }
)


export const clearSelectedMessageID = createAsyncThunk(
  'current/clearSelectedMessageID',
  async () => {
  }
)

export const setAppliedFavoriteRequestID = createAsyncThunk(
  'current/setAppliedFavoriteRequestID',
  async (appliedFavoriteRequestID) => {
    return appliedFavoriteRequestID
  }
)

export const clearAppliedFavoriteRequestID = createAsyncThunk(
  'current/clearAppliedFavoriteRequestID',
  async () => {

  }
)


export const addSearchFilter = createAsyncThunk(
  'current/addSearchFilter',
  async (text) => {
    return {
      id: generateRandomString(),
      text: text,
    }
  }
)

export const removeSearchFilter = createAsyncThunk(
  'current/removeSearchFilter',
  async (searchFilterID) => {
    return searchFilterID
  }
)

export const changeScheduleEnabledStatus = createAsyncThunk(
  'current/changeScheduleEnabledStatus',
  async (enabled) => {
    return enabled
  }
)

export const changeShareLink = createAsyncThunk(
  'current/changeShareLink',
  async (shareLink) => {
    return shareLink
  }
)

export const clearShareLink = createAsyncThunk(
  'current/clearShareLink',
  async () => {

  }
)

export const setProjectData = createAsyncThunk(
  'project/setProjectData',
  async (projectData) => {
    return projectData
  }
)

export const changeSettingMaxMessageCount = createAsyncThunk(
  'project/setting/changeSettingMaxMessageCount',
  async (maxMessageCount) => {
    return maxMessageCount
  }
)

export const changeConnectionUrl = createAsyncThunk(
  'project/connection/changeConnectionUrl',
  async (url) => {
    return url
  }
)

export const changeRequestText = createAsyncThunk(
  'project/request/changeRequestText',
  async (requestText) => {
    return requestText
  }
)

export const changeScheduleTimeInterval = createAsyncThunk(
  'project/schedule/changeScheduleTimeInterval',
  async (period) => {
    return period
  }
)

export const changeScheduleRequestText = createAsyncThunk(
  'project/schedule/changeScheduleRequestText',
  async (requestText) => {
    return requestText
  }
)


export const addFavoriteRequest = createAsyncThunk(
  'project/request/addFavoriteRequest',
  async (favoriteRequest) => {
    return favoriteRequest
  }
)

export const removeFavoriteRequest = createAsyncThunk(
  'project/request/removeFavoriteRequest',
  async (id) => {
    return id
  }
)

export const clearFavoriteRequests = createAsyncThunk(
  'project/request/clearFavoriteRequests',
  async () => {

  }
)

export const appendMessage = createAsyncThunk(
  'project/message/appendMessage',
  async ({source, message}, {dispatch, getState}) => {
    const maxMessageCount = getSettingMaxMessageCount(getState())
    const messageCount = getMessageCount(getState())
    if (messageCount >= maxMessageCount) {
      await dispatch(removeFirstMessage())
    }

    return {
      id: generateRandomString(),
      time: new Date().toISOString(),
      source: source,
      text: message,
    }
  }
)

export const removeFirstMessage = createAsyncThunk(
  'project/message/removeFirstMessage',
  async () => {

  }
)

export const clearMessages = createAsyncThunk(
  'project/message/clearMessages',
  async (_, {dispatch}) => {
    await dispatch(clearSelectedMessageID())
  }
)


export const initialize = createAsyncThunk(
  'initialize',
  async (_, {dispatch}) => {
    dispatch(changeProjectState(LoadingState.Loading))

    const projectCode = new URLSearchParams(window.location.search).get('projectCode')
    if (projectCode) {
      try {
        const resp = await axios.get(`/api/sharing/projects/${projectCode}`)
        const projectData = resp.data.data
        dispatch(setProjectData(projectData))
      } catch (err) {
        // 什麼也不做
      }
    }

    if(!projectCode) {
        const localCache = localStorage.getItem('projectData')
        if(localCache) {
            const projectData = JSON.parse(localCache)
            dispatch(setProjectData(projectData))
        }
    }

    dispatch(changeProjectState(LoadingState.Loaded))
  }
)

export const exportProject = createAsyncThunk(
  'action/exportProject',
  ({name, messageIncluded}, {getState}) => {
    const projectData = messageIncluded ? getProjectData(getState()) : getProjectDataWithoutMessages(getState())
    jsDownload(JSON.stringify(projectData), `${name}.json`)
  }
)

export const importProject = createAsyncThunk(
  'action/importProject',
  async (_, {getState, dispatch}) => {
    const files = await fileDialog({accept: '.json'})
    const selectedFile = files[0]

    const fileReader = new FileReader()
    fileReader.onload = () => {
      const data = fileReader.result
      const projectData = JSON.parse(data)
      dispatch(setProjectData(projectData))
    }
    fileReader.readAsText(selectedFile, 'UTF-8')
  }
)


let wsClient = null
let scheduleHandler = null

export const connect = createAsyncThunk(
  'action/connect',
  async (_, {dispatch, getState}) => {
    dispatch(changeConnectionState(ConnectionState.Connecting))

    const connectionUrl = getConnectionUrl(getState())
    wsClient = new WebSocket(connectionUrl)

    wsClient.onopen = () => {
      dispatch(changeConnectionState(ConnectionState.Connected))
    }

    wsClient.onmessage = evt => {
      dispatch(appendMessage({source: MessageSource.Server, message: evt.data}))
    }

    wsClient.onerror = () => {
      dispatch(changeConnectionState(ConnectionState.Idle))
    }

    wsClient.onclose = () => {
      dispatch(disconnect())
    }
  }
)

export const disconnect = createAsyncThunk(
  'action/disconnect',
  async (_, {dispatch, getState}) => {
    if (scheduleHandler) {
      dispatch(disableSchedule())
    }

    if (wsClient) {
      wsClient.close()
      wsClient = null
      dispatch(changeConnectionState(ConnectionState.Idle))
    }
  }
)

export const sendRequestText = createAsyncThunk(
  'action/sendRequestText',
  async (requestText, {dispatch, getState}) => {
    const connectionState = getConnectionState(getState())
    if (connectionState !== ConnectionState.Connected) {
      return
    }

    dispatch(changeRequestText(requestText))

    wsClient.send(requestText)
    dispatch(appendMessage({source: MessageSource.Client, message: requestText}))
  }
)

export const enableSchedule = createAsyncThunk(
  'action/enableSchedule',
  async ({requestText, timeInterval}, {dispatch}) => {
    if (!scheduleHandler) {
      dispatch(changeScheduleRequestText(requestText))
      dispatch(changeScheduleTimeInterval(timeInterval))

      scheduleHandler = setInterval(() => {
        wsClient.send(requestText)
        dispatch(appendMessage({source: MessageSource.Client, message: requestText}))
      }, timeInterval * 1000)

      dispatch(changeScheduleEnabledStatus(true))
    }
  }
)

export const disableSchedule = createAsyncThunk(
  'action/disableSchedule',
  async (_, {dispatch, getState}) => {
    if (scheduleHandler) {
      clearInterval(scheduleHandler)
      scheduleHandler = null
      dispatch(changeScheduleEnabledStatus(false))
    }
  }
)

export const generateShareLink = createAsyncThunk(
  'action/generateShareLink',
  async ({messageIncluded}, {dispatch, getState}) => {
    const projectData = messageIncluded ? getProjectData(getState()) : getProjectDataWithoutMessages(getState())
    const resp = await axios.post('/api/sharing/projects', projectData)

    const shareLink = `${window.location.origin}?projectCode=${resp.data.data.projectCode}`
    dispatch(changeShareLink(shareLink))
  }
)

// Slice
const searchFilterAdapter = createEntityAdapter()

const currentSlice = createSlice({
  name: 'current',
  initialState: {
    projectState: LoadingState.Idle, // idle, loading, loaded, failed
    connectionState: ConnectionState.Idle, // idle, connecting, connected, closed
    selectedMessageID: null,
    appliedFavoriteRequestID: null,
    searchFilter: searchFilterAdapter.getInitialState(),
    scheduleEnabled: false,
    shareLink: null,
  },
  extraReducers: {
    [changeProjectState.fulfilled]: (state, action) => {
      state.projectState = action.payload
    },
    [changeConnectionState.fulfilled]: (state, action) => {
      state.connectionState = action.payload
    },
    [setSelectedMessageID.fulfilled]: (state, action) => {
      state.selectedMessageID = action.payload
    },
    [clearSelectedMessageID.fulfilled]: (state) => {
      state.selectedMessageID = null
    },
    [setAppliedFavoriteRequestID.fulfilled]: (state, action) => {
      state.appliedFavoriteRequestID = action.payload
    },
    [clearAppliedFavoriteRequestID.fulfilled]: (state) => {
      state.appliedFavoriteRequestID = null
    },
    [addSearchFilter.fulfilled]: (state, action) => {
      searchFilterAdapter.addOne(state.searchFilter, action.payload)
    },
    [removeSearchFilter.fulfilled]: (state, action) => {
      searchFilterAdapter.removeOne(state.searchFilter, action.payload)
    },
    [changeScheduleEnabledStatus.fulfilled]: (state, action) => {
      state.scheduleEnabled = action.payload
    },
    [changeShareLink.fulfilled]: (state, action) => {
      state.shareLink = action.payload
    },
    [clearShareLink.fulfilled]: (state) => {
      state.shareLink = null
    },
  }
})

const messageAdapter = createEntityAdapter()
const favoriteRequestAdapter = createEntityAdapter()
const projectSlice = createSlice({
  name: 'project',
  initialState: {
    // 設定
    setting: {
      maxMessageCount: 100,
    },

    // 連線資訊
    connection: {
      url: 'wss://echo.websocket.org',
      // url: 'ws://sbk-mock.p-marco.192.168.192.1.xip.io/player-api/ws',
      // url: 'ws://sbk-mock.p-marco.svc.cluster.local:7000/player-api/ws',
      // url: 'ws://10.200.6.101:18700/player-api/ws?token=d6b71fef-6a9e-4630-af0d-076b26cc1436',
    },

    // 請求
    request: {
      text: '',
    },

    // 排程
    schedule: {
      timeInterval: 3,
      request: {
        text: '',
      }
    },

    // 常用訊息
    favoriteRequest: favoriteRequestAdapter.getInitialState(),

    // 訊息
    message: messageAdapter.getInitialState(),
  },
  extraReducers: {
    [setProjectData.fulfilled]: (state, action) => {
      return action.payload
    },
    [changeSettingMaxMessageCount.fulfilled]: (state, action) => {
      state.setting.maxMessageCount = action.payload
    },
    [changeConnectionUrl.fulfilled]: (state, action) => {
      state.connection.url = action.payload
    },
    [changeRequestText.fulfilled]: (state, action) => {
      state.request.text = action.payload
    },
    [changeScheduleTimeInterval.fulfilled]: (state, action) => {
      state.schedule.timeInterval = action.payload
    },
    [changeScheduleRequestText().fulfilled]: (state, action) => {
      state.schedule.request.text = action.payload
    },
    [addFavoriteRequest.fulfilled]: (state, action) => {
      favoriteRequestAdapter.addOne(state.favoriteRequest, action.payload)
    },
    [removeFavoriteRequest.fulfilled]: (state, action) => {
      favoriteRequestAdapter.removeOne(state.favoriteRequest, action.payload)
    },
    [clearFavoriteRequests.fulfilled]: (state) => {
      favoriteRequestAdapter.removeAll(state.favoriteRequest)
    },
    [removeFirstMessage.fulfilled]: (state) => {
      messageAdapter.removeOne(state.message, state.message.ids[0])
    },
    [appendMessage.fulfilled]: (state, action) => {
      messageAdapter.addOne(state.message, action.payload)
    },
    [clearMessages.fulfilled]: (state) => {
      messageAdapter.removeAll(state.message)
    },
  },
})


// Selectors
const searchFilterSelectors = searchFilterAdapter.getSelectors(state => state.current.searchFilter)
export const getProjectState = state => state.current.projectState
export const getConnectionState = state => state.current.connectionState
export const getSelectedMessageID = state => state.current.selectedMessageID
export const getAppliedFavoriteRequestID = state => state.current.appliedFavoriteRequestID
export const getSearchFilters = state => searchFilterSelectors.selectAll(state)
export const getScheduleEnabledStatus = state => state.current.scheduleEnabled
export const getShareLink = state => state.current.shareLink

export const getProjectData = state => state.project
export const getProjectDataWithoutMessages = createDraftSafeSelector(
  getProjectData,
  projectData => ({
    ...projectData,
    message: messageAdapter.getInitialState(),
  })
)
export const getSettingMaxMessageCount = state => state.project.setting.maxMessageCount

export const getConnectionUrl = state => state.project.connection.url

export const getRequestText = state => state.project.request.text

export const getScheduleTimeInterval = state => state.project.schedule.timeInterval
export const getScheduleRequestText = state => state.project.schedule.request.text

const favoriteRequestSelectors = favoriteRequestAdapter.getSelectors(state => state.project.favoriteRequest)
export const getFavoriteRequests = state => favoriteRequestSelectors.selectAll(state)
export const getAppliedFavoriteRequest = createDraftSafeSelector(
  [
    getAppliedFavoriteRequestID,
    state => id => favoriteRequestSelectors.selectById(state, id),
  ],
  (appliedFavoriteRequestID, favoriteRequestFunc) => favoriteRequestFunc(appliedFavoriteRequestID),
)

const messageSelectors = messageAdapter.getSelectors(state => state.project.message)
export const getMessageCount = state => messageSelectors.selectTotal(state)
export const getMessages = createDraftSafeSelector(
  [
    getSelectedMessageID,
    getSearchFilters,
    state => messageSelectors.selectAll(state),
  ],
  (selectedID, searchFilters, messages) => messages
    .filter(message => searchFilters.map(searchFilter => message.text.includes(searchFilter.text)).reduce((a, b) => a && b, true))
    .map(message => ({
      ...message,
      selected: message.id === selectedID,
    })),
)
export const getMessage = createDraftSafeSelector(
  [
    getSelectedMessageID,
    state => id => messageSelectors.selectById(state, id),
  ],
  (selectedID, messageFunc) => messageFunc(selectedID),
)


// Reducer
export default combineReducers({
  current: currentSlice.reducer,
  project: projectSlice.reducer,
})
