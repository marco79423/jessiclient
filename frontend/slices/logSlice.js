import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit'

import {loadLogs} from '../features/log'
import {LoadingState} from '../constants'


const loadLogData = createAsyncThunk(
  'log/loadData',
  async () => {
    return await loadLogs()
  }
)

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

export {loadLogData}

export default logSlice.reducer
