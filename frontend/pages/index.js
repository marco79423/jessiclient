import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Slide} from '@material-ui/core'

import {getSelectedMessageID, initialize} from '../slices'
import ListPanel from '../components/modules/ListPanel'
import ControlPanel from '../components/modules/ControlPanel'
import DetailPanel from '../components/modules/DetailPanel'
import AppBar from '../components/modules/AppBar'

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  }
})

const useStyles = makeStyles((theme) => ({
  root: {},
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
      <AppBar/>
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
