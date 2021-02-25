import React from 'react'
import classNames from 'classnames'
import {Avatar, Grid, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
  image: {
    margin: '6px auto 0',
    width: 45,
    height: 45,
  }
}))

export default function Logo({className}) {
  const classes = useStyles()

  return (
    <Grid className={classNames(classes.root, className)} container>
      <Grid xs={4} item>
        <Avatar className={classes.image} src={'/logo.png'}/>
      </Grid>
      <Grid xs={8} item container>
        <Typography color="primary" component="h1" variant="h5">Jessiclient</Typography>
        <Typography component="h2" variant="subtitle1">Websocket Client</Typography>
      </Grid>
    </Grid>
  )
}
