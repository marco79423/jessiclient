import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Grid} from '@material-ui/core'

import useMobileMode from '../../../../../../../hooks/useMobileMode'
import useComponentSize from '../../../../../../../hooks/useComponentSize'
import ClearAllButton from './ClearAllButton'
import MessageSearch from './MessageSearch'
import CloseMessagePanelButton from './CloseMessagePanelButton'


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.page.main.listPanel.controlBar.background,
    height: 64,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}))


export default function ControlBar() {
  const ref = React.useRef()
  const classes = useStyles()
  const mobileMode = useMobileMode()
  const {width} = useComponentSize(ref)

  return (
    <Grid ref={ref} className={classes.root} container justifyContent="space-between" alignItems="center">
      {mobileMode ? (
        <Grid item>
          <CloseMessagePanelButton/>
        </Grid>
      ) : null}
      <Grid item xs>
        {!mobileMode && width >= 400 ? (
          <MessageSearch/>
        ) : null}
      </Grid>
      <Grid item>
        <ClearAllButton/>
      </Grid>
    </Grid>
  )
}

ControlBar.propTypes = {}
