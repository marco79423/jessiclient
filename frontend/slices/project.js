import {createAction, createEntityAdapter, createSlice} from '@reduxjs/toolkit'


// Actions
export const setProjectData = createAction('project/setProjectData')

export const changeSettingMaxMessageCount = createAction('project/setting/changeSettingMaxMessageCount')

export const changeConnectionUrl = createAction('project/connection/changeConnectionUrl')

export const changeRequestText = createAction('project/request/changeRequestText')

export const changeScheduleTimeInterval = createAction('project/schedule/changeScheduleTimeInterval')

export const changeScheduleRequestText = createAction('project/schedule/changeScheduleRequestText')


export const addFavoriteRequest = createAction('project/request/addFavoriteRequest')

export const removeFavoriteRequest = createAction('project/request/removeFavoriteRequest')

export const clearFavoriteRequests = createAction('project/request/clearFavoriteRequests')

export const appendMessage = createAction('project/message/appendMessage')

export const removeFirstMessage = createAction( 'project/message/removeFirstMessage')

export const clearMessages = createAction(  'project/message/clearMessages')

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
    [setProjectData]: (state, action) => {
      return action.payload
    },
    [changeSettingMaxMessageCount]: (state, action) => {
      state.setting.maxMessageCount = action.payload
    },
    [changeConnectionUrl]: (state, action) => {
      state.connection.url = action.payload
    },
    [changeRequestText]: (state, action) => {
      state.request.text = action.payload
    },
    [changeScheduleTimeInterval]: (state, action) => {
      state.schedule.timeInterval = action.payload
    },
    [changeScheduleRequestText]: (state, action) => {
      state.schedule.request.text = action.payload
    },
    [addFavoriteRequest]: (state, action) => {
      favoriteRequestAdapter.addOne(state.favoriteRequest, action.payload)
    },
    [removeFavoriteRequest]: (state, action) => {
      favoriteRequestAdapter.removeOne(state.favoriteRequest, action.payload)
    },
    [clearFavoriteRequests]: (state) => {
      favoriteRequestAdapter.removeAll(state.favoriteRequest)
    },
    [removeFirstMessage]: (state) => {
      messageAdapter.removeOne(state.message, state.message.ids[0])
    },
    [appendMessage]: (state, action) => {
      messageAdapter.addOne(state.message, action.payload)
    },
    [clearMessages]: (state) => {
      messageAdapter.removeAll(state.message)
    },
  },
})

// Reducer
export default projectSlice
