import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Paper} from '@material-ui/core'

import useWindowSize from '../../../../../hooks/useWindowSize'
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
  connectionPanel: {
    marginTop: windowHeight => theme.spacing(windowHeight > 800 ? 3 : 0),
  },
  requestPanel: {
    marginTop: windowHeight => theme.spacing(windowHeight > 800 ? 3 : 2),
    flex: 1,
  },
  copyright: {}
}))

export default function ControlPanel() {
  const [_, windowHeight] = useWindowSize()
  const classes = useStyles(windowHeight)

  return (
    <Paper className={classes.root} elevation={1} square>
      <div className={classes.connectionPanel}>
        <ConnectionPanel/>
      </div>
      <div className={classes.requestPanel}>
        <RequestPanel/>
      </div>
      {windowHeight > 800 ? (
        <div className={classes.copyright}>
        <Copyright/>
      </div>
      ) : null}
    </Paper>
  )
}
