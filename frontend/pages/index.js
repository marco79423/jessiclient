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

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  // connect
  connectForm: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}))

export default function Index() {
  const classes = useStyles()

  return (
    <Grid container component="main" className={classes.root}>
      <Grid className={classes.mainPanel} item xs={false} sm={4} md={7}>
        <MainPanel/>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Logo/>
          <form className={classes.form} noValidate>
            <Paper style={{marginTop: 32}} className={classes.connectForm}>
              <InputBase
                startAdornment={<InputAdornment position="start">ws://</InputAdornment>}
                className={classes.input}
                placeholder="欲連線的網址"
                inputProps={{'aria-label': '欲連線的網址'}}
              />
              <Button color="primary" className={classes.iconButton} aria-label="open">建立連線</Button>
            </Paper>

            <RequestPanel/>

            <Box mt={5}>
              <Copyright/>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}
