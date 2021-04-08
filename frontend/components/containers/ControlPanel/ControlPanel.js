import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Paper} from '@material-ui/core'

import ConnectionPanelContainer from './ConnectionPanelContainer'
import Copyright from '../../modules/ControlPanel/Copyright'
import RequestPanelContainer from './RequestPanelContainer'


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.page.main.controlPanel.background,
    padding: theme.spacing(2),
    height: '100%',
  },
  connectionPanel: {
    marginTop: theme.spacing(3),
  },
  requestPanel: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))


export default function ControlPanel({appController}) {
  const classes = useStyles()

  return (
    <Grid className={classes.root}
          container
          direction="column"
          justify="space-between"
          component={Paper}
          elevation={1}
          square>
      <Grid item>
        <Grid container direction="column">
          <Grid className={classes.connectionPanel} item>
            <ConnectionPanelContainer appController={appController}/>
          </Grid>
          <Grid className={classes.requestPanel} item>
            <RequestPanelContainer appController={appController}/>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Copyright/>
      </Grid>
    </Grid>
  )
}
