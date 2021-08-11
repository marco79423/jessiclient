import {createDraftSafeSelector} from '@reduxjs/toolkit'
import {entityAdapter} from '../project'

export const getProjectState = state => state.current.projectState
export const getConnectionState = state => state.current.connectionState
export const getCurrencyFavoriteCategoryID = state => state.current.currencyFavoriteCategoryID
export const getCurrentFavoriteRequestID = state => state.current.currentFavoriteRequestID
export const getSelectedMessageID = state => state.current.selectedMessageID
export const getSchedulerEnabledStatus = state => state.current.schedulerEnabled
export const getShareLink = state => state.current.shareLink
export const getMessagePanelOn = state => state.current.messagePanelOn

const searchQuerySelectors = entityAdapter.getSelectors(state => state.current.searchQuery)
export const selectSearchQueryIDs = state => searchQuerySelectors.selectIds(state)
export const getSearchQueries = state => searchQuerySelectors.selectAll(state)
export const getSearchQuery = id => state => searchQuerySelectors.selectById(state, id)


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
export const getFavoriteRequestCategorySelections = createDraftSafeSelector(
  [getFavoriteRequestCategories],
  (categories) => categories
    .map(favoriteRequestCategory => ({
      key: favoriteRequestCategory.id,
      label: favoriteRequestCategory.label,
      value: favoriteRequestCategory.id,
    }))
)

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
export const selectAllMessages = state => messageSelectors.selectAll(state)
export const selectFilterMessageIDs = createDraftSafeSelector(
  [
    selectAllMessages,
    getSearchQueries,
  ],
  (messages, searchQueries) => messages
    .filter(message => searchQueries.map(searchQuery => message.body.includes(searchQuery.value)).reduce((a, b) => a && b, true))
    .map(message => message.id)
)

export const getMessage = id => state => messageSelectors.selectById(state, id)
export const getSelectedMessage = createDraftSafeSelector(
  [
    getSelectedMessageID,
    state => id => messageSelectors.selectById(state, id),
  ],
  (selectedID, messageFunc) => messageFunc(selectedID),
)
