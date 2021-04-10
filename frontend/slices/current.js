import {createAction, createSlice} from '@reduxjs/toolkit'

import {ConnectionState, LoadingState} from '../constants'


// Actions
export const changeProjectState = createAction('current/changeProjectState')

export const changeConnectionState = createAction('current/changeConnectionState')

export const setSelectedMessageID = createAction('current/setSelectedMessageID')

export const changeScheduleEnabledStatus = createAction('current/changeScheduleEnabledStatus')

export const changeShareLink = createAction('current/changeShareLink')

export const clearShareLink = createAction('current/clearShareLink')

// Slice
const currentSlice = createSlice({
  name: 'current',
  initialState: {
    projectState: LoadingState.Idle, // idle, loading, loaded, failed
    connectionState: ConnectionState.Idle, // idle, connecting, connected, closed
    selectedMessageID: null,
    scheduleEnabled: false,
    shareLink: '',
  },
  extraReducers: {
    [changeProjectState]: (state, action) => {
      state.projectState = action.payload
    },
    [changeConnectionState]: (state, action) => {
      state.connectionState = action.payload
    },
    [setSelectedMessageID]: (state, action) => {
      state.selectedMessageID = action.payload
    },
    [changeScheduleEnabledStatus]: (state, action) => {
      state.scheduleEnabled = action.payload
    },
    [changeShareLink]: (state, action) => {
      state.shareLink = action.payload
    },
    [clearShareLink]: (state) => {
      state.shareLink = ''
    },
  }
})


// Reducer
export default currentSlice
