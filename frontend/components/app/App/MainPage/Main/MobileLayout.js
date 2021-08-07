import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Drawer} from '@material-ui/core'
import useWindowSize from '../../../../hooks/useWindowSize'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: theme.project.page.main.background,
  },
  controlPanel: {
    zIndex: 1,
    width: 500,
  },
  listPanel: {},
  detailPanel: {},
  drawerPaper: {
    width: '100%'
  }
}))

export default function MobileLayout({
                                       displayMode,
                                       controlPanel,
                                       listPanel,
                                       detailPanel,
                                     }) {
  const classes = useStyles()

  const [mainHeight, setMainHeight] = useState(0)
  const [_, windowHeight] = useWindowSize()
  useEffect(() => {
    setMainHeight(windowHeight - 64)
  }, [windowHeight])

  return (
    <div className={classes.root} style={{height: mainHeight}}>
      <div className={classes.controlPanel}>
        {controlPanel}
      </div>
      <Drawer
        className={classes.listPanel}
        classes={{paper: classes.drawerPaper}}
        anchor="right"
      >
        {listPanel}}
      </Drawer>
      <Drawer
        className={classes.detailPanel}
        classes={{paper: classes.drawerPaper}}
        anchor="right"
      >
        {detailPanel}
      </Drawer>
    </div>
  )
}
