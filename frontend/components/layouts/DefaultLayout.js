import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {AppBar as MuiAppBar, Backdrop, Grid, Slide} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

import Logo from '../modules/AppBar/shared/Logo'
import {AppWebDisplayMode} from '../../constants'


const useStyles = makeStyles((theme) => ({
  root: {},
  appBar: {
    background: theme.project.page.header.background,
    height: 64,
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
    overflow: 'hidden',
  },
  detailPanel: {
    flex: 1,
  },
}))

export default function DefaultLayout({
                                        displayMode,
                                        loading,
                                        toolbar,
                                        controlPanel,
                                        listPanel,
                                        detailPanel,
                                      }) {
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
      <div className={classes.main}>
        <div className={classes.controlPanel}>
          {controlPanel}
        </div>
        <div className={classes.listPanel}>
          {listPanel}
        </div>
        <Slide direction="left" in={displayMode === AppWebDisplayMode.DetailPanelOn} mountOnEnter unmountOnExit>
          <div className={classes.detailPanel}>
            {detailPanel}
          </div>
        </Slide>
      </div>
    </>
  )
}
