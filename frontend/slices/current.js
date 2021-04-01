import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import {ConnectionState, LoadingState} from '../constants'


// Actions
export const changeProjectState = createAsyncThunk(
  'current/changeProjectState',
  async (projectState) => {
    return projectState
  }
)

export const changeConnectionState = createAsyncThunk(
  'current/changeConnectionState',
  async (connectionState) => {
    return connectionState
  }
)

export const setSelectedMessageID = createAsyncThunk(
  'current/setSelectedMessageID',
  async (messageID) => {
    return messageID
  }
)

export const setAppliedFavoriteRequestID = createAsyncThunk(
  'current/setAppliedFavoriteRequestID',
  async (appliedFavoriteRequestID) => {
    return appliedFavoriteRequestID
  }
)

export const clearAppliedFavoriteRequestID = createAsyncThunk(
  'current/clearAppliedFavoriteRequestID',
  async () => {

  }
)

export const changeScheduleEnabledStatus = createAsyncThunk(
  'current/changeScheduleEnabledStatus',
  async (enabled) => {
    return enabled
  }
)

export const changeShareLink = createAsyncThunk(
  'current/changeShareLink',
  async (shareLink) => {
    return shareLink
  }
)

export const clearShareLink = createAsyncThunk(
  'current/clearShareLink',
  async () => {

  }
)

// Slice
const currentSlice = createSlice({
  name: 'current',
  initialState: {
    projectState: LoadingState.Idle, // idle, loading, loaded, failed
    connectionState: ConnectionState.Idle, // idle, connecting, connected, closed
    selectedMessageID: null,
    appliedFavoriteRequestID: null,
    scheduleEnabled: false,
    shareLink: null,
  },
  extraReducers: {
    [changeProjectState.fulfilled]: (state, action) => {
      state.projectState = action.payload
    },
    [changeConnectionState.fulfilled]: (state, action) => {
      state.connectionState = action.payload
    },
    [setSelectedMessageID.fulfilled]: (state, action) => {
      state.selectedMessageID = action.payload
    },
    [setAppliedFavoriteRequestID.fulfilled]: (state, action) => {
      state.appliedFavoriteRequestID = action.payload
    },
    [clearAppliedFavoriteRequestID.fulfilled]: (state) => {
      state.appliedFavoriteRequestID = null
    },
    [changeScheduleEnabledStatus.fulfilled]: (state, action) => {
      state.scheduleEnabled = action.payload
    },
    [changeShareLink.fulfilled]: (state, action) => {
      state.shareLink = action.payload
    },
    [clearShareLink.fulfilled]: (state) => {
      state.shareLink = null
    },
  }
})


// Reducer
export default currentSlice
