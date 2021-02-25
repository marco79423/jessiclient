import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'

import {initializeData} from '../slices/currentSlice'
import ListPanel from '../components/modules/ListPanel'
import ControlPanel from '../components/modules/ControlPanel'


const useStyles = makeStyles((theme) => ({
  root: {},
  controlPanel: {},
  listPanel: {},
}))

export default function Index() {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeData())
  }, [])

  return (
    <Grid className={classes.root} container component="main" >
      <Grid className={classes.controlPanel} item sm={4} xs={12}>
        <ControlPanel/>
      </Grid>
      <Grid className={classes.listPanel} item sm={8} xs={12}>
        <ListPanel/>
      </Grid>
    </Grid>
  )
}
