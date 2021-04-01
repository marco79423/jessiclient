import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit'
import generateRandomString from '../utils/generateRandomString'


// Actions
export const setProjectData = createAsyncThunk(
  'project/setProjectData',
  async (projectData) => {
    return projectData
  }
)

export const changeSettingMaxMessageCount = createAsyncThunk(
  'project/setting/changeSettingMaxMessageCount',
  async (maxMessageCount) => {
    return maxMessageCount
  }
)

export const changeConnectionUrl = createAsyncThunk(
  'project/connection/changeConnectionUrl',
  async (url) => {
    return url
  }
)

export const changeRequestText = createAsyncThunk(
  'project/request/changeRequestText',
  async (requestText) => {
    return requestText
  }
)

export const changeScheduleTimeInterval = createAsyncThunk(
  'project/schedule/changeScheduleTimeInterval',
  async (period) => {
    return +period
  }
)

export const changeScheduleRequestText = createAsyncThunk(
  'project/schedule/changeScheduleRequestText',
  async (requestText) => {
    return requestText
  }
)


export const addFavoriteRequest = createAsyncThunk(
  'project/request/addFavoriteRequest',
  async (favoriteRequest) => {
    return favoriteRequest
  }
)

export const removeFavoriteRequest = createAsyncThunk(
  'project/request/removeFavoriteRequest',
  async (id) => {
    return id
  }
)

export const clearFavoriteRequests = createAsyncThunk(
  'project/request/clearFavoriteRequests',
  async () => {

  }
)

export const appendMessage = createAsyncThunk(
  'project/message/appendMessage',
  async (message) => {
    return message
  }
)

export const removeFirstMessage = createAsyncThunk(
  'project/message/removeFirstMessage',
  async () => {

  }
)

export const clearMessages = createAsyncThunk(
  'project/message/clearMessages',
  async (_, {dispatch}) => {
  }
)

// Slice
export const messageAdapter = createEntityAdapter()
export const favoriteRequestAdapter = createEntityAdapter()
const projectSlice = createSlice({
  name: 'project',
  initialState: {
    // 設定
    setting: {
      maxMessageCount: 100,
    },

    // 連線資訊
    connection: {
      url: 'wss://echo.websocket.org',
    },

    // 請求
    request: {
      text: '',
    },

    // 排程
    schedule: {
      timeInterval: 3,
      request: {
        text: '',
      }
    },

    // 常用訊息
    favoriteRequest: favoriteRequestAdapter.getInitialState(),

    // 訊息
    message: messageAdapter.getInitialState(),
  },
  extraReducers: {
    [setProjectData.fulfilled]: (state, action) => {
      return action.payload
    },
    [changeSettingMaxMessageCount.fulfilled]: (state, action) => {
      state.setting.maxMessageCount = action.payload
    },
    [changeConnectionUrl.fulfilled]: (state, action) => {
      state.connection.url = action.payload
    },
    [changeRequestText.fulfilled]: (state, action) => {
      state.request.text = action.payload
    },
    [changeScheduleTimeInterval.fulfilled]: (state, action) => {
      state.schedule.timeInterval = action.payload
    },
    [changeScheduleRequestText().fulfilled]: (state, action) => {
      state.schedule.request.text = action.payload
    },
    [addFavoriteRequest.fulfilled]: (state, action) => {
      favoriteRequestAdapter.addOne(state.favoriteRequest, action.payload)
    },
    [removeFavoriteRequest.fulfilled]: (state, action) => {
      favoriteRequestAdapter.removeOne(state.favoriteRequest, action.payload)
    },
    [clearFavoriteRequests.fulfilled]: (state) => {
      favoriteRequestAdapter.removeAll(state.favoriteRequest)
    },
    [removeFirstMessage.fulfilled]: (state) => {
      messageAdapter.removeOne(state.message, state.message.ids[0])
    },
    [appendMessage.fulfilled]: (state, action) => {
      messageAdapter.addOne(state.message, action.payload)
    },
    [clearMessages.fulfilled]: (state) => {
      messageAdapter.removeAll(state.message)
    },
  },
})

// Reducer
export default projectSlice
