import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {AppBar as MuiAppBar, Backdrop, Grid, Slide} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

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

export default function DefaultLayout({
                                        appController,
                                        loading,
                                        detailOpen,
                                        toolbar: Toolbar,
                                        controlPanel: ControlPanel,
                                        listPanel: ListPanel,
                                        detailPanel: DetailPanel,
                                      }) {
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
            {<Toolbar appController={appController}/>}
          </Grid>
        </Grid>
      </MuiAppBar>
      <main className={classes.main}>
        <div className={classes.controlPanel}>
          {<ControlPanel appController={appController}/>}
        </div>
        <div className={classes.listPanel}>
          {<ListPanel appController={appController}/>}
        </div>
        <Slide direction="left" in={detailOpen} mountOnEnter unmountOnExit>
          <div className={classes.detailPanel}>
            {<DetailPanel appController={appController}/>}
          </div>
        </Slide>
      </main>
    </>
  )
}
