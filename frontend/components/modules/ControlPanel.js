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
    padding: theme.spacing(2),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(6),
  },
  connectionPanel: {
    marginTop: theme.spacing(3),
  },
}))

export default function ControlPanel() {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Grid container
            direction="column"
            justify="center"
            alignItems="center">
        <Grid container item>
          <Grid item>
            <Logo/>
          </Grid>
          <Grid item>
            <form className={classes.form} noValidate>
              <ConnectionPanel className={classes.connectionPanel}/>
              <RequestPanel/>
              <Box mt={5}>
                <Copyright/>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}
