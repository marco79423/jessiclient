import {createAction, createSlice} from '@reduxjs/toolkit'

import {AppMobileDisplayMode, AppWebDisplayMode, ConnectionState, LoadingState} from '../constants'


// Actions
export const changeProjectState = createAction('current/changeProjectState')

export const changeConnectionState = createAction('current/changeConnectionState')

export const setSelectedMessageID = createAction('current/setSelectedMessageID')

export const changeScheduleEnabledStatus = createAction('current/changeScheduleEnabledStatus')

export const changeShareLink = createAction('current/changeShareLink')

export const clearShareLink = createAction('current/clearShareLink')

export const changeWebDisplayMode = createAction('current/changeWebDisplayMode')

export const changeMobileDisplayMode = createAction('current/changeMobileDisplayMode')

// Slice
const currentSlice = createSlice({
  name: 'current',
  initialState: {
    projectState: LoadingState.Idle, // idle, loading, loaded, failed
    connectionState: ConnectionState.Idle, // idle, connecting, connected, closed
    selectedMessageID: null,
    scheduleEnabled: false,
    shareLink: '',

    webDisplayMode: AppWebDisplayMode.DetailPanelOff,
    mobileDisplayMode: AppMobileDisplayMode.MainPanel,
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
    [changeWebDisplayMode]: (state, action) => {
      state.webDisplayMode = action.payload
    },
    [changeMobileDisplayMode]: (state, action) => {
      state.mobileDisplayMode = action.payload
    },
  }
})


// Reducer
export default currentSlice
