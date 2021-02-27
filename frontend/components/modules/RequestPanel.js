import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import classNames from 'classnames'
import {makeStyles} from '@material-ui/core/styles'
import {Button, Grid, Paper, Tab, Tabs, TextField} from '@material-ui/core'

import {changeRequestText, getConnectionState, getRequestText, sendRequestText} from '../../slices'
import {ConnectionState} from '../../constants'

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))

export default function RequestPanel({className}) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const connectionState = useSelector(getConnectionState)
  const requestText = useSelector(getRequestText)

  const onRequestTextInputChange = (e) => {
    dispatch(changeRequestText(e.target.value))
  }

  const onSendButtonClicked = async () => {
    dispatch(sendRequestText())
  }

  return (
    <div className={classNames(classes.root, className)}>
      <Tabs indicatorColor="primary" style={{marginTop: 48}} value={0}>
        <Tab label="基本"/>
        <Tab label="排程"/>
        <Tab label="驗證"/>
      </Tabs>
      <Paper style={{padding: 16}}>
        <TextField
          variant="outlined"
          margin="normal"
          multiline
          rows={8}
          fullWidth
          label="請求內容"
          name="請求內容"
          autoComplete="請求內容"
          autoFocus
          value={requestText}
          onChange={onRequestTextInputChange}
        />

        <Grid container>
          <Grid item xs>

          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              disabled={connectionState !== ConnectionState.Connected}
              onClick={onSendButtonClicked}>
              送出
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
