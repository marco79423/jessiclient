import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {Button, Grid, Link, Paper, Tab, Tabs, TextField, Typography} from '@material-ui/core'
import {TabContext, TabPanel} from '@material-ui/lab'

import {ConnectionState} from '../../constants'
import {
  addFavoriteRequest,
  changeScheduleTimeInterval,
  clearAppliedFavoriteRequestID,
  disableSchedule,
  enableSchedule,
  getAppliedFavoriteRequest,
  getConnectionState,
  getRequestText,
  getScheduleEnabledStatus,
  getScheduleRequestText,
  getScheduleTimeInterval,
  sendRequestText,
  setAppliedFavoriteRequestID
} from '../../slices'
import ConnectionPanel from './ConnectionPanel'
import FavoriteRequestsPanel from './FavoriteRequestsPanel'
import generateRandomString from '../../utils/generateRandomString'

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.page.main.controlPanel.background,
    padding: theme.spacing(2),
    height: '100%',
  },
  connectionPanel: {
    marginTop: theme.spacing(6),
  },
  requestPanel: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
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
    borderTopLeftRadius: 0,
  },
  copyright: {
    color: theme.project.page.main.controlPanel.copyright.textColor,
  },
}))


export default function ControlPanel() {
  const classes = useStyles()

  const [tabValue, setTabValue] = useState('basic')

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Grid className={classes.root}
          container
          direction="column"
          justify="space-between"
          component={Paper}
          elevation={1}
          square>
      <Grid className={classes.connectionPanel} item>
        <ConnectionPanel/>
        <div className={classes.requestPanel}>
          <Tabs indicatorColor="secondary" value={tabValue} onChange={handleTabChange}>
            <Tab className={classes.tab} label="基本" value="basic"/>
            <Tab className={classes.tab} label="排程" value="schedule"/>
          </Tabs>
          <Paper className={classes.tabPanel}>
            <TabContext value={tabValue}>
              <BasicTabPanel/>
              <ScheduleTabPanel/>
            </TabContext>
          </Paper>
        </div>
      </Grid>
      <Grid item>
        <Copyright/>
      </Grid>
    </Grid>
  )
}


function BasicTabPanel() {
  const dispatch = useDispatch()

  const connectionState = useSelector(getConnectionState)
  const requestText = useSelector(getRequestText)
  const appliedFavoriteRequest = useSelector(getAppliedFavoriteRequest)

  const [value, setValue] = useState('')
  const [favoriteRequestsPanelOpen, setFavoriteRequestsPanel] = useState(false)

  useEffect(() => {
    setValue(requestText)
  }, [requestText])

  const onRequestTextInputChange = (e) => {
    setValue(e.target.value)
    dispatch(clearAppliedFavoriteRequestID())
  }

  const onAppliedFavoriteRequestButtonClicked = () => {
    if (appliedFavoriteRequest) {
      dispatch(clearAppliedFavoriteRequestID(appliedFavoriteRequest.id))
    } else {
      const favoriteRequest = {
        id: generateRandomString(),
        name: new Date().toLocaleString(),
        text: value,
      }
      dispatch(addFavoriteRequest(favoriteRequest))
      dispatch(setAppliedFavoriteRequestID(favoriteRequest.id))
    }
  }

  const onSendButtonClicked = () => {
    dispatch(sendRequestText(value))
  }

  const showFavoriteRequestsPanel = () => {
    setFavoriteRequestsPanel(true)
  }

  const hideFavoriteRequestsPanel = () => {
    setFavoriteRequestsPanel(false)
  }

  const isConnected = connectionState === ConnectionState.Connected
  return (
    <TabPanel value="basic">
      <Grid container direction="row-reverse">
        <Grid item>
          <Button
            variant="contained"
            onClick={showFavoriteRequestsPanel}>
            展開常用列表
          </Button>
          <FavoriteRequestsPanel open={favoriteRequestsPanelOpen} onClose={hideFavoriteRequestsPanel}/>
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
        value={value}
        onChange={onRequestTextInputChange}
      />

      <Grid style={{marginTop: 8}} container justify="space-between">
        <Grid item>
          <Button
            variant="contained"
            onClick={onAppliedFavoriteRequestButtonClicked}>
            {appliedFavoriteRequest ? '取消常用' : '設為常用'}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            disabled={!isConnected}
            onClick={onSendButtonClicked}>
            送出
          </Button>
        </Grid>
      </Grid>
    </TabPanel>
  )
}

function ScheduleTabPanel() {
  const classes = useStyles()
  const dispatch = useDispatch()

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

  const onEnableButtonClicked = () => {
    if (scheduleEnabled) {
      dispatch(disableSchedule())
    } else {
      dispatch(enableSchedule({requestText: localRequestText, timeInterval: localTimeInterval}))
    }
  }

  const showFavoriteRequestsPanel = () => {
    setFavoriteRequestsPanel(true)
  }

  const hideFavoriteRequestsPanel = () => {
    setFavoriteRequestsPanel(false)
  }

  const isConnected = connectionState === ConnectionState.Connected

  return (
    <TabPanel value="schedule">
      <Grid container direction="row-reverse">
        <Grid item>
          <Button
            variant="contained"
            disabled={scheduleEnabled}
            onClick={showFavoriteRequestsPanel}>
            展開常用列表
          </Button>
          <FavoriteRequestsPanel open={favoriteRequestsPanelOpen} onClose={hideFavoriteRequestsPanel}/>
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
          <Button
            variant="contained"
            disabled={scheduleEnabled}
            onClick={onAppliedFavoriteRequestButtonClicked}>
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
              <Button
                variant="contained"
                color="primary"
                disabled={!isConnected}
                onClick={onEnableButtonClicked}>
                {scheduleEnabled ? '關閉' : '啟用'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </TabPanel>
  )
}

function Copyright() {
  const classes = useStyles()

  return (
    <Typography className={classes.copyright} variant="body2" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://eng.marco79423.net/">兩大類</Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  )
}
