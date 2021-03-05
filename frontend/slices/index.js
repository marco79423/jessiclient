import {
  combineReducers,
  createAsyncThunk,
  createDraftSafeSelector,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit'

import {ConnectionState, HistorySource, LoadingState} from '../constants'
import generateRandomString from '../utils/generateRandomString'

// Actions

export const changeConnectionState = createAsyncThunk(
  'current/changeConnectionState',
  async (connectionState) => {
    console.log(`連線狀態修改為 ${connectionState} ...`)
    return connectionState
  }
)

export const changeSelectedHistoryID = createAsyncThunk(
  'current/changeSelectedHistoryID',
  async (historyID) => {
    console.log(`調整選擇的訊息為 ${historyID} ...`)
    return historyID
  }
)

export const clearSelectedHistoryID = createAsyncThunk(
  'current/clearSelectedHistoryID',
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
        maxHistoryCount: 100,
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

export const changeSettingMaxHistoryCount = createAsyncThunk(
  'project/setting/changeSettingMaxHistoryCount',
  async (maxHistoryCount) => {
    console.log(`修改最大歷史訊息數為 ${maxHistoryCount}...`)
    return maxHistoryCount
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

export const loadHistoryData = createAsyncThunk(
  'history/loadData',
  async () => {
    console.log(`讀取訊息歷史資料 ...`)
    return []
  }
)


export const appendHistory = createAsyncThunk(
  'history/appendHistory',
  async ({source, message}, {dispatch, getState}) => {
    const maxHistoryCount = getSettingMaxHistoryCount(getState())
    const historyCount = getHistoryCount(getState())
    if (historyCount >= maxHistoryCount) {
      await dispatch(removeFirstHistory())
    }

    const history = {
      id: generateRandomString(),
      time: new Date().toISOString(),
      source: source,
      text: message,
    }

    await console.log(`新增服務端訊息 ${message}...`)
    return history
  }
)

export const removeFirstHistory = createAsyncThunk(
  'history/removeFirstHistory',
  async () => {

  }
)

export const clearHistories = createAsyncThunk(
  'history/clearHistories',
  async (_, {dispatch}) => {
    await console.log(`清除訊息...`)
    await dispatch(clearSelectedHistoryID())
  }
)


export const initialize = createAsyncThunk(
  'initialize',
  async (_, {dispatch}) => {
    console.log(`啟動初始化...`)
    dispatch(loadProjectData())
    dispatch(loadHistoryData())
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
      dispatch(appendHistory({source: HistorySource.Server, message: evt.data}))
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
    dispatch(appendHistory({source: HistorySource.Client, message: requestText}))
  }
)

// Slice

const currentSlice = createSlice({
  name: 'current',
  initialState: {
    connectionState: ConnectionState.Idle, // idle, connecting, connected, closed
    selectedHistoryID: null,
  },
  extraReducers: {
    [changeConnectionState.fulfilled]: (state, action) => {
      state.connectionState = action.payload
    },
    [changeSelectedHistoryID.fulfilled]: (state, action) => {
      state.selectedHistoryID = action.payload
    },
    [clearSelectedHistoryID.fulfilled]: (state) => {
      state.selectedHistoryID = null
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
    [changeSettingMaxHistoryCount.fulfilled]: (state, action) => {
      state.data.setting.maxHistoryCount = action.payload
    },
    [changeConnectionUrl.fulfilled]: (state, action) => {
      state.data.connection.url = action.payload
    },
    [changeRequestText.fulfilled]: (state, action) => {
      state.data.request.text = action.payload
    }
  },
})

const historyAdapter = createEntityAdapter()
const historySlice = createSlice({
  name: 'history',
  initialState: {
    state: LoadingState.Idle,
    data: historyAdapter.getInitialState(),
  },
  extraReducers: {
    [loadHistoryData.pending]: (state) => {
      state.state = LoadingState.Loading
      state.data = historyAdapter.getInitialState()
    },
    [loadHistoryData.fulfilled]: (state, action) => {
      state.state = LoadingState.Loaded
      historyAdapter.setAll(state.data, action.payload)
    },
    [loadHistoryData.rejected]: (state) => {
      state.state = LoadingState.Failed
      state.data = historyAdapter.getInitialState()
    },
    [removeFirstHistory.fulfilled]: (state) => {
      historyAdapter.removeOne(state.data, state.data.ids[0])
    },
    [appendHistory.fulfilled]: (state, action) => {
      historyAdapter.addOne(state.data, action.payload)
    },
    [clearHistories.fulfilled]: (state) => {
      historyAdapter.removeAll(state.data)
    }
  },
})

// Selectors
export const getSettingMaxHistoryCount = state => state.project.data ? state.project.data.setting.maxHistoryCount : null

export const getConnectionState = state => state.current.connectionState
export const getConnectionUrl = state => state.project.data ? state.project.data.connection.url : ''
export const getRequestText = state => state.project.data ? state.project.data.request.text : ''
export const getSelectedHistoryID = state => state.current.selectedHistoryID

const historySelectors = historyAdapter.getSelectors(state => state.history.data)
export const getHistoryState = state => state.history.state
export const getHistoryCount = state => historySelectors.selectTotal(state)
export const getHistories = createDraftSafeSelector(
  [
    getSelectedHistoryID,
    state => historySelectors.selectAll(state),
  ],
  (selectedID, histories) => histories.map(history => ({
    ...history,
    selected: history.id === selectedID,
  })),
)

export const getHistory = createDraftSafeSelector(
  [
    getSelectedHistoryID,
    state => id => historySelectors.selectById(state, id),
  ],
  (selectedID, historyFunc) => historyFunc(selectedID),
)


// Reducer
export default combineReducers({
  current: currentSlice.reducer,
  project: projectSlice.reducer,
  history: historySlice.reducer,
})
