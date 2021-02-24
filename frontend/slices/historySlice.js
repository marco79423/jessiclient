import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit'
import {loadHistories} from '../features/history'

const IDLE_STATE = 'idle'
const LOADING_STATE = 'loading'
const LOADED_STATE = 'loaded'
const FAILED_STATE = 'failed'


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
    state: IDLE_STATE,
    data: historyAdapter.getInitialState(),
  },
  extraReducers: {
    [loadHistoryData.pending]: (state) => {
      state.state = LOADING_STATE
      state.data = historyAdapter.getInitialState()
    },
    [loadHistoryData.fulfilled]: (state, action) => {
      state.state = LOADED_STATE
      historyAdapter.setAll(state.data, action.payload)
    },
    [loadHistoryData.rejected]: (state) => {
      state.state = FAILED_STATE
      state.data = historyAdapter.getInitialState()
    },
  },
})

export {loadHistoryData}

export default historySlice.reducer
