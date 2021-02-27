import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import classNames from 'classnames'
import {makeStyles} from '@material-ui/core/styles'
import {Button, Grid, InputBase, Paper} from '@material-ui/core'

import {ConnectionState} from '../../constants'
import {changeConnectionUrl, connect, disconnect, getConnectionState, getConnectionUrl} from '../../slices'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))

export default function ConnectionPanel({className}) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const connectionUrl = useSelector(getConnectionUrl)
  const connectionState = useSelector(getConnectionState)

  const onConnectionUrlInputChange = (e) => {
    dispatch(changeConnectionUrl(e.target.value))
  }

  const onConnectButtonClicked = async () => {
    if (connectionState === ConnectionState.Idle) {
      dispatch(connect())
    } else if (connectionState === ConnectionState.Connected) {
      dispatch(disconnect())
    }
  }

  const renderButton = () => {
    switch (connectionState) {
      case ConnectionState.Idle:
        return (
          <Button color="primary" aria-label="connect" onClick={onConnectButtonClicked}>建立連線</Button>
        )
      case ConnectionState.Connecting:
        return (
          <Button color="primary" aria-label="connecting" disabled>連線中…</Button>
        )
      case ConnectionState.Connected:
        return (
          <Button color="primary" aria-label="connected" onClick={onConnectButtonClicked}>關閉連線</Button>
        )
      case ConnectionState.Closing:
        return (
          <Button color="primary" aria-label="closing" disabled>關閉中…</Button>
        )
    }
  }

  return (
    <Grid container component={Paper} className={classNames(classes.root, className)} justify="space-between">
      <Grid item>
        <InputBase
          placeholder="ws://欲連線的網址"
          inputProps={{'aria-label': 'ws://欲連線的網址'}}
          value={connectionUrl}
          onChange={onConnectionUrlInputChange}
        />
      </Grid>
      <Grid item>
        {renderButton()}
      </Grid>
    </Grid>
  )
}
