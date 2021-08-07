import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Paper} from '@material-ui/core'

import RequestBody from './RequestBody'
import Toolbar from './Toolbar'
import Control from './Control'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    height: '100%',
    maxHeight: 500,
    padding: theme.spacing(3),

    borderTopLeftRadius: 0,
  },
  toolbar: {},
  requestBody: {
    marginTop: theme.spacing(1),
    maxHeight: 350,
  },
  control: {
    marginTop: theme.spacing(4),
  },
}))


export default function BasicTabPanel() {
  const classes = useStyles()

  return (
    <Grid container className={classes.root} component={Paper}>
      <Grid item className={classes.toolbar}>
        <Toolbar/>
      </Grid>
      <Grid item className={classes.requestBody} xs>
        <RequestBody/>
      </Grid>
      <Grid item className={classes.control}>
        <Control/>
      </Grid>
    </Grid>
  )
}

BasicTabPanel.propTypes = {}
