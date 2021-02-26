import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {LoadingState} from '../constants'


export const loadProjectData = createAsyncThunk(
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

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    state: LoadingState.Idle,
    data: null
  },
  reducers: {

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
