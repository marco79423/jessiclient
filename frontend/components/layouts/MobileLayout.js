import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {AppBar as MuiAppBar, Backdrop, Drawer, Grid} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

import {AppMobileDisplayMode} from '../../constants'
import Logo from '../modules/AppBar/shared/Logo'
import useWindowSize from '../hooks/useWindowSize'


const useStyles = makeStyles((theme) => ({
  root: {},
  appBar: {
    background: theme.project.page.header.background,
    height: 64,
  },
  main: {
    display: 'flex',
    background: theme.project.page.main.background,
  },
  controlPanel: {
    zIndex: 1,
    width: 500,
  },
  listPanel: {},
  detailPanel: {},
  drawerPaper: {
    width: '100%'
  }
}))

export default function MobileLayout({
                                       displayMode,
                                       loading,
                                       toolbar,
                                       controlPanel,
                                       listPanel,
                                       detailPanel,
                                     }) {
  const classes = useStyles()

  const [mainHeight, setMainHeight] = useState(0)
  const [_, windowHeight] = useWindowSize()
  useEffect(() => {
    setMainHeight(windowHeight - 64)
  }, [windowHeight])

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
      <div className={classes.main} style={{height: mainHeight}}>
        <div className={classes.controlPanel}>
          {controlPanel}
        </div>
        <Drawer
          className={classes.listPanel}
          classes={{paper: classes.drawerPaper}}
          anchor="right"
          open={displayMode !== AppMobileDisplayMode.MainPanel}
        >
          {listPanel}}
        </Drawer>
        <Drawer
          className={classes.detailPanel}
          classes={{paper: classes.drawerPaper}}
          anchor="right"
          open={displayMode === AppMobileDisplayMode.DetailPanel}
        >
          {detailPanel}
        </Drawer>
      </div>
    </>
  )
}
