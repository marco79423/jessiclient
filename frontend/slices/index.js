import {
  combineReducers,
  createAsyncThunk,
  createDraftSafeSelector,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit'

import {ConnectionState, LoadingState} from '../constants'

// Actions

export const changeConnectionState = createAsyncThunk(
  'current/changeConnectionState',
  async (state) => {
    return state
  }
)

export const selectHistory = createAsyncThunk(
  'current/selectHistory',
  async (historyID) => {
    return historyID
  }
)

export const unselectHistory = createAsyncThunk(
  'current/selectHistory',
  async () => {

  }
)

export const loadProjectData = createAsyncThunk(
  'project/loadData',
  async () => {
    return {
      // 設定
      setting: {
        reconnectTimes: 3
      },

      // 連線資訊
      connection: {
        url: '',
      },

      // 請求
      request: {
        text: '',
        format: 'json'
      }
    }
  }
)

export const changeConnectionUrl = createAsyncThunk(
  'project/changeConnectionUrl',
  async (url) => {
    return url
  }
)

export const loadHistoryData = createAsyncThunk(
  'history/loadData',
  async () => {
    return [
      {
        id: 1,
        time: new Date().toISOString(),
        text: '{"selections":[{"id":"1","odds":"0.64","euOdds":"1.54","status":"active","ballTitle":"GoianesiaECGO","ballHead":"","matchInfo":{"sportID":"1","tournamentName":"<tournamentName>","isInPlay":true,"period":"等待加时赛","duration":"90:31","competitors":[{"name":"RossCountyFC","imageUrl":"https://img.ttshow.tw/images/media/uploads/2020/02/07/1561674586.JPG","score":{"value":0},"info":{"firstHalf":0,"secondHalf":0,"firstHalfOT":null,"secondHalfOT":null,"penaltyKick":null,"yellowCards":0,"redCards":0,"cornerKicks":0}},{"name":"RossCountyFC2","imageUrl":"https://img.ttshow.tw/images/media/uploads/2020/02/07/1561674586.JPG","score":{"value":0},"info":{"firstHalf":0,"secondHalf":0,"firstHalfOT":null,"secondHalfOT":null,"penaltyKick":null,"yellowCards":0,"redCards":0,"cornerKicks":0}}],"marketName":"1x2"},"playerInfo":{"playerID":"123123","currencyCode":"rmb","minStake":"10","maxStake":"1000"}}],"comboOddsList":[],"playerInfo":{"playerID":"123123","currencyCode":"rmb","minStake":"10","maxStake":"1000"}}'
      },
      {
        id: 2,
        time: new Date().toISOString(),
        text: '{"selections":[{"id":"1","odds":"0.64","euOdds":"1.54","status":"active","ballTitle":"GoianesiaECGO","ballHead":"","matchInfo":{"sportID":"1","tournamentName":"<tournamentName>","isInPlay":true,"period":"等待加时赛","duration":"90:31","competitors":[{"name":"RossCountyFC","imageUrl":"https://img.ttshow.tw/images/media/uploads/2020/02/07/1561674586.JPG","score":{"value":0},"info":{"firstHalf":0,"secondHalf":0,"firstHalfOT":null,"secondHalfOT":null,"penaltyKick":null,"yellowCards":0,"redCards":0,"cornerKicks":0}},{"name":"RossCountyFC2","imageUrl":"https://img.ttshow.tw/images/media/uploads/2020/02/07/1561674586.JPG","score":{"value":0},"info":{"firstHalf":0,"secondHalf":0,"firstHalfOT":null,"secondHalfOT":null,"penaltyKick":null,"yellowCards":0,"redCards":0,"cornerKicks":0}}],"marketName":"1x2"},"playerInfo":{"playerID":"123123","currencyCode":"rmb","minStake":"10","maxStake":"1000"}}],"comboOddsList":[],"playerInfo":{"playerID":"123123","currencyCode":"rmb","minStake":"10","maxStake":"1000"}}'
      }
    ]
  }
)

export const loadLogData = createAsyncThunk(
  'log/loadData',
  async () => {
    return [
      {
        id: 1,
      },
      {
        id: 2,
      }
    ]
  }
)

export const initialize = createAsyncThunk(
  'initialize',
  async (_, {dispatch}) => {
    await dispatch(loadProjectData())
    await dispatch(loadHistoryData())
    await dispatch(loadLogData())
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
    [selectHistory.fulfilled]: (state, action) => {
      state.selectedHistoryID = action.payload
    },
    [unselectHistory.fulfilled]: (state) => {
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
  },
})

// Selectors
export const getConnectionState = state => state.current.connectionState
export const getConnectionUrl = state => state.project.data ? state => state.project.data.connection.url : ''
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


// Reducer
export default combineReducers({
  current: currentSlice.reducer,
  project: projectSlice.reducer,
  history: historySlice.reducer,
  log: logSlice.reducer,
})
