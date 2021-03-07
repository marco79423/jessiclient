import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {Button, Grid, Paper, Tab, Tabs, TextField} from '@material-ui/core'
import {TabContext, TabPanel} from '@material-ui/lab'

import {ConnectionState} from '../../constants'
import {
  addFavoriteRequest,
  changeRequestText,
  clearAppliedFavoriteRequestID,
  getAppliedFavoriteRequest,
  getConnectionState,
  getRequestText,
  sendRequestText,
  setAppliedFavoriteRequestID
} from '../../slices'
import ConnectionPanel from './ConnectionPanel'
import Copyright from './Copyright'
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
  const dispatch = useDispatch()

  const connectionState = useSelector(getConnectionState)
  const requestText = useSelector(getRequestText)
  const appliedFavoriteRequest = useSelector(getAppliedFavoriteRequest)

  const [tabValue, setTabValue] = useState('basic')
  const [favoriteRequestsPanelOpen, setFavoriteRequestsPanel] = useState(false)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const onRequestTextInputChange = (e) => {
    dispatch(changeRequestText(e.target.value))
    dispatch(clearAppliedFavoriteRequestID())
  }

  const onAppliedFavoriteRequestButtonClicked = () => {
    if (appliedFavoriteRequest) {
      dispatch(clearAppliedFavoriteRequestID(appliedFavoriteRequest.id))
    } else {
      const favoriteRequest = {
        id: generateRandomString(),
        name: new Date().toLocaleString(),
        text: requestText,
      }
      dispatch(addFavoriteRequest(favoriteRequest))
      dispatch(setAppliedFavoriteRequestID(favoriteRequest.id))
    }
  }

  const onSendButtonClicked = () => {
    dispatch(sendRequestText())
  }

  const showFavoriteRequestsPanel = () => {
    setFavoriteRequestsPanel(true)
  }

  const hideFavoriteRequestsPanel = () => {
    setFavoriteRequestsPanel(false)
  }

  const isConnected = connectionState === ConnectionState.Connected
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
              <TabPanel value="basic">
                <Grid container direction="row-reverse">
                  <Grid item>
                    <Button
                      style={{marginLeft: 8}}
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
                  value={requestText}
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
