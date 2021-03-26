import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {AppBar as MuiAppBar, Avatar, Backdrop, Grid, Slide, Typography} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'


const useStyles = makeStyles((theme) => ({
  root: {},
  appBar: {
    background: theme.project.page.header.background,
  },
  brand: {
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
  main: {
    background: theme.project.page.main.background,
    height: 'calc(100vh - 64px)'
  },
  controlPanel: {
    zIndex: 1,
  },
  listPanel: {},
  detailPanel: {},
}))

export default function DefaultLayout({loading, detailOpen, toolbar, controlPanel, listPanel, detailPanel}) {
  const classes = useStyles()

  return (
    <>
      <Backdrop style={{zIndex: 100}} open={loading}>
        <CircularProgress color="inherit"/>
      </Backdrop>

      <MuiAppBar className={classes.appBar} position="relative" elevation={1}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Logo/>
          </Grid>
          <Grid item>
            {toolbar}
          </Grid>
        </Grid>
      </MuiAppBar>
      <Grid className={classes.main} container component="main">
        <Grid className={classes.controlPanel} item sm={4} xs={12}>
          {controlPanel}
        </Grid>
        <Grid className={classes.listPanel} item sm={detailOpen ? 4 : 8} xs={12}>
          {listPanel}
        </Grid>
        <Slide direction="left" in={detailOpen} mountOnEnter unmountOnExit>
          <Grid className={classes.detailPanel} item sm={4} xs={false}>
            {detailPanel}
          </Grid>
        </Slide>
      </Grid>
    </>
  )
}

function Logo() {
  const classes = useStyles()

  return (
    <Grid className={classes.brand} container item alignItems="center">
      <Grid xs={4} item>
        <Avatar className={classes.logo} variant="square" src={'/favicon.ico'}/>
      </Grid>
      <Grid xs={8} item container>
        <Typography className={classes.title} component="h1" variant="h5">Jessiclient</Typography>
        <Typography className={classes.subtitle} component="h2" variant="subtitle2">Websocket Client</Typography>
      </Grid>
    </Grid>
  )
}
