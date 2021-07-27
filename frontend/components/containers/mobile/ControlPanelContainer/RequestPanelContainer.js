import React, {useState} from 'react'
import {useTranslation} from 'next-i18next'
import {useDispatch, useSelector} from 'react-redux'

import {
  getConnectionState,
  getFavoriteRequestCategories,
  getFavoriteRequests,
  getRequestBody
} from '../../../../redux/selectors'
import generateRandomString from '../../../../utils/generateRandomString'
import {
  addFavoriteRequest,
  addFavoriteRequestCategory,
  changeRequestBody,
  removeFavoriteRequest,
  removeFavoriteRequestCategory,
  updateFavoriteRequest,
  updateFavoriteRequestCategory
} from '../../../../redux/project'
import {ConnectionState} from '../../../../constants'
import FavoriteRequestDialog from '../../../modules/ControlPanel/shared/FavoriteRequestDialog'
import RequestPanel from '../../../modules/ControlPanel/mobile/RequestPanel'

export default function RequestPanelContainer({appController}) {
  const dispatch = useDispatch()
  const {t} = useTranslation()
  const connectionState = useSelector(getConnectionState)
  const requestBody = useSelector(getRequestBody)
  const favoriteRequestCategories = useSelector(getFavoriteRequestCategories)
  const favoriteRequests = useSelector(getFavoriteRequests)
  const [favoriteRequestID, setFavoriteRequestID] = useState(null)
  const [favoriteRequestDialogOpen, setFavoriteRequestDialog] = useState(false)
  const [localRequestBody, setLocalRequestBody] = useState(requestBody)

  const onAddFavoriteRequestCategory = (requestCategory) => {
    dispatch(addFavoriteRequestCategory({
      id: generateRandomString(),
      ...requestCategory,
    }))
  }

  const onUpdatedFavoriteRequestCategory = ({id, changes}) => {
    dispatch(updateFavoriteRequestCategory({id, changes}))
  }

  const onRemoveFavoriteRequestCategory = (id) => {
    dispatch(removeFavoriteRequestCategory(id))
  }

  const onRequestBodyChange = (value) => {
    setLocalRequestBody(value)
    dispatch(changeRequestBody(localRequestBody))
    setFavoriteRequestID(null)
  }

  const onSendRequest = async () => {
    dispatch(changeRequestBody(localRequestBody))
    try {
      await appController.sendMessage(localRequestBody)
    } catch (e) {
      console.log(e)
      appController.throwError(t('請求傳送失敗'))
    }
  }

  const onAddFavoriteRequest = ({name, body, categoryID}) => {
    const favoriteRequest = {
      id: generateRandomString(),
      name: name,
      body: body,
      categoryID: categoryID,
    }
    dispatch(addFavoriteRequest(favoriteRequest))
    setFavoriteRequestID(favoriteRequest.id)
    appController.track('add_favorite_message')
  }

  const onShowFavoriteRequestDialog = () => {
    setFavoriteRequestDialog(true)
    appController.track('show_favorite_requests_panel')
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
        onSendRequest={onSendRequest}

        favoriteRequestCategories={favoriteRequestCategories}
        favoriteRequestID={favoriteRequestID}
        onShowFavoriteRequestDialog={onShowFavoriteRequestDialog}
        onAddFavoriteRequest={onAddFavoriteRequest}
        onRemoveFavoriteRequest={onRemoveFavoriteRequest}
      />

      <FavoriteRequestDialog
        isConnected={isConnected}

        open={favoriteRequestDialogOpen}
        onClose={hideFavoriteRequestDialog}

        favoriteRequestCategories={favoriteRequestCategories}
        favoriteRequests={favoriteRequests}

        onAddFavoriteRequestCategory={onAddFavoriteRequestCategory}
        onUpdatedFavoriteRequestCategory={onUpdatedFavoriteRequestCategory}
        onRemoveFavoriteRequestCategory={onRemoveFavoriteRequestCategory}

        onRemove={onRemoveFavoriteRequest}
        onApply={onApplyFavoriteRequest}
        onSend={onSendRequest}
        onUpdate={onUpdateFavoriteRequest}
      />
    </>
  )
}
