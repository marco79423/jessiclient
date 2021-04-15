import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Paper} from '@material-ui/core'

import Copyright from '../../modules/ControlPanel/Copyright'


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
  copyright: {
    margin: '16px auto'
  }
}))

export default function ControlPanel({connectionPanel, requestPanel}) {
  const classes = useStyles()

  return (
    <Paper className={classes.root} elevation={1} square>
      <Grid container direction="column">
        <Grid className={classes.connectionPanel} item>
          {connectionPanel}
        </Grid>
        <Grid className={classes.requestPanel} item>
          {requestPanel}
        </Grid>
      </Grid>

      <div className={classes.copyright}>
        <Copyright/>
      </div>
    </Paper>
  )
}

ControlPanel.propTypes = {
  connectionPanel: PropTypes.element.isRequired,
  requestPanel: PropTypes.element.isRequired,
}
