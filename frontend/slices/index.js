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
  async (connectionState, {dispatch}) => {
    dispatch(appendLog(`連線狀態修改為 ${connectionState} ...`))
    return connectionState
  }
)

export const changeSelectedHistoryID = createAsyncThunk(
  'current/changeSelectedHistoryID',
  async (historyID, {dispatch}) => {
    dispatch(appendLog(`調整選擇的傳輸歷史紀錄為 ${historyID} ...`))
    return historyID
  }
)

export const clearSelectedHistoryID = createAsyncThunk(
  'current/clearSelectedHistoryID',
  async (_, {dispatch}) => {
    dispatch(appendLog(`清空調整選擇的傳輸歷史紀錄 ...`))
  }
)

export const loadProjectData = createAsyncThunk(
  'project/loadData',
  async (_, {dispatch}) => {
    dispatch(appendLog(`讀取專案資料 ...`))
    return {
      // 設定
      setting: {},

      // 連線資訊
      connection: {
        // url: 'wss://echo.websocket.org',
        url: 'ws://sbk-mock.p-marco.192.168.192.1.xip.io/player-api/ws',
      },

      // 請求
      request: {
        text: '',
      }
    }
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
  async (_, {dispatch}) => {
    dispatch(appendLog(`讀取傳轉歷史資料 ...`))
    return []
  }
)

export const appendServerHistory = createAsyncThunk(
  'history/appendServerHistory',
  async (message, {dispatch}) => {
    const history = {
      id: generateRandomString(),
      time: new Date().toISOString(),
      source: HistorySource.Server,
      text: message,
    }

    await dispatch(appendLog(`新增服務端訊息 ${history.toString()}...`))
    return history
  }
)

export const appendClientHistory = createAsyncThunk(
  'history/appendClientHistory',
  async (message, {dispatch}) => {
    const history = {
      id: generateRandomString(),
      time: new Date().toISOString(),
      source: HistorySource.Client,
      text: message,
    }

    await dispatch(appendLog(`新增客戶端訊息 ${history.toString()}...`))
    return history
  }
)

export const loadLogData = createAsyncThunk(
  'log/loadData',
  async (_, {dispatch}) => {
    dispatch(appendLog(`讀取 log 資料...`))
    return []
  }
)

export const appendLog = createAsyncThunk(
  'log/appendLog',
  async (log) => {
    return {
      id: generateRandomString(),
      time: new Date().toISOString(),
      data: log,
    }
  }
)


export const initialize = createAsyncThunk(
  'initialize',
  async (_, {dispatch}) => {
    dispatch(appendLog(`啟動初始化...`))
    dispatch(loadProjectData())
    dispatch(loadHistoryData())
    dispatch(loadLogData())
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
      dispatch(appendServerHistory(evt.data))
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

    dispatch(appendLog(`發送訊息 ${requestText}`))
    wsClient.send(requestText)
    dispatch(appendClientHistory(requestText))
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
    [appendServerHistory.fulfilled]: (state, action) => {
      historyAdapter.addOne(state.data, action.payload)
    },
    [appendClientHistory.fulfilled]: (state, action) => {
      historyAdapter.addOne(state.data, action.payload)
    },
  },
})

const logAdapter = createEntityAdapter()
const logSlice = createSlice({
  name: 'log',
  initialState: {
    state: LoadingState.Idle,
    data: logAdapter.getInitialState(),
  },
  extraReducers: {
    [loadLogData.pending]: (state) => {
      state.state = LoadingState.Loading
      state.data = logAdapter.getInitialState()
    },
    [loadLogData.fulfilled]: (state, action) => {
      state.state = LoadingState.Loaded
      logAdapter.setAll(state.data, action.payload)
    },
    [loadLogData.rejected]: (state) => {
      state.state = LoadingState.Failed
      state.data = logAdapter.getInitialState()
    },
    [appendLog.fulfilled]: (state, action) => {
      logAdapter.addOne(state.data, action.payload)
    }
  },
})

// Selectors
export const getConnectionState = state => state.current.connectionState
export const getConnectionUrl = state => state.project.data ? state.project.data.connection.url : ''
export const getRequestText = state => state.project.data ? state.project.data.request.text : ''
export const getSelectedHistoryID = state => state.current.selectedHistoryID

const historySelectors = historyAdapter.getSelectors(state => state.history.data)
export const getHistoryState = state => state.history.state
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

const logSelectors = logAdapter.getSelectors(state => state.log.data)
export const getLogState = state => state.log.state
export const getLogs = state => logSelectors.selectAll(state)


// Reducer
export default combineReducers({
  current: currentSlice.reducer,
  project: projectSlice.reducer,
  history: historySlice.reducer,
  log: logSlice.reducer,
})
