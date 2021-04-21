import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {AppBar as MuiAppBar, Backdrop, Drawer, Grid} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

import {AppMobileDisplayMode} from '../../constants'
import Logo from '../modules/web/AppBar/Logo'


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
  listPanel: {},
  detailPanel: {},
  drawerPaper: {
    width: '100%'
  }
}))

export default function MobileLayout({
                                       appController,
                                       loading,
                                       toolbar: Toolbar,
                                       controlPanel: ControlPanel,
                                       listPanel: ListPanel,
                                       detailPanel: DetailPanel,
                                     }) {
  const classes = useStyles()
  const [displayMode, setDisplayMode] = useState(AppMobileDisplayMode.MainPanel)

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
            {<Toolbar appController={appController}/>}
          </Grid>
        </Grid>
      </MuiAppBar>
      <main className={classes.main}>
        <div className={classes.controlPanel}>
          {<ControlPanel appController={appController} setDisplayMode={setDisplayMode}/>}
        </div>
        <Drawer
          className={classes.listPanel}
          classes={{paper: classes.drawerPaper}}
          anchor="right"
          open={displayMode !== AppMobileDisplayMode.MainPanel}
        >
          <ListPanel appController={appController} setDisplayMode={setDisplayMode}/>}
        </Drawer>
        <Drawer
          className={classes.detailPanel}
          classes={{paper: classes.drawerPaper}}
          anchor="right"
          open={displayMode === AppMobileDisplayMode.DetailPanel}
        >
          {<DetailPanel appController={appController} setDisplayMode={setDisplayMode}/>}
        </Drawer>
      </main>
    </>
  )
}
