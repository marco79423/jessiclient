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
    <Grid container component="main" className={classes.root}>
      <Grid className={classes.controlPanel} item xs={12} sm={8} md={5}>
        <ControlPanel/>
      </Grid>
      <Grid className={classes.listPanel} item xs={false} sm={4} md={7}>
        <ListPanel/>
      </Grid>
    </Grid>
  )
}
