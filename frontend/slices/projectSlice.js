import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {createEmptyProject} from '../features/project'
import {LoadingState} from '../constants'



export const loadProjectData = createAsyncThunk(
  'project/loadData',
  async () => {
    return createEmptyProject()
  }
)

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    state: LoadingState.Idle,
    data: null
  },
  reducers: {
    changeConnectionUrl(state, action) {
      state.connection.url = action.payload
    }
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
  },
})

export default projectSlice.reducer
