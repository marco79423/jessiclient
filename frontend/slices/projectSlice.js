import {createAsyncThunk, createDraftSafeSelector, createSlice} from '@reduxjs/toolkit'
import {LoadingState} from '../constants'


const loadProjectData = createAsyncThunk(
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

const changeConnectionUrl = createAsyncThunk(
  'project/changeConnectionUrl',
  async (url) => {
    return url
  }
)

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    state: LoadingState.Idle,
    data: null
  },
  reducers: {},
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

const selectProjectData = state => state.project.data
const selectConnectionUrl = createDraftSafeSelector(
  selectProjectData,
  projectData => projectData ? projectData.connection.url : ''
)

// Actions
export {loadProjectData, changeConnectionUrl}

// Selectors
export {selectConnectionUrl}

// Reducer
export default projectSlice.reducer
