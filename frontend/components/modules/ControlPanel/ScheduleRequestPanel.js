import React from 'react'
import {useTranslation} from 'next-i18next'
import {Grid, makeStyles, Paper, TextField} from '@material-ui/core'

import Button from '../../elements/Button'
import TextArea from '../../elements/TextArea'
import PropTypes from 'prop-types'
import BasicRequestPanel from './BasicRequestPanel'

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
  secondInput: {
    width: 50,
  }
}))

export default function ScheduleRequestPanel({
                                               isConnected,
                                               scheduleTimeInterval,
                                               isFavoriteRequest,
                                               scheduleEnabled,
                                               requestBody,
                                               onRequestBodyChange,
                                               onScheduleTimeIntervalChange,
                                               onShowFavoriteRequestsClick,
                                               onAppliedFavoriteRequestClick,
                                               onEnableButtonClick,
                                             }) {
  const classes = useStyles()
  const {t} = useTranslation('ControlPanel')

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
          <Button disabled={scheduleEnabled} onClick={onAppliedFavoriteRequestClick}>
            {isFavoriteRequest ? t('取消常用') : t('設為常用')}
          </Button>
        </Grid>
        <Grid item>
          <Grid container alignItems="center" spacing={3}>
            <Grid item>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>{t('每')}</Grid>
                <Grid item><TextField className={classes.secondInput}
                                      inputProps={{min: 0, style: { textAlign: 'center' }}}
                                      type="number"
                                      size="small"
                                      disabled={scheduleEnabled}
                                      onChange={onScheduleTimeIntervalChange}
                                      value={scheduleTimeInterval}/> </Grid>
                <Grid item>{t('秒傳送一次')}</Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button primary disabled={!isConnected} onClick={onEnableButtonClick}>
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
  isFavoriteRequest: PropTypes.bool.isRequired,
  scheduleEnabled: PropTypes.bool.isRequired,
  onRequestBodyChange: PropTypes.func.isRequired,
  onScheduleTimeIntervalChange: PropTypes.func.isRequired,
  onShowFavoriteRequestsClick: PropTypes.func.isRequired,
  onAppliedFavoriteRequestButtonClick: PropTypes.func.isRequired,
  onEnableButtonClick: PropTypes.func.isRequired,
}