import React, {useEffect, useState} from 'react'
import {useGA4React} from 'ga-4-react'
import {makeStyles} from '@material-ui/core/styles'
import {Tab, Tabs} from '@material-ui/core'
import {TabContext, TabPanel} from '@material-ui/lab'
import {useTranslation} from 'next-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {
  getAppliedFavoriteRequest,
  getConnectionState,
  getRequestBody,
  getScheduleEnabledStatus,
  getScheduleTimeInterval
} from '../../../selectors'
import {
  changeScheduleEnabledStatus,
  clearAppliedFavoriteRequestID,
  setAppliedFavoriteRequestID
} from '../../../slices/current'
import generateRandomString from '../../../utils/generateRandomString'
import {addFavoriteRequest, changeRequestBody, changeScheduleTimeInterval} from '../../../slices/project'
import {ConnectionState} from '../../../constants'
import ScheduleRequestPanel from '../../modules/ControlPanel/ScheduleRequestPanel'
import BasicRequestPanel from '../../modules/ControlPanel/BasicRequestPanel'
import FavoriteRequestDialogContainer from './FavoriteRequestDialogContainer'


const useStyles = makeStyles((theme) => ({
  root: {
  },
  tab: {
    background: theme.project.page.main.controlPanel.requestPanel.tab,
    fontSize: '1rem',
    borderTopLeftRadius: '0.3rem',
    borderTopRightRadius: '0.3rem',

    '&:not(:first-child)': {
      marginLeft: '0.2rem'
    }
  },
  tabPanel: {
    padding: 0,
  },
}))


export default function RequestPanelContainer({appController}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const ga4React = useGA4React()
  const {t} = useTranslation('ControlPanel')
  const connectionState = useSelector(getConnectionState)
  const requestBody = useSelector(getRequestBody)
  const appliedFavoriteRequest = useSelector(getAppliedFavoriteRequest)
  const scheduleEnabled = useSelector(getScheduleEnabledStatus)
  const timeInterval = useSelector(getScheduleTimeInterval)
  const [tabValue, setTabValue] = useState('basic')
  const [favoriteRequestDialogOpen, setFavoriteRequestDialog] = useState(false)
  const [localRequestBody, setLocalRequestBody] = useState('')
  const [localScheduleTimeInterval, setLocalTimeInterval] = useState(3)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
    ga4React.gtag('event', 'change_tag', {value: newValue})
  }

  useEffect(() => {
    setLocalRequestBody(requestBody)
  }, [requestBody])

  useEffect(() => {
    setLocalTimeInterval(timeInterval)
  }, [timeInterval])

  const onRequestBodyChange = (value) => {
    setLocalRequestBody(value)
    dispatch(clearAppliedFavoriteRequestID())
  }

  const onScheduleTimeIntervalChange = (e) => {
    dispatch(changeScheduleTimeInterval(e.target.value))
  }

  const onAppliedFavoriteRequestButtonClick = () => {
    if (appliedFavoriteRequest) {
      dispatch(clearAppliedFavoriteRequestID(appliedFavoriteRequest.id))
    } else {
      const favoriteRequest = {
        id: generateRandomString(),
        name: new Date().toLocaleString(),
        body: localRequestBody,
      }
      dispatch(addFavoriteRequest(favoriteRequest))
      dispatch(setAppliedFavoriteRequestID(favoriteRequest.id))
      ga4React.gtag('event', 'add_favorite_message')
    }
  }

  const onSendButtonClick = async () => {
    dispatch(changeRequestBody(localRequestBody))
    try {
      await appController.sendMessage(localRequestBody)
    } catch (e) {
      console.log(e)
      appController.throwError(t('訊息傳送失敗'))
    }
  }

  const onEnableButtonClicked = async () => {
    if (scheduleEnabled) {
      await appController.disableScheduler()
      await dispatch(changeScheduleEnabledStatus(false))
    } else {
      await dispatch(changeRequestBody(localRequestBody))
      await dispatch(changeScheduleTimeInterval(+localScheduleTimeInterval))
      await appController.enableScheduler(localRequestBody, +localScheduleTimeInterval)
      dispatch(changeScheduleEnabledStatus(true))
    }
  }

  const showFavoriteRequestDialog = () => {
    setFavoriteRequestDialog(true)
    ga4React.gtag('event', 'show_favorite_requests_panel')
  }

  const hideFavoriteRequestDialog = () => {
    setFavoriteRequestDialog(false)
  }

  return (
    <div className={classes.root}>
      <Tabs indicatorColor="secondary" value={tabValue} onChange={handleTabChange}>
        <Tab className={classes.tab} label={t('基本')} value="basic"/>
        <Tab className={classes.tab} label={t('排程')} value="schedule"/>
      </Tabs>
      <TabContext value={tabValue}>
        <TabPanel className={classes.tabPanel} value="basic">
          <BasicRequestPanel
            isConnected={connectionState === ConnectionState.Connected}
            requestBody={localRequestBody}
            isFavoriteRequest={!!appliedFavoriteRequest}
            onRequestBodyChange={onRequestBodyChange}
            onShowFavoriteRequestsClick={showFavoriteRequestDialog}
            onAppliedFavoriteRequestClick={onAppliedFavoriteRequestButtonClick}
            onSendButtonClick={onSendButtonClick}
          />
        </TabPanel>
        <TabPanel className={classes.tabPanel} value="schedule">
          <ScheduleRequestPanel
            isConnected={connectionState === ConnectionState.Connected}
            scheduleTimeInterval={localScheduleTimeInterval}
            isFavoriteRequest={!!appliedFavoriteRequest}
            scheduleEnabled={scheduleEnabled}
            requestBody={localRequestBody}
            onRequestBodyChange={onRequestBodyChange}
            onScheduleTimeIntervalChange={onScheduleTimeIntervalChange}
            onShowFavoriteRequestsClick={showFavoriteRequestDialog}
            onAppliedFavoriteRequestClick={onAppliedFavoriteRequestButtonClick}
            onEnableButtonClick={onEnableButtonClicked}
          />
        </TabPanel>
      </TabContext>

      <FavoriteRequestDialogContainer
        appController={appController}
        open={favoriteRequestDialogOpen}
        onClose={hideFavoriteRequestDialog}
      />
    </div>
  )
}
