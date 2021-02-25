import Paper from '@material-ui/core/Paper'
import Logo from './Logo'
import ConnectionPanel from './ConnectionPanel'
import RequestPanel from './RequestPanel'
import Box from '@material-ui/core/Box'
import Copyright from './Copyright'
import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Grid} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    padding: theme.spacing(5),
  },
  logo: {
    margin: '0 auto',
  },
  connectionPanel: {
    margin: '0 auto',
    marginTop: theme.spacing(6),
    maxWidth: 500,
  },
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
