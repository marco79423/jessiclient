import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import classNames from 'classnames'
import {makeStyles} from '@material-ui/core/styles'
import {Button, Grid, Paper, Tab, Tabs, TextField} from '@material-ui/core'

import {
  changeRequestText,
  getConnectionState,
  getRequestText,
  getSettingMaxHistoryCount, getSettingMaxLogCount,
  sendRequestText
} from '../../slices'
import {ConnectionState} from '../../constants'
import {TabContext, TabPanel} from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))

export default function RequestPanel({className}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [tabValue, setTabValue] = useState('request')

  const maxHistoryCount = useSelector(getSettingMaxHistoryCount)
  const maxLogCount = useSelector(getSettingMaxLogCount)
  const connectionState = useSelector(getConnectionState)
  const isConnected = connectionState === ConnectionState.Connected
  const requestText = useSelector(getRequestText)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const onRequestTextInputChange = (e) => {
    dispatch(changeRequestText(e.target.value))
  }

  const onSendButtonClicked = async () => {
    dispatch(sendRequestText())
  }

  return (
    <div className={classNames(classes.root, className)}>
      <Tabs indicatorColor="primary" style={{marginTop: 48}} value={tabValue} onChange={handleTabChange}>
        <Tab label="基本" value="request"/>
        {/*<Tab label="排程"/>*/}
        <Tab label="設定" value="settings"/>
      </Tabs>
      <Paper style={{padding: 16}}>
        <TabContext value={tabValue}>
          <TabPanel value="request">
            <TextField
              variant="outlined"
              margin="normal"
              multiline
              rows={8}
              fullWidth
              label="請求內容"
              autoFocus
              disabled={!isConnected}
              value={requestText}
              onChange={onRequestTextInputChange}
            />

            <Grid container direction="row-reverse">
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
          <TabPanel value="settings">
            <Grid container direction="column" spacing={3}>
              <Grid container item spacing={2}>
                <Grid item>
                  <TextField
                    variant="outlined"
                    disabled={true}
                    value={maxHistoryCount}
                    label="最大訊息數量"
                    size="small"
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onSendButtonClicked}>
                    修改
                  </Button>
                </Grid>
              </Grid>
              <Grid container item spacing={2}>
                <Grid item>
                  <TextField
                    variant="outlined"
                    disabled={true}
                    value={maxLogCount}
                    label="最大 Log 數量"
                    size="small"
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onSendButtonClicked}>
                    修改
                  </Button>
                </Grid>
              </Grid>
            </Grid>

          </TabPanel>
        </TabContext>
      </Paper>
    </div>
  )
}
