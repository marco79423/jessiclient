import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Grid} from '@material-ui/core'

import CategorySelect from './CategorySelect'
import CategoryControl from './CategoryControl'


const useStyles = makeStyles((theme) => ({
  root: {
  },
}))


export default function ControlBar() {
  const classes = useStyles()

  return (
    <Grid className={classes.root} container spacing={2} alignItems="center">
      <Grid item>
        <CategorySelect/>
      </Grid>
      <Grid item>
        <CategoryControl/>
      </Grid>
    </Grid>
  )
}

ControlBar.propTypes = {}

