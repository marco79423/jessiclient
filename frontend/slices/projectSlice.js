import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {createEmptyProject} from '../features/project'

export const IDLE_STATE = 'idle'
export const LOADING_STATE = 'loading'
export const LOADED_STATE = 'loaded'
export const FAILED_STATE = 'failed'


export const loadProjectData = createAsyncThunk(
  'project/loadData',
  async () => {
    return createEmptyProject()
  }
)


const projectSlice = createSlice({
  name: 'project',
  initialState: {
    state: IDLE_STATE,
    data: null
  },
  extraReducers: {
    [loadProjectData.pending]: (state) => {
      state.state = LOADING_STATE
      state.data = null
    },
    [loadProjectData.fulfilled]: (state, action) => {
      state.state = LOADED_STATE
      state.data = action.payload
    },
    [loadProjectData.rejected]: (state) => {
      state.state = FAILED_STATE
      state.data = null
    },
  },
})

export default projectSlice.reducer
