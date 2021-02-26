import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Box, Grid, Paper} from '@material-ui/core'

import Logo from './Logo'
import ConnectionPanel from './ConnectionPanel'
import RequestPanel from './RequestPanel'
import Copyright from './Copyright'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    padding: theme.spacing(1),
  },
  logo: {
    margin: '0 auto',
  },
  connectionPanel: {
    margin: '0 auto',
    marginTop: theme.spacing(6),
    maxWidth: 500,
  },
  copyright: {},
}))

export default function ControlPanel() {
  const classes = useStyles()

  return (
    <Grid className={classes.root} container component={Paper} direction="column" justify="center">
      <Grid item>
        <Logo className={classes.logo}/>
        <ConnectionPanel className={classes.connectionPanel}/>
        <RequestPanel/>
        <Box mt={5}>
          <Copyright/>
        </Box>
      </Grid>
    </Grid>
  )
}
