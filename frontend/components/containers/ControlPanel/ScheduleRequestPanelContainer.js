import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useGA4React} from 'ga-4-react'

import generateRandomString from '../../../utils/generateRandomString'
import {ConnectionState} from '../../../constants'
import FavoriteRequestDialogContainer from './FavoriteRequestDialogContainer'
import {
  getAppliedFavoriteRequest,
  getConnectionState, getRequestBody,
  getScheduleEnabledStatus,
  getScheduleTimeInterval
} from '../../../selectors'
import {
  changeScheduleEnabledStatus,
  clearAppliedFavoriteRequestID,
  setAppliedFavoriteRequestID
} from '../../../slices/current'
import {addFavoriteRequest, changeRequestBody, changeScheduleTimeInterval} from '../../../slices/project'
import ScheduleRequestPanel from '../../modules/ControlPanel/ScheduleRequestPanel'


export default function ScheduleRequestPanelContainer({appController}) {
  const dispatch = useDispatch()
  const ga4React = useGA4React()
  const connectionState = useSelector(getConnectionState)
  const requestBody = useSelector(getRequestBody)
  const appliedFavoriteRequest = useSelector(getAppliedFavoriteRequest)
  const scheduleEnabled = useSelector(getScheduleEnabledStatus)
  const timeInterval = useSelector(getScheduleTimeInterval)
  const [favoriteRequestDialogOpen, setFavoriteRequestDialog] = useState(false)
  const [localRequestBody, setLocalRequestBody] = useState('')
  const [localScheduleTimeInterval, setLocalTimeInterval] = useState(3)

  useEffect(() => {
    setLocalRequestBody(requestBody)
  }, [requestBody])

  useEffect(() => {
    setLocalTimeInterval(timeInterval)
  }, [timeInterval])

  const onRequestBodyChange = (value) => {
    setLocalRequestBody(value)
    dispatch(clearAppliedFavoriteRequestID())
  }

  const onScheduleTimeIntervalChange = (e) => {
    dispatch(changeScheduleTimeInterval(e.target.value))
  }

  const onAppliedFavoriteRequestButtonClicked = () => {
    if (appliedFavoriteRequest) {
      dispatch(clearAppliedFavoriteRequestID(appliedFavoriteRequest.id))
    } else {
      const favoriteRequest = {
        id: generateRandomString(),
        name: new Date().toLocaleString(),
        body: localRequestBody,
      }
      dispatch(addFavoriteRequest(favoriteRequest))
      dispatch(setAppliedFavoriteRequestID(favoriteRequest.id))
    }
  }

  const onEnableButtonClicked = async () => {
    if (scheduleEnabled) {
      await appController.disableScheduler()
      await dispatch(changeScheduleEnabledStatus(false))
    } else {
      await dispatch(changeRequestBody(localRequestBody))
      await dispatch(changeScheduleTimeInterval(+localScheduleTimeInterval))
      await appController.enableScheduler(localRequestBody, +localScheduleTimeInterval)
      dispatch(changeScheduleEnabledStatus(true))
    }
  }

  const showFavoriteRequestDialog = () => {
    setFavoriteRequestDialog(true)
    ga4React.gtag('event', 'show_favorite_requests_panel')
  }

  const hideFavoriteRequestDialog = () => {
    setFavoriteRequestDialog(false)
  }

  return (
    <>
      <ScheduleRequestPanel
        isConnected={connectionState === ConnectionState.Connected}
        scheduleTimeInterval={localScheduleTimeInterval}
        isFavoriteRequest={!!appliedFavoriteRequest}
        scheduleEnabled={scheduleEnabled}
        requestBody={localRequestBody}
        onRequestBodyChange={onRequestBodyChange}
        onScheduleTimeIntervalChange={onScheduleTimeIntervalChange}
        onShowFavoriteRequestsClick={showFavoriteRequestDialog}
        onAppliedFavoriteRequestClick={onAppliedFavoriteRequestButtonClicked}
        onEnableButtonClick={onEnableButtonClicked}
      />
      <FavoriteRequestDialogContainer
        appController={appController}
        open={favoriteRequestDialogOpen}
        onClose={hideFavoriteRequestDialog}
      />
    </>
  )
}
