import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Slide} from '@material-ui/core'

import {loadProjectData} from '../slices/projectSlice'
import {loadHistoryData} from '../slices/historySlice'
import {loadLogData} from '../slices/logSlice'
import ListPanel from '../components/modules/ListPanel'
import ControlPanel from '../components/modules/ControlPanel'
import DetailPanel from '../components/modules/DetailPanel'
import {selectSelectedHistoryID} from '../slices/currentSlice'


const useStyles = makeStyles((theme) => ({
  root: {},
  controlPanel: {},
  listPanel: {},
  detailPanel: {},
}))

export default function Index() {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadProjectData())
    dispatch(loadHistoryData())
    dispatch(loadLogData())
  }, [])

  const historyID = useSelector(selectSelectedHistoryID)
  const detailOpen = historyID !== null

  return (
    <Grid className={classes.root} container component="main">
      <Grid className={classes.controlPanel} item sm={4} xs={12}>
        <ControlPanel/>
      </Grid>
      <Grid className={classes.listPanel} item sm={detailOpen ? 4 : 8} xs={12}>
        <ListPanel/>
      </Grid>
      <Slide direction="left" in={historyID !== null} mountOnEnter unmountOnExit>
        <Grid className={classes.detailPanel} item sm={4} xs={false}>
          <DetailPanel/>
        </Grid>
      </Slide>
    </Grid>
  )
}
