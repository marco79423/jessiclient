import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {Grid, makeStyles, Paper} from '@material-ui/core'

import Button from '../../../elements/Button'
import TextArea from '../../../elements/TextArea'
import NumberField from '../../../elements/NumberField'
import AddFavoriteRequestDialog from '../../common/AddFavoriteRequestDialog'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    height: '100%',
    maxHeight: 500,
    padding: theme.spacing(3),

    borderTopLeftRadius: 0,
  },
  controlBar: {
    textAlign: 'right',
  },
  requestBody: {
    flex: 1,
    marginTop: theme.spacing(1),
    maxHeight: 400,
  },
  bottomActions: {
    marginTop: theme.spacing(4),
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
                                               onFavoriteRequestDialogShow,
                                               onFavoriteRequestAdd,
                                               onFavoriteRequestRemove,
                                               onEnableButtonClick,
                                             }) {
  const classes = useStyles()
  const {t} = useTranslation()
  const [addFavoriteRequestDialogOpen, setAddFavoriteRequestDialog] = useState(false)

  const validTimeInterval = +scheduleTimeInterval > 0

  const onSetFavoriteRequestButtonClick = () => {
    if (favoriteRequestID) {
      onFavoriteRequestRemove(favoriteRequestID)
    } else {
      setAddFavoriteRequestDialog(true)
    }
  }

  const onAddFavoriteRequestDialogClose = () => {
    setAddFavoriteRequestDialog(false)
  }

  const onAddFavoriteRequestDialogCreate = (requestName) => {
    onFavoriteRequestAdd({
      name: requestName,
      body: requestBody,
      category: t('未分類'),
    })
    onFavoriteRequestDialogShow()
  }

  return (
    <>
      <Paper className={classes.root}>
        <div className={classes.controlBar}>
          <Button onClick={onFavoriteRequestDialogShow}>{t('展開常用列表')}</Button>
        </div>
        <div className={classes.requestBody}>
          <TextArea
            label={t('請求內容')}
            value={requestBody}
            onChange={onRequestBodyChange}
          />
        </div>
        <Grid className={classes.bottomActions} container alignItems="center" justify="space-between">
          <Grid item>
            <Button disabled={requestBody === '' || scheduleEnabled} onClick={onSetFavoriteRequestButtonClick}>
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

      <AddFavoriteRequestDialog
        open={addFavoriteRequestDialogOpen}
        onClose={onAddFavoriteRequestDialogClose}
        onCreate={onAddFavoriteRequestDialogCreate}
      />
    </>
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
  onFavoriteRequestDialogShow: PropTypes.func.isRequired,
  onFavoriteRequestAdd: PropTypes.func.isRequired,
  onFavoriteRequestRemove: PropTypes.func.isRequired,
  onEnableButtonClick: PropTypes.func.isRequired,
}
