import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {Grid, makeStyles, Paper} from '@material-ui/core'

import Button from '../../elements/Button'
import TextArea from '../../elements/TextArea'
import ConnectionPanel from './ConnectionPanel'

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

export default function BasicTabPanel({
                                        isConnected,
                                        requestBody,
                                        isFavoriteRequest,
                                        onRequestBodyChange,
                                        onShowFavoriteRequestsClick,
                                        onAppliedFavoriteRequestButtonClick,
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
      <Grid style={{marginTop: 8}} container justify="space-between">
        <Grid item>
          <Button onClick={onAppliedFavoriteRequestButtonClick}>{isFavoriteRequest ? t('取消常用') : t('設為常用')}</Button>
        </Grid>
        <Grid item>
          <Button primary disabled={!isConnected} onClick={onSendButtonClick}>{t('送出')}</Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

BasicTabPanel.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  requestBody: PropTypes.string.isRequired,
  isFavoriteRequest: PropTypes.bool.isRequired,
  onRequestBodyChange: PropTypes.func.isRequired,
  onShowFavoriteRequestsClick: PropTypes.func.isRequired,
  onAppliedFavoriteRequestButtonClick: PropTypes.func.isRequired,
  onSendButtonClick: PropTypes.func.isRequired,
}
