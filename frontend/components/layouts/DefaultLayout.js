import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {AppBar as MuiAppBar, Backdrop, Grid, Slide} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

import Logo from '../modules/AppBar/Logo'


const useStyles = makeStyles((theme) => ({
  root: {},
  appBar: {
    background: theme.project.page.header.background,
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

