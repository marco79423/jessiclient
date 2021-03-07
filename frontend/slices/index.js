import {
  combineReducers,
  createAsyncThunk,
  createDraftSafeSelector,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit'

import {ConnectionState, LoadingState, MessageSource} from '../constants'
import generateRandomString from '../utils/generateRandomString'


// Actions
export const changeProjectState = createAsyncThunk(
  'current/changeProjectState',
  async (projectState) => {
    console.log(`專案啟動狀態改為 ${projectState} ...`)
    return projectState
  }
)

export const changeConnectionState = createAsyncThunk(
  'current/changeConnectionState',
  async (connectionState) => {
    console.log(`連線狀態修改為 ${connectionState} ...`)
    return connectionState
  }
)

export const setSelectedMessageID = createAsyncThunk(
  'current/setSelectedMessageID',
  async (messageID) => {
    console.log(`調整選擇的訊息為 ${messageID} ...`)
    return messageID
  }
)


export const clearSelectedMessageID = createAsyncThunk(
  'current/clearSelectedMessageID',
  async () => {
    console.log(`清除選擇的訊息 ...`)
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

export const setProjectData = createAsyncThunk(
  'project/setProjectData',
  async (projectData) => {
    console.log(`讀取專案資料 ...`)
    return projectData
  }
)

export const changeSettingMaxMessageCount = createAsyncThunk(
  'project/setting/changeSettingMaxMessageCount',
  async (maxMessageCount) => {
    console.log(`修改最大歷史訊息數為 ${maxMessageCount}...`)
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

    await console.log(`新增訊息 ${message}...`)
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
    await console.log(`清除訊息...`)
    await dispatch(clearSelectedMessageID())
  }
)


export const initialize = createAsyncThunk(
  'initialize',
  async (_, {dispatch}) => {
    console.log(`啟動初始化...`)
    const projectData = {
      // 設定
      setting: {
        maxMessageCount: 100,
      },

      // 連線資訊
      connection: {
        url: 'wss://echo.websocket.org',
        // url: 'ws://sbk-mock.p-marco.192.168.192.1.xip.io/player-api/ws',
      },

      // 請求
      request: {
        text: '',
      },

      favoriteRequest: {
        ids: [],
        entities: {},
      },

      // 訊息
      message: {
        ids: [],
        entities: {}
      },
    }

    dispatch(setProjectData(projectData))
    dispatch(changeProjectState(LoadingState.Loaded))
  }
)

let wsClient = null

export const connect = createAsyncThunk(
  'action/connect',
  async (_, {dispatch, getState}) => {
    const connectionState = getConnectionState(getState())
    if (connectionState !== ConnectionState.Idle) {
      return
    }

    dispatch(changeConnectionState(ConnectionState.Connecting))
    const connectionUrl = getConnectionUrl(getState())
    wsClient = new WebSocket(connectionUrl)

    wsClient.onopen = () => {
      dispatch(changeConnectionState(ConnectionState.Connected))
    }

    wsClient.onmessage = evt => {
      dispatch(appendMessage({source: MessageSource.Server, message: evt.data}))
    }

    wsClient.onclose = () => {
      dispatch(disconnect())
    }
  }
)

export const disconnect = createAsyncThunk(
  'action/disconnect',
  async (_, {dispatch, getState}) => {
    const connectionState = getConnectionState(getState())
    if (connectionState !== ConnectionState.Connected) {
      return
    }

    wsClient.close()
    dispatch(changeConnectionState(ConnectionState.Idle))
  }
)

export const sendRequestText = createAsyncThunk(
  'action/sendRequestText',
  async (_, {dispatch, getState}) => {
    const connectionState = getConnectionState(getState())
    if (connectionState !== ConnectionState.Connected) {
      return
    }

    const requestText = getRequestText(getState())

    console.log(`發送訊息 ${requestText}`)
    wsClient.send(requestText)
    dispatch(appendMessage({source: MessageSource.Client, message: requestText}))
  }
)

// Slice

const currentSlice = createSlice({
  name: 'current',
  initialState: {
    projectState: LoadingState.Idle, // idle, loading, loaded, failed
    connectionState: ConnectionState.Idle, // idle, connecting, connected, closed
    selectedMessageID: null,
    appliedFavoriteRequestID: null,
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
      url: '',
    },

    // 請求
    request: {
      text: '',
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
export const getProjectState = state => state.current.projectState
export const getConnectionState = state => state.current.connectionState
export const getSelectedMessageID = state => state.current.selectedMessageID
export const getAppliedFavoriteRequestID = state => state.current.appliedFavoriteRequestID

export const getSettingMaxMessageCount = state => state.project.setting.maxMessageCount

export const getConnectionUrl = state => state.project.connection.url

export const getRequestText = state => state.project.request.text

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
    state => messageSelectors.selectAll(state),
  ],
  (selectedID, messages) => messages.map(message => ({
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
