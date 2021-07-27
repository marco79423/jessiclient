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

  const onSendMessage = async () => {
    dispatch(changeRequestBody(localRequestBody))
    try {
      await appController.sendMessage(localRequestBody)
    } catch (e) {
      console.log(e)
      appController.throwError(t('請求傳送失敗'))
    }
  }

  const onFavoriteRequestAdd = ({name, body, categoryID}) => {
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

  const onFavoriteRequestRemove = (favoriteRequestID) => {
    dispatch(removeFavoriteRequest(favoriteRequestID))
    setFavoriteRequestID(null)
  }

  const onFavoriteRequestDialogShow = () => {
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

        favoriteRequestCategories={favoriteRequestCategories}
        favoriteRequestID={favoriteRequestID}
        onFavoriteRequestDialogShow={onFavoriteRequestDialogShow}
        onFavoriteRequestAdd={onFavoriteRequestAdd}
        onFavoriteRequestRemove={onFavoriteRequestRemove}

        onSendMessage={onSendMessage}
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
        onSend={onSendMessage}
        onUpdate={onUpdateFavoriteRequest}
      />
    </>
  )
}
