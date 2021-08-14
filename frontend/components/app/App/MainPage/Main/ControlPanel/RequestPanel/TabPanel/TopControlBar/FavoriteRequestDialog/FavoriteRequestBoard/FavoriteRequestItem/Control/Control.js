import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {useTranslation} from 'next-i18next'
import {Grid} from '@material-ui/core'
import {changeRequestBody, removeFavoriteRequest} from '../../../../../../../../../../../../../redux/project'
import {setCurrentFavoriteRequestID} from '../../../../../../../../../../../../../redux/current'
import {
  selectCurrentFavoriteRequestID,
  selectFavoriteRequest
} from '../../../../../../../../../../../../../redux/selectors'
import useWSClient from '../../../../../../../../../../../../../features/wsClient/useWSClient'
import Button from '../../../../../../../../../../../../elements/Button'

const useStyles = makeStyles((theme) => ({
  root: {},
}))


export default function Control({id}) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const {t} = useTranslation()
  const wsClient = useWSClient()

  const favoriteRequest = useSelector(selectFavoriteRequest(id))
  const currentFavoriteRequestID = useSelector(selectCurrentFavoriteRequestID)

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
    await wsClient.sendMessage(favoriteRequest.body)
  }

  return (
    <Grid className={classes.root} container justifyContent="space-between">
      <Grid item>
        <Grid container spacing={1}>
          <Grid item><Button primary onClick={onApplyButtonClick}>{t('套用')}</Button></Grid>
          <Grid item><Button onClick={onRemoveButtonClick}>{t('刪除')}</Button> </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Button primary disabled={!wsClient.isConnected} onClick={onSendButtonClick}>{t('直接送出')}</Button>
      </Grid>
    </Grid>
  )
}

Control.propTypes = {
  id: PropTypes.string.isRequired,
}
