import React from 'react'
import {Grid} from '@material-ui/core'

import SetFavoriteRequestButton from '../../BasicTabPanel/Control/SetFavoriteRequestButton'
import TimeIntervalInput from './TimeIntervalInput'
import EnableButton from './EnableButton'


export default function Control() {
  return (
    <Grid container justify="space-between">
      <Grid item>
        <SetFavoriteRequestButton/>
      </Grid>
      <Grid item>
        <Grid container alignItems="center" spacing={3}>
          <Grid item>
            <TimeIntervalInput/>
          </Grid>
          <Grid item>
            <EnableButton/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

Control.propTypes = {}
