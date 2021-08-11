import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Paper} from '@material-ui/core'

import {PanelTab} from '../../../../../../../../constants'
import TopControlBar from './TopControlBar'
import RequestBody from './RequestBody'
import BottomControlBar from './BottomControlBar'


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    maxHeight: 500,
    maxWidth: 500,
    padding: theme.spacing(3),
    borderTopLeftRadius: 0,
  },
  topControlBar: {},
  requestBody: {
    marginTop: theme.spacing(1),
  },
  bottomControlBar: {
    marginTop: theme.spacing(4),
  },
}))


export default function TabPanel({mode}) {
  const classes = useStyles()

  return (
    <Grid container className={classes.root} component={Paper} direction="column">
      <Grid item className={classes.topControlBar}>
        <TopControlBar/>
      </Grid>
      <Grid item className={classes.requestBody} xs>
        <RequestBody/>
      </Grid>
      <Grid item className={classes.bottomControlBar}>
        <BottomControlBar mode={mode}/>
      </Grid>
    </Grid>
  )
}

TabPanel.propTypes = {
  mode: PropTypes.oneOf([
    PanelTab.Basic,
    PanelTab.Schedule,
  ])
}
