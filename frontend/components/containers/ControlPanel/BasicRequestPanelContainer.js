import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useGA4React} from 'ga-4-react'
import {useTranslation} from 'next-i18next'

import generateRandomString from '../../../utils/generateRandomString'
import {ConnectionState} from '../../../constants'
import {getAppliedFavoriteRequest, getConnectionState, getRequestBody} from '../../../selectors'
import {addFavoriteRequest, changeRequestText} from '../../../slices/project'
import {clearAppliedFavoriteRequestID, setAppliedFavoriteRequestID} from '../../../slices/current'
import FavoriteRequestDialogContainer from './FavoriteRequestDialogContainer'
import BasicRequestPanel from '../../modules/ControlPanel/BasicRequestPanel'


export default function BasicRequestPanelContainer({appController}) {
  const dispatch = useDispatch()
  const ga4React = useGA4React()
  const {t} = useTranslation('ControlPanel')
  const connectionState = useSelector(getConnectionState)
  const requestBody = useSelector(getRequestBody)
  const appliedFavoriteRequest = useSelector(getAppliedFavoriteRequest)
  const [localRequestBody, setLocalRequestBody] = useState('')
  const [favoriteRequestDialogOpen, setFavoriteRequestDialog] = useState(false)

  useEffect(() => {
    setLocalRequestBody(requestBody)
  }, [requestBody])

  const onRequestBodyChange = (value) => {
    setLocalRequestBody(value)
    dispatch(clearAppliedFavoriteRequestID())
  }

  const onAppliedFavoriteRequestButtonClick = () => {
    if (appliedFavoriteRequest) {
      dispatch(clearAppliedFavoriteRequestID(appliedFavoriteRequest.id))
    } else {
      const favoriteRequest = {
        id: generateRandomString(),
        name: new Date().toLocaleString(),
        text: localRequestBody,
      }
      dispatch(addFavoriteRequest(favoriteRequest))
      dispatch(setAppliedFavoriteRequestID(favoriteRequest.id))
      ga4React.gtag('event', 'add_favorite_message')
    }
  }

  const onSendButtonClick = async () => {
    dispatch(changeRequestText(localRequestBody))
    try {
      await appController.sendMessage(localRequestBody)
    } catch (e) {
      console.log(e)
      appController.throwError(t('訊息傳送失敗'))
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
      <BasicRequestPanel
        isConnected={connectionState === ConnectionState.Connected}
        requestBody={localRequestBody}
        isFavoriteRequest={!!appliedFavoriteRequest}
        onRequestBodyChange={onRequestBodyChange}
        onShowFavoriteRequestsClick={showFavoriteRequestDialog}
        onAppliedFavoriteRequestClick={onAppliedFavoriteRequestButtonClick}
        onSendButtonClick={onSendButtonClick}
      />

      <FavoriteRequestDialogContainer
        appController={appController}
        open={favoriteRequestDialogOpen}
        onClose={hideFavoriteRequestDialog}
      />
    </>
  )
}
