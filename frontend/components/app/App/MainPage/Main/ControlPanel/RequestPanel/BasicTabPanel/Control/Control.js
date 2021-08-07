import React from 'react'
import {Grid} from '@material-ui/core'

import SetFavoriteRequestButton from './SetFavoriteRequestButton'
import SendRequestButton from './SendRequestButton'


export default function Control() {
  return (
    <Grid container justify="space-between">
      <Grid item>
        <SetFavoriteRequestButton/>
      </Grid>
      <Grid item>
        <SendRequestButton/>
      </Grid>
    </Grid>
  )
}

Control.propTypes = {}
