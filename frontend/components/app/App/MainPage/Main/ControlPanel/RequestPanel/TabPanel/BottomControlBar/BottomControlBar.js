import React from 'react'
import PropTypes from 'prop-types'
import {Grid} from '@material-ui/core'

import {PanelTab} from '../../../../../../../../../constants'
import SetFavoriteRequestButton from './SetFavoriteRequestButton'
import SendRequestButton from './SendRequestButton'
import TimeIntervalInput from './TimeIntervalInput'
import EnableButton from './EnableButton'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
  },
}))


export default function BottomControlBar({mode}) {
  const classes = useStyles()

  return (
    <Grid className={classes.root} container justifyContent="space-between">
      <Grid item>
        <SetFavoriteRequestButton/>
      </Grid>

      {mode === PanelTab.Basic ? (
        <Grid item>
          <SendRequestButton/>
        </Grid>
      ) : null}

      {mode === PanelTab.Schedule ? (
        <Grid item>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs>
              <TimeIntervalInput/>
            </Grid>
            <Grid item>
              <EnableButton/>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  )
}

BottomControlBar.propTypes = {
  mode: PropTypes.oneOf([
    PanelTab.Basic,
    PanelTab.Schedule,
  ])
}
