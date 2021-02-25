import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'

import ListPanel from '../components/modules/ListPanel'
import ControlPanel from '../components/modules/ControlPanel'
import {loadProjectData} from '../slices/projectSlice'
import {loadHistoryData} from '../slices/historySlice'
import {loadLogData} from '../slices/logSlice'


const useStyles = makeStyles((theme) => ({
  root: {},
  controlPanel: {
    minWidth: 600,
  },
  listPanel: {},
}))

export default function Index() {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadProjectData())
    dispatch(loadHistoryData())
    dispatch(loadLogData())
  }, [])

  return (
    <Grid className={classes.root} container component="main">
      <Grid className={classes.controlPanel} item sm={4} xs={12}>
        <ControlPanel/>
      </Grid>
      <Grid className={classes.listPanel} item sm xs={12}>
        <ListPanel/>
      </Grid>
    </Grid>
  )
}
