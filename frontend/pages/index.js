import React from 'react'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import {InputAdornment} from '@material-ui/core'

import Copyright from '../components/modules/Copyright'
import Logo from '../components/modules/Logo'
import MainPanel from '../components/modules/MainPanel'
import RequestPanel from '../components/modules/RequestPanel'
import ConnectionPanel from '../components/modules/ConnectionPanel'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  connectionPanel: {
    marginTop: theme.spacing(3),
  },
  mainPanel: {},
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(6),
  },
}))

export default function Index() {
  const classes = useStyles()

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Logo/>
          <form className={classes.form} noValidate>
            <ConnectionPanel className={classes.connectionPanel}/>
            <RequestPanel/>
            <Box mt={5}>
              <Copyright/>
            </Box>
          </form>
        </div>
      </Grid>
      <Grid className={classes.mainPanel} item xs={false} sm={4} md={7}>
        <MainPanel/>
      </Grid>
    </Grid>
  )
}
