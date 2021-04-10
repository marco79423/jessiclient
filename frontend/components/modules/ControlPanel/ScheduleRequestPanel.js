import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {Grid, makeStyles, Paper} from '@material-ui/core'

import Button from '../../elements/Button'
import TextArea from '../../elements/TextArea'
import NumberField from '../../elements/NumberField'


const useStyles = makeStyles((theme) => ({
  root: {
    borderTopLeftRadius: 0,
    padding: theme.spacing(3),
  },
  requestBody: {
    marginTop: theme.spacing(3),
  },
  bottomActions: {
    marginTop: theme.spacing(3),
  },
}))

export default function ScheduleRequestPanel({
                                               isConnected,
                                               scheduleTimeInterval,
                                               favoriteRequestID,
                                               scheduleEnabled,
                                               requestBody,
                                               onRequestBodyChange,
                                               onScheduleTimeIntervalChange,
                                               onShowFavoriteRequestsClick,
                                               onFavoriteRequestSet,
                                               onFavoriteRequestUnset,
                                               onEnableButtonClick,
                                             }) {
  const classes = useStyles()
  const {t} = useTranslation('ControlPanel')

  const validTimeInterval = +scheduleTimeInterval > 0

  const onSetFavoriteRequestButtonClick = () => {
    if (favoriteRequestID) {
      onFavoriteRequestUnset()
    } else {
      onFavoriteRequestSet()
    }
  }

  return (
    <Paper className={classes.root}>
      <Grid container direction="row-reverse">
        <Grid item>
          <Button disabled={scheduleEnabled} onClick={onShowFavoriteRequestsClick}>{t('展開常用列表')}</Button>
        </Grid>
      </Grid>
      <TextArea
        className={classes.requestBody}
        label={t('請求內容')}
        value={requestBody}
        onChange={onRequestBodyChange}
      />
      <Grid className={classes.bottomActions} container alignItems="center" justify="space-between">
        <Grid item>
          <Button disabled={scheduleEnabled} onClick={onSetFavoriteRequestButtonClick}>
            {favoriteRequestID ? t('取消常用') : t('設為常用')}
          </Button>
        </Grid>
        <Grid item>
          <Grid container alignItems="center" spacing={3}>
            <Grid item>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>{t('每')}</Grid>
                <Grid item><NumberField type="number" disabled={scheduleEnabled} error={!validTimeInterval}
                                        onChange={onScheduleTimeIntervalChange}
                                        value={scheduleTimeInterval}/></Grid>
                <Grid item>{t('秒傳送一次')}</Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button primary disabled={!isConnected || !validTimeInterval} onClick={onEnableButtonClick}>
                {scheduleEnabled ? t('停用') : t('啟用')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

ScheduleRequestPanel.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  scheduleTimeInterval: PropTypes.number.isRequired,
  requestBody: PropTypes.string.isRequired,
  favoriteRequestID: PropTypes.string,
  scheduleEnabled: PropTypes.bool.isRequired,
  onRequestBodyChange: PropTypes.func.isRequired,
  onScheduleTimeIntervalChange: PropTypes.func.isRequired,
  onShowFavoriteRequestsClick: PropTypes.func.isRequired,
  onFavoriteRequestSet: PropTypes.func.isRequired,
  onFavoriteRequestUnset: PropTypes.func.isRequired,
  onEnableButtonClick: PropTypes.func.isRequired,
}
