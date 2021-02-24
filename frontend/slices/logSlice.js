import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit'

import {loadLogs} from '../features/log'

const IDLE_STATE = 'idle'
const LOADING_STATE = 'loading'
const LOADED_STATE = 'loaded'
const FAILED_STATE = 'failed'

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
    state: IDLE_STATE,
    data: logAdapter.getInitialState(),
  },
  extraReducers: {
    [loadLogData.pending]: (state) => {
      state.state = LOADING_STATE
      state.data = logAdapter.getInitialState()
    },
    [loadLogData.fulfilled]: (state, action) => {
      state.state = LOADED_STATE
      logAdapter.setAll(state.data, action.payload)
    },
    [loadLogData.rejected]: (state) => {
      state.state = FAILED_STATE
      state.data = logAdapter.getInitialState()
    },
  },
})

export {loadLogData}

export default logSlice.reducer
