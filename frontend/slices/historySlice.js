import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit'

import {LoadingState} from '../constants'

const loadHistoryData = createAsyncThunk(
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

const historySelectors = historyAdapter.getSelectors(state => state.history.data)

const selectHistoryState = state => state.history.state
const selectHistories = state => historySelectors.selectAll(state)
const selectHistoryFunc = state => id => historySelectors.selectById(state, id)

// Actions
export {loadHistoryData}

// Selectors
export {selectHistoryState, selectHistories, selectHistoryFunc}

// Reducer
export default historySlice.reducer
