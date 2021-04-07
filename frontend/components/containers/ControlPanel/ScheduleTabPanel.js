import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useGA4React} from 'ga-4-react'
import {useTranslation} from 'next-i18next'

import generateRandomString from '../../../utils/generateRandomString'
import {ConnectionState} from '../../../constants'
import {Grid, makeStyles, Paper, TextField} from '@material-ui/core'
import Button from '../../elements/Button'
import FavoriteRequestDialogContainer from './FavoriteRequestDialogContainer'
import {
  getAppliedFavoriteRequest,
  getConnectionState,
  getScheduleEnabledStatus,
  getScheduleRequestText,
  getScheduleTimeInterval
} from '../../../selectors'
import {
  changeScheduleEnabledStatus,
  clearAppliedFavoriteRequestID,
  setAppliedFavoriteRequestID
} from '../../../slices/current'
import {addFavoriteRequest, changeScheduleRequestText, changeScheduleTimeInterval} from '../../../slices/project'
import TextArea from '../../elements/TextArea'

const useStyles = makeStyles((theme) => ({
  root: {
    borderTopLeftRadius: 0,
    padding: theme.spacing(3)
  },
  requestBody: {
    marginTop: theme.spacing(3),
  },
}))


export default function ScheduleTabPanel({appController}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const ga4React = useGA4React()
  const {t} = useTranslation('ControlPanel')
  const connectionState = useSelector(getConnectionState)
  const requestText = useSelector(getScheduleRequestText)
  const appliedFavoriteRequest = useSelector(getAppliedFavoriteRequest)
  const scheduleEnabled = useSelector(getScheduleEnabledStatus)
  const timeInterval = useSelector(getScheduleTimeInterval)
  const [favoriteRequestsPanelOpen, setFavoriteRequestsPanel] = useState(false)
  const [localRequestBody, setLocalRequestBody] = useState('')
  const [localTimeInterval, setLocalTimeInterval] = useState(3)

  useEffect(() => {
    setLocalRequestBody(requestText)
  }, [requestText])

  useEffect(() => {
    setLocalTimeInterval(timeInterval)
  }, [timeInterval])

  const onRequestTextInputChange = (value) => {
    setLocalRequestBody(value)
    dispatch(clearAppliedFavoriteRequestID())
  }

  const onScheduleTimeIntervalChange = (e) => {
    dispatch(changeScheduleTimeInterval(e.target.value))
  }

  const onAppliedFavoriteRequestButtonClicked = () => {
    if (appliedFavoriteRequest) {
      dispatch(clearAppliedFavoriteRequestID(appliedFavoriteRequest.id))
    } else {
      const favoriteRequest = {
        id: generateRandomString(),
        name: new Date().toLocaleString(),
        text: localRequestBody,
      }
      dispatch(addFavoriteRequest(favoriteRequest))
      dispatch(setAppliedFavoriteRequestID(favoriteRequest.id))
    }
  }

  const onEnableButtonClicked = async () => {
    if (scheduleEnabled) {
      await appController.disableScheduler()
      await dispatch(changeScheduleEnabledStatus(false))
    } else {
      await dispatch(changeScheduleRequestText(localRequestBody))
      await dispatch(changeScheduleTimeInterval(+localTimeInterval))
      await appController.enableScheduler(localRequestBody, +localTimeInterval)
      dispatch(changeScheduleEnabledStatus(true))
    }
  }

  const showFavoriteRequestsPanel = () => {
    setFavoriteRequestsPanel(true)
    ga4React.gtag('event', 'show_favorite_requests_panel')
  }

  const hideFavoriteRequestsPanel = () => {
    setFavoriteRequestsPanel(false)
  }

  const isConnected = connectionState === ConnectionState.Connected

  return (
    <Paper className={classes.root}>
      <Grid container direction="row-reverse">
        <Grid item>
          <Button disabled={scheduleEnabled} onClick={showFavoriteRequestsPanel}>{t('展開常用列表')}</Button>
          <FavoriteRequestDialogContainer
            appController={appController}
            open={favoriteRequestsPanelOpen}
            onClose={hideFavoriteRequestsPanel}
          />
        </Grid>
      </Grid>
      <TextArea
        className={classes.requestBody}
        label={t('請求內容')}
        value={localRequestBody}
        onChange={onRequestTextInputChange}
      />
      <Grid style={{marginTop: 8}} container alignItems="center" justify="space-between">
        <Grid item>
          <Button disabled={scheduleEnabled} onClick={onAppliedFavoriteRequestButtonClicked}>
            {appliedFavoriteRequest ? t('取消常用') : t('設為常用')}
          </Button>
        </Grid>
        <Grid item>
          <Grid container alignItems="center" spacing={3}>
            <Grid item>
              {t('每')} <TextField style={{width: 50}}
                                  type="number"
                                  size="small"
                                  disabled={scheduleEnabled}
                                  onChange={onScheduleTimeIntervalChange}
                                  value={localTimeInterval}/> {t('秒傳送一次')}
            </Grid>
            <Grid item>
              <Button primary disabled={!isConnected} onClick={onEnableButtonClicked}>
                {scheduleEnabled ? t('停用') : t('啟用')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}
