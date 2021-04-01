import {createDraftSafeSelector} from '@reduxjs/toolkit'
import {favoriteRequestAdapter, messageAdapter} from '../slices/project'


export const getProjectState = state => state.current.projectState
export const getConnectionState = state => state.current.connectionState
export const getSelectedMessageID = state => state.current.selectedMessageID
export const getAppliedFavoriteRequestID = state => state.current.appliedFavoriteRequestID
export const getScheduleEnabledStatus = state => state.current.scheduleEnabled
export const getShareLink = state => state.current.shareLink

export const getProjectData = state => state.project
export const getProjectDataWithoutMessages = createDraftSafeSelector(
  getProjectData,
  projectData => ({
    ...projectData,
    message: messageAdapter.getInitialState(),
  })
)
export const getSettingMaxMessageCount = state => state.project.setting.maxMessageCount

export const getConnectionUrl = state => state.project.connection.url

export const getRequestText = state => state.project.request.text

export const getScheduleTimeInterval = state => state.project.schedule.timeInterval
export const getScheduleRequestText = state => state.project.schedule.request.text

const favoriteRequestSelectors = favoriteRequestAdapter.getSelectors(state => state.project.favoriteRequest)
export const getFavoriteRequests = state => favoriteRequestSelectors.selectAll(state)
export const getAppliedFavoriteRequest = createDraftSafeSelector(
  [
    getAppliedFavoriteRequestID,
    state => id => favoriteRequestSelectors.selectById(state, id),
  ],
  (appliedFavoriteRequestID, favoriteRequestFunc) => favoriteRequestFunc(appliedFavoriteRequestID),
)

const messageSelectors = messageAdapter.getSelectors(state => state.project.message)
export const getMessageCount = state => messageSelectors.selectTotal(state)
export const getMessages = state => messageSelectors.selectAll(state)
export const getMessage = createDraftSafeSelector(
  [
    getSelectedMessageID,
    state => id => messageSelectors.selectById(state, id),
  ],
  (selectedID, messageFunc) => messageFunc(selectedID),
)
