import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {Grid, makeStyles, Paper} from '@material-ui/core'

import Button from '../../elements/Button'
import TextArea from '../../elements/TextArea'

const useStyles = makeStyles((theme) => ({
  root: {
    borderTopLeftRadius: 0,
    padding: theme.spacing(3)
  },
  requestBody: {
    marginTop: theme.spacing(3),
  },
  bottomActions: {
    marginTop: theme.spacing(3),
  }
}))

export default function BasicRequestPanel({
                                            isConnected,
                                            requestBody,
                                            isFavoriteRequest,
                                            onRequestBodyChange,
                                            onShowFavoriteRequestsClick,
                                            onAppliedFavoriteRequestClick,
                                            onSendButtonClick
                                          }) {
  const classes = useStyles()
  const {t} = useTranslation('ControlPanel')

  return (
    <Paper className={classes.root}>
      <Grid container direction="row-reverse">
        <Grid item>
          <Button onClick={onShowFavoriteRequestsClick}>{t('展開常用列表')}</Button>
        </Grid>
      </Grid>
      <TextArea
        className={classes.requestBody}
        label={t('請求內容')}
        value={requestBody}
        onChange={onRequestBodyChange}
      />
      <Grid className={classes.bottomActions} container justify="space-between">
        <Grid item>
          <Button onClick={onAppliedFavoriteRequestClick}>{isFavoriteRequest ? t('取消常用') : t('設為常用')}</Button>
        </Grid>
        <Grid item>
          <Button primary disabled={!isConnected} onClick={onSendButtonClick}>{t('送出')}</Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

BasicRequestPanel.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  requestBody: PropTypes.string.isRequired,
  isFavoriteRequest: PropTypes.bool.isRequired,
  onRequestBodyChange: PropTypes.func.isRequired,
  onShowFavoriteRequestsClick: PropTypes.func.isRequired,
  onAppliedFavoriteRequestButtonClick: PropTypes.func.isRequired,
  onSendButtonClick: PropTypes.func.isRequired,
}
