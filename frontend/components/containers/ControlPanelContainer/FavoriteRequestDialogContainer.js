import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {setAppliedFavoriteRequestID} from '../../../slices/current'
import {changeRequestBody, removeFavoriteRequest, updateFavoriteRequest} from '../../../slices/project'
import {getConnectionState, getFavoriteRequests} from '../../../selectors'
import FavoriteRequestDialog from '../../modules/ControlPanel/FavoriteRequestDialog'
import {useTranslation} from 'next-i18next'

export default function FavoriteRequestDialogContainer({appController, open, onClose}) {
  const {t} = useTranslation('ControlPanel')
  const dispatch = useDispatch()
  const connectionState = useSelector(getConnectionState)
  const favoriteRequests = useSelector(getFavoriteRequests)

  const onRemove = (id) => {
    dispatch(removeFavoriteRequest(id))
  }

  const onApply = (favoriteRequest) => {
    dispatch(setAppliedFavoriteRequestID(favoriteRequest.id))
    dispatch(changeRequestBody(favoriteRequest.body))
  }

  const onSend = async (favoriteRequest) => {
    try {
      await appController.sendMessage(favoriteRequest.body)
    } catch (e) {
      console.log(e)
      appController.throwError(t('訊息傳送失敗'))
    }
  }

  const onUpdate = async ({id, changes}) => {
    dispatch(updateFavoriteRequest({id, changes}))
  }

  return (
    <FavoriteRequestDialog
      open={open}
      onClose={onClose}
      connectionState={connectionState}
      favoriteRequests={favoriteRequests}
      onRemove={onRemove}
      onApply={onApply}
      onSend={onSend}
      onUpdate={onUpdate}
    />
  )
}
