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

export {loadHistoryData}

export default historySlice.reducer
