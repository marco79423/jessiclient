import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {makeStyles} from '@material-ui/core/styles'
import {AppBar as MuiAppBar, Avatar, Grid, Slide, Typography} from '@material-ui/core'

import {getSelectedMessageID, initialize} from '../slices'
import ListPanel from '../components/modules/ListPanel'
import ControlPanel from '../components/modules/ControlPanel'
import DetailPanel from '../components/modules/DetailPanel'
import Toolbar from '../components/modules/Toolbar'

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  }
})

const useStyles = makeStyles((theme) => ({
  root: {},
  abbBar: {
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

export default function Index() {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialize())
  }, [])

  const messageID = useSelector(getSelectedMessageID)
  const detailOpen = messageID !== null

  return (
    <>
      <MuiAppBar className={classes.abbBar} position="relative" elevation={1}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Logo/>
          </Grid>
          <Grid item>
            <Toolbar/>
          </Grid>
        </Grid>
      </MuiAppBar>
      <Grid className={classes.main} container component="main">
        <Grid className={classes.controlPanel} item sm={4} xs={12}>
          <ControlPanel/>
        </Grid>
        <Grid className={classes.listPanel} item sm={detailOpen ? 4 : 8} xs={12}>
          <ListPanel/>
        </Grid>
        <Slide direction="left" in={messageID !== null} mountOnEnter unmountOnExit>
          <Grid className={classes.detailPanel} item sm={4} xs={false}>
            <DetailPanel/>
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
