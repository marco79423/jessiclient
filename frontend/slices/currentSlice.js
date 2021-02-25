import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import {loadProjectData} from './projectSlice'
import {loadHistoryData} from './historySlice'
import {loadLogData} from './logSlice'

const initializeData = createAsyncThunk(
  'current/initializeData',
  async (_, {dispatch}) => {
    await dispatch(loadProjectData())
    await dispatch(loadHistoryData())
    await dispatch(loadLogData())
  }
)

const currentSlice = createSlice({
  name: 'current',
  initialState: {
    connectionState: 'idle', // idle, connecting, connected, closed
  },
  reducers: {},
})

export {initializeData}

export default currentSlice.reducer
