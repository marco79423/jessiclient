import {makeStyles} from '@material-ui/core/styles'
import {useTranslation} from 'next-i18next'
import {Grid, Paper} from '@material-ui/core'
import EditableText from '../../../../../../../../../../../elements/EditableText'
import Button from '../../../../../../../../../../../elements/Button'
import PropTypes from 'prop-types'
import React from 'react'
import {changeRequestBody, removeFavoriteRequest, updateFavoriteRequest} from '../../../../../../../../../../../../redux/project'
import {useDispatch, useSelector} from 'react-redux'
import {setCurrentFavoriteRequestID} from '../../../../../../../../../../../../redux/current'
import {selectConnectionState, selectCurrentFavoriteRequestID} from '../../../../../../../../../../../../redux/selectors'
import {ConnectionState} from '../../../../../../../../../../../../constants'
import useWSClient from '../../../../../../../../../../../../features/wsClient/useWSClient'
import useAlerter from '../../../../../../../../../../../../features/alerter/useAlerter'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: 350,
    minHeight: 200,
  },
  title: {
    fontSize: '1.2rem',
  },
  category: {
    fontSize: '1.1rem',
  },
  content: {
    marginTop: theme.spacing(2),
  }
}))


export default function FavoriteRequestItem({favoriteRequest}) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const {t} = useTranslation()
  const wsClient = useWSClient()
  const alerter = useAlerter()

  const connectionState = useSelector(selectConnectionState)
  const currentFavoriteRequestID = useSelector(selectCurrentFavoriteRequestID)
  const isConnected = connectionState === ConnectionState.Connected

  const onNameChange = (name) => {
    dispatch(updateFavoriteRequest({
      id: favoriteRequest.id,
      changes: {name}
    }))
  }

  const onCategoryChange = (category) => {
    dispatch(updateFavoriteRequest({
      id: favoriteRequest.id,
      changes: {category}
    }))
  }

  const onBodyChange = (body) => {
    dispatch(updateFavoriteRequest({
      id: favoriteRequest.id,
      changes: {body}
    }))
  }

  const onApplyButtonClick = () => {
    dispatch(setCurrentFavoriteRequestID(favoriteRequest.id))
    dispatch(changeRequestBody(favoriteRequest.body))
  }

  const onRemoveButtonClick = () => {
    if (favoriteRequest.id === currentFavoriteRequestID) {
      dispatch(setCurrentFavoriteRequestID(null))
    }
    dispatch(removeFavoriteRequest(favoriteRequest.id))
  }

  const onSendButtonClick = async () => {
    try {
      await wsClient.sendMessage(favoriteRequest.body)
    } catch (e) {
      console.log(e)
      alerter.showErrorAlert(t('請求傳送失敗'))
    }
  }


  return (
    <Grid key={favoriteRequest.id} item>
      <Grid className={classes.root} container component={Paper} direction="column" justify="space-between">
        <Grid item>
          <Grid container justify="space-between">
            <Grid item>
              <EditableText
                className={classes.title}
                value={favoriteRequest.name}
                setValue={onNameChange}
                buttonLabel={t('儲存')}
              />
            </Grid>
            <Grid>
              <EditableText
                className={classes.category}
                value={favoriteRequest.category}
                setValue={onCategoryChange}
                buttonLabel={t('儲存')}
              />
            </Grid>
          </Grid>
          <EditableText
            className={classes.content}
            value={favoriteRequest.body}
            setValue={onBodyChange}
            buttonLabel={t('儲存')}
          />
        </Grid>
        <Grid container item>
          <Grid container item xs spacing={1}>
            <Grid item><Button primary onClick={onApplyButtonClick}>{t('套用')}</Button></Grid>
            <Grid item><Button onClick={onRemoveButtonClick}>{t('刪除')}</Button> </Grid>
          </Grid>
          <Grid item>
            <Grid item>
              <Button primary disabled={!isConnected} onClick={onSendButtonClick}>{t('直接送出')}</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

FavoriteRequestItem.propTypes = {
  favoriteRequest: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
}
