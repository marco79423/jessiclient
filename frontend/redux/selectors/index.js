import {createDraftSafeSelector, createEntityAdapter} from '@reduxjs/toolkit'

const entityAdapter = createEntityAdapter()

export const selectProjectState = state => state.current.projectState
export const selectCurrencyFavoriteCategoryID = state => state.current.currencyFavoriteCategoryID
export const selectCurrentFavoriteRequestID = state => state.current.currentFavoriteRequestID
export const selectSelectedMessageID = state => state.current.selectedMessageID
export const selectShareLink = state => state.current.shareLink
export const selectMessagePanelOn = state => state.current.messagePanelOn

const searchQuerySelectors = entityAdapter.getSelectors(state => state.current.searchQuery)
export const selectSearchQueryIDs = state => searchQuerySelectors.selectIds(state)
export const selectSearchQueries = state => searchQuerySelectors.selectAll(state)
export const selectSearchQuery = id => state => searchQuerySelectors.selectById(state, id)


export const selectProjectData = state => state.project
export const selectProjectDataWithoutMessages = createDraftSafeSelector(
  selectProjectData,
  projectData => ({
    ...projectData,
    message: entityAdapter.getInitialState(),
  })
)

export const selectConnectionUrl = state => state.project.connection.url

export const selectRequestBody = state => state.project.request.body

export const selectScheduleTimeInterval = state => state.project.schedule.timeInterval

const favoriteRequestCategorySelectors = entityAdapter.getSelectors(state => state.project.favoriteRequestCategory)
export const selectFavoriteRequestCategories = state => favoriteRequestCategorySelectors.selectAll(state)
export const selectFavoriteRequestCategoryID = state => favoriteRequestCategorySelectors.selectIds(state)
export const selectFavoriteRequestCategorySelections = createDraftSafeSelector(
  [selectFavoriteRequestCategories],
  (categories) => categories
    .map(favoriteRequestCategory => ({
      key: favoriteRequestCategory.id,
      label: favoriteRequestCategory.label,
      value: favoriteRequestCategory.id,
    }))
)

export const selectCurrentFavoriteRequestCategory = createDraftSafeSelector(
  [
    selectCurrencyFavoriteCategoryID,
    state => id => favoriteRequestCategorySelectors.selectById(state, id),
  ],
  (selectedID, messageFunc) => messageFunc(selectedID),
)

const favoriteRequestSelectors = entityAdapter.getSelectors(state => state.project.favoriteRequest)
export const selectFavoriteRequests = state => favoriteRequestSelectors.selectAll(state)
export const selectFavoriteRequest = id => state => favoriteRequestSelectors.selectById(state, id)
export const selectFilteredFavoriteRequestIDs = createDraftSafeSelector(
  [
    selectFavoriteRequests,
    selectCurrencyFavoriteCategoryID,
  ],
  (favoriteRequests, currentFavoriteRequestCategoryID) => favoriteRequests
    .filter(favoriteRequest => favoriteRequest.categoryID === currentFavoriteRequestCategoryID)
    .map(favoriteRequest => favoriteRequest.id)
)

const messageSelectors = entityAdapter.getSelectors(state => state.project.message)
export const selectAllMessages = state => messageSelectors.selectAll(state)
export const selectFilterMessageIDs = createDraftSafeSelector(
  [
    selectAllMessages,
    selectSearchQueries,
  ],
  (messages, searchQueries) => messages
    .filter(message => searchQueries.map(searchQuery => message.body.includes(searchQuery.value)).reduce((a, b) => a && b, true))
    .map(message => message.id)
)

export const selectMessage = id => state => messageSelectors.selectById(state, id)
export const selectSelectedMessage = createDraftSafeSelector(
  [
    selectSelectedMessageID,
    state => id => messageSelectors.selectById(state, id),
  ],
  (selectedID, messageFunc) => messageFunc(selectedID),
)
