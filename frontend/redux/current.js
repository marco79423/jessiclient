import {createAction, createEntityAdapter, createSlice} from '@reduxjs/toolkit'

import {ConnectionState, LoadingState} from '../constants'
import {addFavoriteRequestCategory, clearFavoriteRequests, removeFavoriteRequestCategory} from './project'


// Actions
export const changeProjectState = createAction('current/changeProjectState')

export const changeConnectionState = createAction('current/changeConnectionState')

export const setCurrencyFavoriteCategoryID = createAction('current/setCurrencyFavoriteCategoryID')

export const setCurrentFavoriteRequestID = createAction('current/setCurrentFavoriteRequestID')

export const addSearchQuery = createAction('current/addSearchQuery')

export const removeSearchQuery = createAction('current/removeSearchQuery')

export const clearSearchQueries = createAction('current/clearSearchQueries')

export const setSelectedMessageID = createAction('current/setSelectedMessageID')

export const changeSchedulerEnabledStatus = createAction('current/changeSchedulerEnabledStatus')

export const changeShareLink = createAction('current/changeShareLink')

export const clearShareLink = createAction('current/clearShareLink')

export const showMessagePanel = createAction('current/showMessagePanel')

// Slice
export const entityAdapter = createEntityAdapter()
const currentSlice = createSlice({
  name: 'current',
  initialState: {
    projectState: LoadingState.Idle, // idle, loading, loaded, failed
    connectionState: ConnectionState.Idle, // idle, connecting, connected, closed
    currencyFavoriteCategoryID: null,
    currentFavoriteRequestID: null,

    searchQuery: entityAdapter.getInitialState(),

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
    [addSearchQuery]: (state, action) => {
      entityAdapter.addOne(state.searchQuery, action.payload)
    },
    [removeSearchQuery]: (state, action) => {
      entityAdapter.removeOne(state.searchQuery, action.payload)
    },
    [clearSearchQueries]: (state) => {
      entityAdapter.removeAll(state.searchQuery)
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
