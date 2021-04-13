import React, {useState} from 'react'
import {useGA4React} from 'ga-4-react'
import {makeStyles} from '@material-ui/core/styles'
import {useTranslation} from 'next-i18next'
import {useDispatch, useSelector} from 'react-redux'

import {
  getConnectionState,
  getFavoriteRequests,
  getRequestBody,
  getScheduleEnabledStatus,
  getScheduleTimeInterval
} from '../../../selectors'
import {changeScheduleEnabledStatus,} from '../../../slices/current'
import generateRandomString from '../../../utils/generateRandomString'
import {
  addFavoriteRequest,
  changeRequestBody,
  changeScheduleTimeInterval,
  removeFavoriteRequest,
  updateFavoriteRequest
} from '../../../slices/project'
import {ConnectionState} from '../../../constants'
import FavoriteRequestDialog from '../../modules/ControlPanel/FavoriteRequestDialog'
import RequestPanel from '../../modules/ControlPanel/RequestPanel'


const useStyles = makeStyles((theme) => ({
  root: {},
  tab: {
    background: theme.project.page.main.controlPanel.requestPanel.tab,
    fontSize: '1rem',
    borderTopLeftRadius: '0.3rem',
    borderTopRightRadius: '0.3rem',

    '&:not(:first-child)': {
      marginLeft: '0.2rem'
    }
  },
  tabPanel: {
    padding: 0,
  },
}))

export default function RequestPanelContainer({appController}) {
  const dispatch = useDispatch()
  const ga4React = useGA4React()
  const {t} = useTranslation('ControlPanel')
  const connectionState = useSelector(getConnectionState)
  const requestBody = useSelector(getRequestBody)
  const scheduleEnabled = useSelector(getScheduleEnabledStatus)
  const timeInterval = useSelector(getScheduleTimeInterval)
  const favoriteRequests = useSelector(getFavoriteRequests)
  const [favoriteRequestID, setFavoriteRequestID] = useState(null)
  const [favoriteRequestDialogOpen, setFavoriteRequestDialog] = useState(false)
  const [localRequestBody, setLocalRequestBody] = useState(requestBody)
  const [localScheduleTimeInterval, setLocalTimeInterval] = useState(timeInterval)

  const onRequestBodyChange = (value) => {
    setLocalRequestBody(value)
    dispatch(changeRequestBody(localRequestBody))
    setFavoriteRequestID(null)
  }

  const onScheduleTimeIntervalChange = (timeInterval) => {
    setLocalTimeInterval(+timeInterval)
    dispatch(changeScheduleTimeInterval(+localScheduleTimeInterval))
  }

  const onSendMessage = async () => {
    dispatch(changeRequestBody(localRequestBody))
    try {
      await appController.sendMessage(localRequestBody)
    } catch (e) {
      console.log(e)
      appController.throwError(t('訊息傳送失敗'))
    }
  }

  const onFavoriteRequestSet = () => {
    const favoriteRequest = {
      id: generateRandomString(),
      name: new Date().toLocaleString(),
      body: localRequestBody,
    }
    dispatch(addFavoriteRequest(favoriteRequest))
    setFavoriteRequestID(favoriteRequest.id)
    ga4React.gtag('event', 'add_favorite_message')
  }

  const onFavoriteRequestUnset = () => {
    dispatch(removeFavoriteRequest(favoriteRequestID))
    setFavoriteRequestID(null)
  }

  const onEnableButtonClicked = async () => {
    if (scheduleEnabled) {
      await appController.disableScheduler()
      await dispatch(changeScheduleEnabledStatus(false))
    } else {
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

  const onRemoveFavoriteRequest = (id) => {
    if (id === favoriteRequestID) {
      setFavoriteRequestID(null)
    }
    dispatch(removeFavoriteRequest(id))
  }

  const onApplyFavoriteRequest = (favoriteRequest) => {
    setFavoriteRequestID(favoriteRequest.id)
    dispatch(changeRequestBody(favoriteRequest.body))
    setLocalRequestBody(favoriteRequest.body)
  }

  const onUpdateFavoriteRequest = async ({id, changes}) => {
    dispatch(updateFavoriteRequest({id, changes}))
  }

  const isConnected = connectionState === ConnectionState.Connected
  return (
    <>
      <RequestPanel
        isConnected={isConnected}

        requestBody={localRequestBody}
        onRequestBodyChange={onRequestBodyChange}

        favoriteRequestID={favoriteRequestID}
        showFavoriteRequestDialog={showFavoriteRequestDialog}
        onFavoriteRequestSet={onFavoriteRequestSet}
        onFavoriteRequestUnset={onFavoriteRequestUnset}

        scheduleTimeInterval={localScheduleTimeInterval}
        onScheduleTimeIntervalChange={onScheduleTimeIntervalChange}

        onSendMessage={onSendMessage}

        scheduleEnabled={scheduleEnabled}
        onEnableButtonClicked={onEnableButtonClicked}
      />

      <FavoriteRequestDialog
        isConnected={isConnected}

        open={favoriteRequestDialogOpen}
        onClose={hideFavoriteRequestDialog}

        favoriteRequests={favoriteRequests}

        onRemove={onRemoveFavoriteRequest}
        onApply={onApplyFavoriteRequest}
        onSend={onSendMessage}
        onUpdate={onUpdateFavoriteRequest}
      />
    </>
  )
}
