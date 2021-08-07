import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Paper} from '@material-ui/core'

import ConnectionPanel from './WebControlPanel/ConnectionPanel'
import Copyright from '../WebControlPanel/Copyright'
import RequestPanel from '../RequestPanel'
import ControlBar from '../WebControlPanel/ControlBar'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: theme.project.page.main.controlPanel.background,
    padding: theme.spacing(2),
    height: '100%',
  },
  controlBar: {},
  connectionPanel: {
    marginTop: theme.spacing(2),
  },
  requestPanel: {
    marginTop: theme.spacing(2),
    flex: 1,
  },
  copyright: {}
}))

export default function MobileControlPanel() {
  const classes = useStyles()

  return (
    <Paper className={classes.root} elevation={1} square>
      <div className={classes.controlBar}>
        <ControlBar/>
      </div>
      <div className={classes.connectionPanel}>
        <ConnectionPanel/>
      </div>
      <div className={classes.requestPanel}>
        <RequestPanel/>
      </div>
      <div className={classes.copyright}>
        <Copyright/>
      </div>
    </Paper>
  )
}

MobileControlPanel.propTypes = {}
