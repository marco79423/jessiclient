import {createDraftSafeSelector} from '@reduxjs/toolkit'
import {entityAdapter} from '../project'


export const getProjectState = state => state.current.projectState
export const getConnectionState = state => state.current.connectionState
export const getCurrencyFavoriteCategoryID = state => state.current.currencyFavoriteCategoryID
export const getCurrentFavoriteRequestID = state => state.current.currentFavoriteRequestID
export const getSearchFilters = state => state.current.searchFilters
export const getSelectedMessageID = state => state.current.selectedMessageID
export const getSchedulerEnabledStatus = state => state.current.schedulerEnabled
export const getShareLink = state => state.current.shareLink
export const getMessagePanelOn = state => state.current.messagePanelOn

export const getProjectData = state => state.project
export const getProjectDataWithoutMessages = createDraftSafeSelector(
  getProjectData,
  projectData => ({
    ...projectData,
    message: entityAdapter.getInitialState(),
  })
)

export const getConnectionUrl = state => state.project.connection.url

export const getRequestBody = state => state.project.request.body

export const getScheduleTimeInterval = state => state.project.schedule.timeInterval

const favoriteRequestCategorySelectors = entityAdapter.getSelectors(state => state.project.favoriteRequestCategory)
export const getFavoriteRequestCategories = state => favoriteRequestCategorySelectors.selectAll(state)

export const getCurrentFavoriteRequestCategory = createDraftSafeSelector(
  [
    getCurrencyFavoriteCategoryID,
    state => id => favoriteRequestCategorySelectors.selectById(state, id),
  ],
  (selectedID, messageFunc) => messageFunc(selectedID),
)

const favoriteRequestSelectors = entityAdapter.getSelectors(state => state.project.favoriteRequest)
export const getFavoriteRequests = state => favoriteRequestSelectors.selectAll(state)
export const getFilteredFavoriteRequests = createDraftSafeSelector(
  [
    getFavoriteRequests,
    getCurrencyFavoriteCategoryID,
  ],
  (favoriteRequests, currentFavoriteRequestCategoryID) => favoriteRequests
    .filter(favoriteRequest => favoriteRequest.categoryID === currentFavoriteRequestCategoryID)
)

const messageSelectors = entityAdapter.getSelectors(state => state.project.message)
export const getMessages = state => messageSelectors.selectAll(state)
export const getFilterMessages = createDraftSafeSelector(
  [
    getMessages,
    getSearchFilters,
  ],
  (messages, searchFilters) => messages.filter(message => searchFilters.map(searchFilter => message.body.includes(searchFilter)).reduce((a, b) => a && b, true))
)

export const getMessage = createDraftSafeSelector(
  [
    getSelectedMessageID,
    state => id => messageSelectors.selectById(state, id),
  ],
  (selectedID, messageFunc) => messageFunc(selectedID),
)
