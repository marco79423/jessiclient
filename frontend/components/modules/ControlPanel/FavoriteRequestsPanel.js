import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Paper} from '@material-ui/core'

import BasicDialog from '../../elements/BasicDialog'
import Button from '../../elements/Button'
import {setAppliedFavoriteRequestID} from '../../../slices/current'
import {changeRequestText, removeFavoriteRequest, updateFavoriteRequest} from '../../../slices/project'
import {getConnectionState, getFavoriteRequests} from '../../../selectors'
import EditableText from '../../elements/EditableText'
import {ConnectionState} from '../../../constants'


const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    padding: theme.spacing(2),
    width: 400,
    minHeight: 200,
  },
  itemTitle: {
    fontSize: '1.2rem',
  },
  itemContent: {
    marginTop: theme.spacing(2),
  }
}))

export default function FavoriteRequestsPanel({appController, open, onClose}) {
  const classes = useStyles()
  const {t} = useTranslation('ControlPanel')
  const favoriteRequests = useSelector(getFavoriteRequests)

  return (
    <BasicDialog classname={classes.root} title={t('常用請求列表')} open={open} onClose={onClose}>
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
  const classes = useStyles()
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
      appController.throwError('訊息傳送失敗')
    }
  }

  const updateName = (name) => {
    dispatch(updateFavoriteRequest({id: favoriteRequest.id, changes: {name}}))
  }

  const updateText = (text) => {
    dispatch(updateFavoriteRequest({id: favoriteRequest.id, changes: {text}}))
  }

  return (
    <Grid className={classes.item} container component={Paper} direction="column" justify="space-between">
      <Grid item>
        <EditableText
          className={classes.itemTitle}
          value={favoriteRequest.name}
          setValue={updateName}
        />
        <EditableText
          className={classes.itemContent}
          value={favoriteRequest.text}
          setValue={updateText}
        />
      </Grid>
      <Grid container item>
        <Grid container item xs spacing={1}>
          <Grid item><Button primary onClick={onAppliedButtonClicked}>套用</Button></Grid>
          <Grid item><Button onClick={onRemoveButtonClicked}>刪除</Button></Grid>
        </Grid>
        <Grid item>
          <Grid item><Button primary disabled={connectionState !== ConnectionState.Connected}
                             onClick={onSendButtonClicked}>直接送出</Button></Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

