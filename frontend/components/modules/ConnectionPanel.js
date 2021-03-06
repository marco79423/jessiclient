import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import classNames from 'classnames'
import {makeStyles} from '@material-ui/core/styles'
import {Button, Grid, InputBase, Paper, Tooltip} from '@material-ui/core'

import {ConnectionState} from '../../constants'
import {changeConnectionUrl, connect, disconnect, getConnectionState, getConnectionUrl} from '../../slices'

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.page.main.controlPanel.connectionPanel.background,
    margin: '0 auto',
    padding: theme.spacing(2),
    maxWidth: 500,
  },
  connectionUrlInput: {
    fontSize: '1.3rem',
    width: '100%',
  },
  connectButton: {
    color: theme.project.page.main.controlPanel.connectionPanel.connectButtonTextColor,
  }
}))

export default function ConnectionPanel({className}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [url, setUrl] = useState('')

  const connectionUrl = useSelector(getConnectionUrl)
  const connectionState = useSelector(getConnectionState)

  useEffect(() => {
    setUrl(connectionUrl)
  }, [connectionUrl])

  const onConnectionUrlInputChange = (e) => {
    setUrl(e.target.value)
  }

  const onConnectButtonClicked = async () => {
    if (connectionState === ConnectionState.Idle) {
      await dispatch(changeConnectionUrl(url))
      await dispatch(connect())
    } else if (connectionState === ConnectionState.Connected) {
      await dispatch(disconnect())
    }
  }

  const renderButton = () => {
    switch (connectionState) {
      case ConnectionState.Idle:
        return (
          <Button className={classes.connectButton} size="large" aria-label="connect" onClick={onConnectButtonClicked}>建立連線</Button>
        )
      case ConnectionState.Connecting:
        return (
          <Button className={classes.connectButton} size="large" aria-label="connecting" disabled>連線中…</Button>
        )
      case ConnectionState.Connected:
        return (
          <Button className={classes.connectButton} size="large" aria-label="connected" onClick={onConnectButtonClicked}>關閉連線</Button>
        )
      case ConnectionState.Closing:
        return (
          <Button className={classes.connectButton} aria-label="closing" disabled>關閉中…</Button>
        )
    }
  }

  return (
    <Grid container component={Paper} className={classNames(classes.root, className)} justify="space-between">
      <Grid item xs>
        <Tooltip title={url} arrow placement="top-end">
          <InputBase
            className={classes.connectionUrlInput}
            placeholder="欲連線的網址"
            inputProps={{'aria-label': 'ws://欲連線的網址'}}
            value={url}
            disabled={connectionState !== ConnectionState.Idle}
            onChange={onConnectionUrlInputChange}
          />
        </Tooltip>
      </Grid>
      <Grid item>
        {renderButton()}
      </Grid>
    </Grid>
  )
}
