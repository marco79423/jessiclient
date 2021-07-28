import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Link, Paper, Typography} from '@material-ui/core'
import ConnectionPanel from './ConnectionPanel'
import RequestPanel from './RequestPanel'
import {ConnectionState} from '../../../../../constants'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: theme.project.page.main.controlPanel.background,
    padding: theme.spacing(3),
    height: '100%',
  },
  connectionPanel: {
    marginTop: theme.spacing(3),
  },
  requestPanel: {
    marginTop: theme.spacing(4),
    flex: 1,
  },
  copyright: {
    margin: '16px auto 0',
    color: theme.project.page.main.controlPanel.copyright.textColor,
  }
}))

export default function WebControlPanel({
                                          connectionState,
                                          connectionUrl,

                                          onConnect,
                                          onDisconnect,

                                          requestBody,
                                          onRequestBodyChange,
                                          onSendRequest,

                                          scheduleTimeInterval,
                                          onScheduleTimeIntervalChange,
                                          scheduleEnabled,
                                          onEnableSchedule,

                                          favoriteRequestCategories,
                                          favoriteRequestID,
                                          onShowFavoriteRequestDialog,
                                          onAddFavoriteRequest,
                                          onRemoveFavoriteRequest,
                                        }) {
  const classes = useStyles()

  return (
    <Paper className={classes.root} elevation={1} square>
      <div className={classes.connectionPanel}>
        <ConnectionPanel
          state={connectionState}
          url={connectionUrl}

          onConnect={onConnect}
          onDisconnect={onDisconnect}
        />
      </div>
      <div className={classes.requestPanel}>
        <RequestPanel
          isConnected={connectionState === ConnectionState.Connected}

          requestBody={requestBody}
          onRequestBodyChange={onRequestBodyChange}
          onSendRequest={onSendRequest}

          scheduleTimeInterval={scheduleTimeInterval}
          onScheduleTimeIntervalChange={onScheduleTimeIntervalChange}
          scheduleEnabled={scheduleEnabled}
          onEnableSchedule={onEnableSchedule}

          favoriteRequestCategories={favoriteRequestCategories}
          favoriteRequestID={favoriteRequestID}
          onShowFavoriteRequestDialog={onShowFavoriteRequestDialog}
          onAddFavoriteRequest={onAddFavoriteRequest}
          onRemoveFavoriteRequest={onRemoveFavoriteRequest}
        />
      </div>
      <div className={classes.copyright}>
        <Typography variant="body2" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://marco79423.net/">兩大類</Link>{' '}
          {new Date().getFullYear()}
        </Typography>
      </div>
    </Paper>
  )
}

WebControlPanel.propTypes = {}
