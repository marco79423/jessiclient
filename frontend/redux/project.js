import {createAction, createEntityAdapter, createSlice} from '@reduxjs/toolkit'

import {ProjectVersion} from '../features/project/ProjectProvider'


// Actions
export const setProjectData = createAction('project/setProjectData')

export const changeSettingMaxMessageCount = createAction('project/setting/changeSettingMaxMessageCount')

export const changeConnectionUrl = createAction('project/connection/changeConnectionUrl')

export const changeRequestBody = createAction('project/request/changeRequestBody')

export const changeScheduleTimeInterval = createAction('project/schedule/changeScheduleTimeInterval')

export const addFavoriteRequestCategory = createAction('project/request/addFavoriteRequestCategory')

export const removeFavoriteRequestCategory = createAction('project/request/removeFavoriteRequestCategory')

export const clearFavoriteRequestCategories = createAction('project/request/clearFavoriteRequestCategories')

export const updateFavoriteRequestCategory = createAction('project/request/updateFavoriteRequestCategory')

export const addFavoriteRequest = createAction('project/request/addFavoriteRequest')

export const removeFavoriteRequest = createAction('project/request/removeFavoriteRequest')

export const clearFavoriteRequests = createAction('project/request/clearFavoriteRequests')

export const updateFavoriteRequest = createAction('project/request/updateFavoriteRequest')

export const appendMessage = createAction('project/message/appendMessage')

export const removeFirstMessage = createAction('project/message/removeFirstMessage')

export const clearMessages = createAction('project/message/clearMessages')

// Slice
const entityAdapter = createEntityAdapter()
const projectSlice = createSlice({
  name: 'project',
  initialState: {
    version: ProjectVersion,

    // 設定
    setting: {
      maxMessageCount: 100,
    },

    // 連線資訊
    connection: {
      // url: 'wss://echo.websocket.org',  // 這個網站時常會連不上
      url: 'wss://ws.marco79423.net/echo',
    },

    // 請求
    request: {
      body: '',
    },

    // 排程
    schedule: {
      timeInterval: 3,
    },

    // 常用請求分類
    favoriteRequestCategory: entityAdapter.getInitialState(),

    // 常用請求分類
    favoriteRequest: entityAdapter.getInitialState(),

    // 訊息
    message: entityAdapter.getInitialState(),
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
    [changeRequestBody]: (state, action) => {
      state.request.body = action.payload
    },
    [changeScheduleTimeInterval]: (state, action) => {
      state.schedule.timeInterval = action.payload
    },
    // 常用請求分類
    [addFavoriteRequest]: (state, action) => {
      entityAdapter.addOne(state.favoriteRequest, action.payload)
    },
    [removeFavoriteRequest]: (state, action) => {
      entityAdapter.removeOne(state.favoriteRequest, action.payload)
    },
    [clearFavoriteRequests]: (state) => {
      entityAdapter.removeAll(state.favoriteRequest)
    },
    [updateFavoriteRequest]: (state, action) => {
      entityAdapter.updateOne(state.favoriteRequest, action.payload)
    },

    // 常用請求
    [addFavoriteRequestCategory]: (state, action) => {
      entityAdapter.addOne(state.favoriteRequestCategory, action.payload)
    },
    [removeFavoriteRequestCategory]: (state, action) => {
      entityAdapter.removeOne(state.favoriteRequestCategory, action.payload)
    },
    [clearFavoriteRequestCategories]: (state) => {
      entityAdapter.removeAll(state.favoriteRequestCategory)
    },
    [updateFavoriteRequestCategory]: (state, action) => {
      entityAdapter.updateOne(state.favoriteRequestCategory, action.payload)
    },

    // 訊息
    [removeFirstMessage]: (state) => {
      entityAdapter.removeOne(state.message, state.message.ids[0])
    },
    [appendMessage]: (state, action) => {
      const maxMessageCount = state.setting.maxMessageCount
      while (state.message.ids.length >= maxMessageCount) {
        entityAdapter.removeOne(state.message, state.message.ids[0])
      }
      entityAdapter.addOne(state.message, action.payload)
    },
    [clearMessages]: (state) => {
      entityAdapter.removeAll(state.message)
    },
  },
})

// Reducer
export default projectSlice
