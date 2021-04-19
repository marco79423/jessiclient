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
    display: 'flex',
    background: theme.project.page.main.background,
    height: 'calc(100vh - 64px)'
  },
  controlPanel: {
    zIndex: 1,
    width: 500,
  },
  listPanel: {
    flex: 1,
  },
  detailPanel: {
    flex: 1,
  },
}))

export default function MobileLayout({loading, detailOpen, toolbar, controlPanel, listPanel, detailPanel}) {
  const classes = useStyles({detailOpen})

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
      <main className={classes.main}>
        <div className={classes.controlPanel}>
          {controlPanel}
        </div>
        <div className={classes.listPanel}>
          {listPanel}
        </div>
        <Slide direction="left" in={detailOpen} mountOnEnter unmountOnExit>
          <div className={classes.detailPanel}>
            {detailPanel}
          </div>
        </Slide>
      </main>
    </>
  )
}
