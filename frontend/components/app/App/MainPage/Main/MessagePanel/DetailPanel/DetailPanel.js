import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {DetailMode} from '../../../../../../../constants'
import ControlBar from './ControlBar/ControlBar'
import Content from './Content'


const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    position: 'relative',
    overflow: 'auto',
    height: 'calc(100vh - 64px)',
  },
  controlBar: {
    height: 64,
  },
  content: {
    height: 'calc(100% - 64px)'
  }
}))


export default function DetailPanel() {
  const classes = useStyles()
  const [currentDetailMode, setCurrentDetailMode] = React.useState(DetailMode.PlainText)

  return (
    <div className={classes.root}>
      <div className={classes.controlBar}>
        <ControlBar
          currentDetailMode={currentDetailMode}
          setCurrentDetailMode={setCurrentDetailMode}
        />
      </div>
      <div className={classes.content}>
        <Content
          detailMode={currentDetailMode}
        />
      </div>
    </div>
  )
}
