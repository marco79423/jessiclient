import React, {useEffect, useState} from 'react'
import {useGA4React} from 'ga-4-react'
import {makeStyles} from '@material-ui/core/styles'
import {Tab, Tabs} from '@material-ui/core'
import {TabContext, TabPanel} from '@material-ui/lab'
import {useTranslation} from 'next-i18next'
import {useDispatch, useSelector} from 'react-redux'

import {
  getConnectionState,
  getFavoriteRequests,
  getRequestBody,
  getScheduleEnabledStatus,
  getScheduleTimeInterval
} from '../../../selectors'
import {changeScheduleEnabledStatus,} from '../../../slices/current'
import generateRandomString from '../../../utils/generateRandomString'
import {
  addFavoriteRequest,
  changeRequestBody,
  changeScheduleTimeInterval,
  removeFavoriteRequest,
  updateFavoriteRequest
} from '../../../slices/project'
import {ConnectionState} from '../../../constants'
import ScheduleRequestPanel from '../../modules/ControlPanel/ScheduleRequestPanel'
import BasicRequestPanel from '../../modules/ControlPanel/BasicRequestPanel'
import FavoriteRequestDialog from '../../modules/ControlPanel/FavoriteRequestDialog'


const useStyles = makeStyles((theme) => ({
  root: {},
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

const PanelTab = Object.freeze({
  Basic: 'basic',
  Schedule: 'schedule',
})

export default function RequestPanelContainer({appController}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const ga4React = useGA4React()
  const {t} = useTranslation('ControlPanel')
  const connectionState = useSelector(getConnectionState)
  const requestBody = useSelector(getRequestBody)
  const scheduleEnabled = useSelector(getScheduleEnabledStatus)
  const timeInterval = useSelector(getScheduleTimeInterval)
  const favoriteRequests = useSelector(getFavoriteRequests)
  const [tabValue, setTabValue] = useState(PanelTab.Basic)
  const [favoriteRequestID, setFavoriteRequestID] = useState(null)
  const [favoriteRequestDialogOpen, setFavoriteRequestDialog] = useState(false)
  const [localRequestBody, setLocalRequestBody] = useState(requestBody)
  const [localScheduleTimeInterval, setLocalTimeInterval] = useState(timeInterval)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
    ga4React.gtag('event', 'change_tag', {value: newValue})
  }

  const onRequestBodyChange = (value) => {
    setLocalRequestBody(value)
    dispatch(changeRequestBody(localRequestBody))
    setFavoriteRequestID(null)
  }

  const onScheduleTimeIntervalChange = (timeInterval) => {
    setLocalTimeInterval(+timeInterval)
    dispatch(changeScheduleTimeInterval(+localScheduleTimeInterval))
  }

  const onSendMessage = async () => {
    dispatch(changeRequestBody(localRequestBody))
    try {
      await appController.sendMessage(localRequestBody)
    } catch (e) {
      console.log(e)
      appController.throwError(t('訊息傳送失敗'))
    }
  }

  const onFavoriteRequestSet = () => {
    const favoriteRequest = {
      id: generateRandomString(),
      name: new Date().toLocaleString(),
      body: localRequestBody,
    }
    dispatch(addFavoriteRequest(favoriteRequest))
    setFavoriteRequestID(favoriteRequest.id)
    ga4React.gtag('event', 'add_favorite_message')
  }

  const onFavoriteRequestUnset = () => {
    dispatch(removeFavoriteRequest(favoriteRequestID))
    setFavoriteRequestID(null)
  }

  const onEnableButtonClicked = async () => {
    if (scheduleEnabled) {
      await appController.disableScheduler()
      await dispatch(changeScheduleEnabledStatus(false))
    } else {
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

  const onRemoveFavoriteRequest = (id) => {
    if (id === favoriteRequestID) {
      setFavoriteRequestID(null)
    }
    dispatch(removeFavoriteRequest(id))
  }

  const onApplyFavoriteRequest = (favoriteRequest) => {
    setFavoriteRequestID(favoriteRequest.id)
    dispatch(changeRequestBody(favoriteRequest.body))
    setLocalRequestBody(favoriteRequest.body)
  }

  const onUpdateFavoriteRequest = async ({id, changes}) => {
    dispatch(updateFavoriteRequest({id, changes}))
  }

  return (
    <div className={classes.root}>
      <Tabs indicatorColor="secondary" value={tabValue} onChange={handleTabChange}>
        <Tab className={classes.tab} label={t('基本')} value={PanelTab.Basic}/>
        <Tab className={classes.tab} label={t('排程')} value={PanelTab.Schedule}/>
      </Tabs>
      <TabContext value={tabValue}>
        <TabPanel className={classes.tabPanel} value={PanelTab.Basic}>
          <BasicRequestPanel
            isConnected={connectionState === ConnectionState.Connected}
            requestBody={localRequestBody}
            favoriteRequestID={favoriteRequestID}
            onRequestBodyChange={onRequestBodyChange}
            onShowFavoriteRequestsClick={showFavoriteRequestDialog}
            onFavoriteRequestSet={onFavoriteRequestSet}
            onFavoriteRequestUnset={onFavoriteRequestUnset}
            onSendButtonClick={onSendMessage}
          />
        </TabPanel>
        <TabPanel className={classes.tabPanel} value={PanelTab.Schedule}>
          <ScheduleRequestPanel
            isConnected={connectionState === ConnectionState.Connected}
            scheduleTimeInterval={localScheduleTimeInterval}
            favoriteRequestID={favoriteRequestID}
            scheduleEnabled={scheduleEnabled}
            requestBody={localRequestBody}
            onRequestBodyChange={onRequestBodyChange}
            onScheduleTimeIntervalChange={onScheduleTimeIntervalChange}
            onShowFavoriteRequestsClick={showFavoriteRequestDialog}
            onFavoriteRequestSet={onFavoriteRequestSet}
            onFavoriteRequestUnset={onFavoriteRequestUnset}
            onEnableButtonClick={onEnableButtonClicked}
          />
        </TabPanel>
      </TabContext>

      <FavoriteRequestDialog
        open={favoriteRequestDialogOpen}
        onClose={hideFavoriteRequestDialog}
        connectionState={connectionState}
        favoriteRequests={favoriteRequests}
        onRemove={onRemoveFavoriteRequest}
        onApply={onApplyFavoriteRequest}
        onSend={onSendMessage}
        onUpdate={onUpdateFavoriteRequest}
      />

    </div>
  )
}
