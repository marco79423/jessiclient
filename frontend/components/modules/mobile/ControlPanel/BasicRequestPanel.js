import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {Grid, makeStyles, Paper} from '@material-ui/core'

import Button from '../../../elements/Button'
import TextArea from '../../../elements/TextArea'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    
    height: '100%',
    maxHeight: 500,
    padding: theme.spacing(2)
  },
  controlBar: {
    textAlign: 'right',
  },
  requestBody: {
    flex: 1,
    marginBottom: theme.spacing(2),
    maxHeight: 400,
  },
  bottomActions: {
    marginTop: theme.spacing(2),
  }
}))

export default function BasicRequestPanel({
                                            isConnected,
                                            requestBody,
                                            favoriteRequestID,
                                            onRequestBodyChange,
                                            onShowFavoriteRequestsClick,
                                            onFavoriteRequestSet,
                                            onFavoriteRequestUnset,
                                            onSendButtonClick
                                          }) {
  const classes = useStyles()
  const {t} = useTranslation('ControlPanel')

  const onSetFavoriteRequestButtonClick = () => {
    if (favoriteRequestID) {
      onFavoriteRequestUnset()
    } else {
      onFavoriteRequestSet()
    }
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.controlBar}>
        <Button onClick={onShowFavoriteRequestsClick}>{t('展開常用列表')}</Button>
      </div>
      <div className={classes.requestBody}>
        <TextArea
          label={t('請求內容')}
          value={requestBody}
          onChange={onRequestBodyChange}
        />
      </div>
      <Grid className={classes.bottomActions} container justify="space-between">
        <Grid item>
          <Button onClick={onSetFavoriteRequestButtonClick}>{favoriteRequestID ? t('取消常用') : t('設為常用')}</Button>
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
  favoriteRequestID: PropTypes.string,
  onRequestBodyChange: PropTypes.func.isRequired,
  onShowFavoriteRequestsClick: PropTypes.func.isRequired,
  onFavoriteRequestSet: PropTypes.func.isRequired,
  onFavoriteRequestUnset: PropTypes.func.isRequired,
  onSendButtonClick: PropTypes.func.isRequired,
}
