import {createAction, createSlice} from '@reduxjs/toolkit'

import {ConnectionState, LoadingState} from '../constants'


// Actions
export const changeProjectState = createAction('current/changeProjectState')

export const changeConnectionState = createAction('current/changeConnectionState')

export const setCurrencyFavoriteCategoryID = createAction('current/setCurrencyFavoriteCategoryID')

export const setCurrentFavoriteRequestID = createAction('current/setCurrentFavoriteRequestID')

export const setSearchFilters = createAction('current/setSearchFilters')

export const setSelectedMessageID = createAction('current/setSelectedMessageID')

export const changeSchedulerEnabledStatus = createAction('current/changeSchedulerEnabledStatus')

export const changeShareLink = createAction('current/changeShareLink')

export const clearShareLink = createAction('current/clearShareLink')

export const showMessagePanel = createAction('current/showMessagePanel')

// Slice
const currentSlice = createSlice({
  name: 'current',
  initialState: {
    projectState: LoadingState.Idle, // idle, loading, loaded, failed
    connectionState: ConnectionState.Idle, // idle, connecting, connected, closed
    currencyFavoriteCategoryID: null,
    currentFavoriteRequestID: null,
    searchFilters: [],
    selectedMessageID: null,
    schedulerEnabled: false,
    shareLink: '',

    messagePanelOn: false,
  },
  extraReducers: {
    [changeProjectState]: (state, action) => {
      state.projectState = action.payload
    },
    [changeConnectionState]: (state, action) => {
      state.connectionState = action.payload
    },
    [setCurrencyFavoriteCategoryID]: (state, action) => {
      state.currencyFavoriteCategoryID = action.payload
    },
    [setCurrentFavoriteRequestID]: (state, action) => {
      state.currentFavoriteRequestID = action.payload
    },
    [setSearchFilters]: (state, action) => {
      state.searchFilters = action.payload
    },
    [setSelectedMessageID]: (state, action) => {
      state.selectedMessageID = action.payload
    },
    [changeSchedulerEnabledStatus]: (state, action) => {
      state.schedulerEnabled = action.payload
    },
    [changeShareLink]: (state, action) => {
      state.shareLink = action.payload
    },
    [clearShareLink]: (state) => {
      state.shareLink = ''
    },
    [showMessagePanel]: (state, action) => {
      state.messagePanelOn = action.payload
    },
  }
})


// Reducer
export default currentSlice
