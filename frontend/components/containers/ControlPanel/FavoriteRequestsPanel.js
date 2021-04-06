import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useTranslation} from 'next-i18next'
import {Grid} from '@material-ui/core'

import BasicDialog from '../../elements/BasicDialog'
import Button from '../../elements/Button'
import {setAppliedFavoriteRequestID} from '../../../slices/current'
import {changeRequestText, removeFavoriteRequest, updateFavoriteRequest} from '../../../slices/project'
import {getConnectionState, getFavoriteRequests} from '../../../selectors'
import {ConnectionState} from '../../../constants'
import EditableCard from '../../elements/EditableCard'


export default function FavoriteRequestsPanel({appController, open, onClose}) {
  const {t} = useTranslation('ControlPanel')
  const favoriteRequests = useSelector(getFavoriteRequests)

  return (
    <BasicDialog title={t('常用請求列表')} open={open} onClose={onClose}>
      <Grid container spacing={2} justify="center">
        {favoriteRequests.map(favoriteRequest => (
          <Grid key={favoriteRequest.id} item>
            <FavoriteRequestItem appController={appController} favoriteRequest={favoriteRequest}/>
          </Grid>
        ))}
      </Grid>
    </BasicDialog>
  )
}


function FavoriteRequestItem({appController, favoriteRequest}) {
  const {t} = useTranslation('ControlPanel')
  const dispatch = useDispatch()
  const connectionState = useSelector(getConnectionState)

  const onAppliedButtonClicked = () => {
    dispatch(setAppliedFavoriteRequestID(favoriteRequest.id))
    dispatch(changeRequestText(favoriteRequest.text))
  }

  const onRemoveButtonClicked = () => {
    dispatch(removeFavoriteRequest(favoriteRequest.id))
  }

  const onSendButtonClicked = async () => {
    try {
      await appController.sendMessage(favoriteRequest.text)
    } catch (e) {
      console.log(e)
      appController.throwError(t('訊息傳送失敗'))
    }
  }

  const updateName = (name) => {
    dispatch(updateFavoriteRequest({id: favoriteRequest.id, changes: {name}}))
  }

  const updateText = (text) => {
    dispatch(updateFavoriteRequest({id: favoriteRequest.id, changes: {text}}))
  }

  return (
    <EditableCard
      title={favoriteRequest.name}
      setTitle={updateName}
      content={favoriteRequest.text}
      setContent={updateText}
      saveButtonLabel={t('儲存')}
      actions={(
        <>
          <Grid container item xs spacing={1}>
            <Grid item>
              <Button primary onClick={onAppliedButtonClicked}>{t('套用')}</Button>
            </Grid>
            <Grid item>
              <Button onClick={onRemoveButtonClicked}>{t('刪除')}</Button>
            </Grid>
          </Grid>
          <Grid item>
            <Grid item>
              <Button
                primary
                disabled={connectionState !== ConnectionState.Connected}
                onClick={onSendButtonClicked}
              >{t('直接送出')}</Button>
            </Grid>
          </Grid>
        </>
      )}
    />
  )
}

