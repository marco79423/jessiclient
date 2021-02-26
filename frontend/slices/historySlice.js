import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit'
import {loadHistories} from '../features/history'
import {LoadingState} from '../constants'

const loadHistoryData = createAsyncThunk(
  'history/loadData',
  async () => {
    return await loadHistories()
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
