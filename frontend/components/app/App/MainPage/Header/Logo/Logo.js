import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Avatar, Grid, Typography} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  root: {
    width: 180,
  },
  logo: {
    margin: '3px auto 0',
    width: 45,
    height: 45,
  },
  title: {
    color: theme.project.page.header.titleColor,
  },
  subtitle: {
    color: theme.project.page.header.subtitleColor,
  },
}))

export default function Logo() {
  const classes = useStyles()

  return (
    <Grid className={classes.root} container alignItems="center">
      <Grid xs={4} item>
        <Avatar className={classes.logo} variant="square" alt="logo" src={'/favicon.ico'}/>
      </Grid>
      <Grid xs={8} item>
        <Typography className={classes.title} component="h1" variant="h5">Jessiclient</Typography>
        <Typography className={classes.subtitle} component="h2" variant="subtitle2">Websocket Client</Typography>
      </Grid>
    </Grid>
  )
}
