import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useGA4React} from 'ga-4-react'

import generateRandomString from '../../../utils/generateRandomString'
import {ConnectionState} from '../../../constants'
import {TabPanel} from '@material-ui/lab'
import {Grid, TextField, Typography} from '@material-ui/core'
import Button from '../../elements/Button'
import FavoriteRequestsPanel from './FavoriteRequestsPanel'
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

export default function ScheduleTabPanel({appController}) {
  const dispatch = useDispatch()
  const ga4React = useGA4React()
  const connectionState = useSelector(getConnectionState)
  const requestText = useSelector(getScheduleRequestText)
  const appliedFavoriteRequest = useSelector(getAppliedFavoriteRequest)
  const scheduleEnabled = useSelector(getScheduleEnabledStatus)
  const timeInterval = useSelector(getScheduleTimeInterval)

  const [favoriteRequestsPanelOpen, setFavoriteRequestsPanel] = useState(false)

  const [localRequestText, setLocalRequestText] = useState('')
  const [localTimeInterval, setLocalTimeInterval] = useState(3)

  useEffect(() => {
    setLocalRequestText(requestText)
  }, [requestText])

  useEffect(() => {
    setLocalTimeInterval(timeInterval)
  }, [timeInterval])

  const onRequestTextInputChange = (e) => {
    setLocalRequestText(e.target.value)
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
        text: localRequestText,
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
      await dispatch(changeScheduleRequestText(localRequestText))
      await dispatch(changeScheduleTimeInterval(+localTimeInterval))
      await appController.enableScheduler(localRequestText, +localTimeInterval)
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
    <TabPanel value="schedule">
      <Grid container direction="row-reverse">
        <Grid item>
          <Button disabled={scheduleEnabled} onClick={showFavoriteRequestsPanel}>展開常用列表</Button>
          <FavoriteRequestsPanel
            appController={appController}
            open={favoriteRequestsPanelOpen}
            onClose={hideFavoriteRequestsPanel}
          />
        </Grid>
      </Grid>
      <TextField
        style={{marginTop: 24}}
        variant="outlined"
        margin="normal"
        multiline
        rows={16}
        fullWidth
        label="請求內容"
        autoFocus
        disabled={scheduleEnabled}
        value={localRequestText}
        onChange={onRequestTextInputChange}
      />
      <Grid style={{marginTop: 8}} container alignItems="center" justify="space-between">
        <Grid item>
          <Button disabled={scheduleEnabled} onClick={onAppliedFavoriteRequestButtonClicked}>
            {appliedFavoriteRequest ? '取消常用' : '設為常用'}
          </Button>
        </Grid>
        <Grid item>
          <Grid container alignItems="center" spacing={3}>
            <Grid item>
              <Grid container alignItems="center" spacing={1}>
                <Grid item><TextField style={{width: 50}}
                                      type="number"
                                      size="small"
                                      disabled={scheduleEnabled}
                                      onChange={onScheduleTimeIntervalChange}
                                      value={localTimeInterval}/></Grid>
                <Grid item><Typography>秒傳送一次</Typography></Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button primary disabled={!isConnected} onClick={onEnableButtonClicked}>
                {scheduleEnabled ? '關閉' : '啟用'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </TabPanel>
  )
}
