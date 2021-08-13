import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Paper} from '@material-ui/core'

import useWindowSize from '../../../../../hooks/useWindowSize'
import ConnectionPanel from './ConnectionPanel'
import RequestPanel from './RequestPanel'
import Copyright from './Copyright'


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.page.main.controlPanel.background,
    padding: theme.spacing(3),
    height: '100%',
    maxWidth: 500,
  },
  connectionPanel: {
    marginTop: smallDeviceMode => theme.spacing(smallDeviceMode ? 0 : 3),
  },
  requestPanel: {
    marginTop: smallDeviceMode => theme.spacing(smallDeviceMode ? 2 : 3),
  },
  copyright: {}
}))

export default function ControlPanel() {
  const smallDeviceMode = useSmallDeviceMode()
  const classes = useStyles(smallDeviceMode)

  return (
    <Grid className={classes.root} container direction="column" component={Paper} elevation={1} square>
      <Grid className={classes.connectionPanel} item>
        <ConnectionPanel/>
      </Grid>
      <Grid className={classes.requestPanel} item xs>
        <RequestPanel/>
      </Grid>
      {!smallDeviceMode ? (
        <Grid className={classes.copyright} item>
          <Copyright/>
        </Grid>
      ) : null}
    </Grid>
  )
}

function useSmallDeviceMode() {
  const {height, ready} = useWindowSize()

  // 初始的時候先給完整的內容
  if (!ready) {
    return false
  }

  return height <= 600
}
