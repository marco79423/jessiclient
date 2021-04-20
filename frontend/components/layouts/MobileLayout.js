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
        <Drawer anchor="right" open={displayMode === AppMobileDisplayMode.ListPanel}>
          <div className={classes.listPanel}>
            {<ListPanel appController={appController} setDisplayMode={setDisplayMode}/>}
          </div>
        </Drawer>
        <Drawer anchor="right" open={displayMode === AppMobileDisplayMode.DetailPanel}>
          <div className={classes.detailPanel}>
            {<DetailPanel appController={appController} setDisplayMode={setDisplayMode}/>}
          </div>
        </Drawer>
      </main>
    </>
  )
}
