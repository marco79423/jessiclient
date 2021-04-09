import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Paper} from '@material-ui/core'

import Copyright from '../../modules/ControlPanel/Copyright'
import PropTypes from 'prop-types'
import ConnectionPanel from './ConnectionPanel'


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

export default function ControlPanel({connectionPanel, requestPanel}) {
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
            {connectionPanel}
          </Grid>
          <Grid className={classes.requestPanel} item>
            {requestPanel}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Copyright/>
      </Grid>
    </Grid>
  )
}

ConnectionPanel.propTypes = {
  connectionPanel: PropTypes.node.isRequired,
  requestPanel: PropTypes.node.isRequired,
}
