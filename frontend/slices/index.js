import {
  combineReducers,
  createAsyncThunk,
  createDraftSafeSelector,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit'

import {ConnectionState, MessageSource, LoadingState} from '../constants'
import generateRandomString from '../utils/generateRandomString'

// Actions

export const changeConnectionState = createAsyncThunk(
  'current/changeConnectionState',
  async (connectionState) => {
    console.log(`連線狀態修改為 ${connectionState} ...`)
    return connectionState
  }
)

export const changeSelectedMessageID = createAsyncThunk(
  'current/changeSelectedMessageID',
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

export const loadProjectData = createAsyncThunk(
  'project/loadData',
  async () => {
    console.log(`讀取專案資料 ...`)
    return {
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
      }
    }
  }
)

export const changeSettingMaxMessageCount = createAsyncThunk(
  'project/setting/changeSettingMaxMessageCount',
  async (maxMessageCount) => {
    console.log(`修改最大歷史訊息數為 ${maxMessageCount}...`)
    return maxMessageCount
  }
)

export const changeConnectionProtocol = createAsyncThunk(
  'project/connection/changeConnectionProtocol',
  async (protocol) => {
    return protocol
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

export const loadMessageData = createAsyncThunk(
  'message/loadData',
  async () => {
    console.log(`讀取訊息歷史資料 ...`)
    return []
  }
)


export const appendMessage = createAsyncThunk(
  'message/appendMessage',
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
  'message/removeFirstMessage',
  async () => {

  }
)

export const clearMessages = createAsyncThunk(
  'message/clearMessages',
  async (_, {dispatch}) => {
    await console.log(`清除訊息...`)
    await dispatch(clearSelectedMessageID())
  }
)


export const initialize = createAsyncThunk(
  'initialize',
  async (_, {dispatch}) => {
    console.log(`啟動初始化...`)
    dispatch(loadProjectData())
    dispatch(loadMessageData())
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
    connectionState: ConnectionState.Idle, // idle, connecting, connected, closed
    selectedMessageID: null,
  },
  extraReducers: {
    [changeConnectionState.fulfilled]: (state, action) => {
      state.connectionState = action.payload
    },
    [changeSelectedMessageID.fulfilled]: (state, action) => {
      state.selectedMessageID = action.payload
    },
    [clearSelectedMessageID.fulfilled]: (state) => {
      state.selectedMessageID = null
    },
  }
})

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    state: LoadingState.Idle,
    data: null
  },
  extraReducers: {
    [loadProjectData.pending]: (state) => {
      state.state = LoadingState.Loading
      state.data = null
    },
    [loadProjectData.fulfilled]: (state, action) => {
      state.state = LoadingState.Loaded
      state.data = action.payload
    },
    [loadProjectData.rejected]: (state) => {
      state.state = LoadingState.Failed
      state.data = null
    },
    [changeSettingMaxMessageCount.fulfilled]: (state, action) => {
      state.data.setting.maxMessageCount = action.payload
    },
    [changeConnectionUrl.fulfilled]: (state, action) => {
      state.data.connection.url = action.payload
    },
    [changeRequestText.fulfilled]: (state, action) => {
      state.data.request.text = action.payload
    }
  },
})

const messageAdapter = createEntityAdapter()
const messageSlice = createSlice({
  name: 'message',
  initialState: {
    state: LoadingState.Idle,
    data: messageAdapter.getInitialState(),
  },
  extraReducers: {
    [loadMessageData.pending]: (state) => {
      state.state = LoadingState.Loading
      state.data = messageAdapter.getInitialState()
    },
    [loadMessageData.fulfilled]: (state, action) => {
      state.state = LoadingState.Loaded
      messageAdapter.setAll(state.data, action.payload)
    },
    [loadMessageData.rejected]: (state) => {
      state.state = LoadingState.Failed
      state.data = messageAdapter.getInitialState()
    },
    [removeFirstMessage.fulfilled]: (state) => {
      messageAdapter.removeOne(state.data, state.data.ids[0])
    },
    [appendMessage.fulfilled]: (state, action) => {
      messageAdapter.addOne(state.data, action.payload)
    },
    [clearMessages.fulfilled]: (state) => {
      messageAdapter.removeAll(state.data)
    }
  },
})

// Selectors
export const getSettingMaxMessageCount = state => state.project.data ? state.project.data.setting.maxMessageCount : null

export const getConnectionState = state => state.current.connectionState
export const getConnectionUrl = state => state.project.data ? state.project.data.connection.url : ''
export const getRequestText = state => state.project.data ? state.project.data.request.text : ''
export const getSelectedMessageID = state => state.current.selectedMessageID

const messageSelectors = messageAdapter.getSelectors(state => state.message.data)
export const getMessageState = state => state.message.state
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
  message: messageSlice.reducer,
})
