import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Paper} from '@material-ui/core'

import useWindowSize from '../../../../../hooks/useWindowSize'
import ControlBar from './ControlBar'
import ConnectionPanel from './ConnectionPanel'
import RequestPanel from './RequestPanel'
import Copyright from './Copyright'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: theme.project.page.main.controlPanel.background,
    padding: theme.spacing(3),
    height: '100%',
  },
  controlBar: {},
  connectionPanel: {
    marginTop: theme.spacing(3),
  },
  requestPanel: {
    marginTop: theme.spacing(4),
    flex: 1,
  },
  copyright: {}
}))

export default function ControlPanel() {
  const classes = useStyles()
  const [windowWidth, _] = useWindowSize()

  return (
    <Paper className={classes.root} elevation={1} square>
      {windowWidth <= 500 ? (
        <div className={classes.controlBar}>
          <ControlBar/>
        </div>
      ) : null}
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
