import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import ControlPanel from './ControlPanel'
import MessagePanel from './MessagePanel'
import {useSelector} from 'react-redux'
import {getMessagePanelOn} from '../../../../../redux/selectors'
import useWindowSize from '../../../../hooks/useWindowSize'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: theme.project.page.main.background,
  },
  controlPanel: {
    flex: 1,
    maxWidth: 500,
  },
  messagePanel: {
    flex: 1,
  }
}))

export default function DefaultLayout({
                                        displayMode,
                                        controlPanel,
                                        listPanel,
                                        detailPanel,
                                      }) {
  const classes = useStyles()
  const [windowWidth, _] = useWindowSize()
  const listPanelOn = useSelector(getMessagePanelOn)

  return (
    <div className={classes.root}>
      {
        windowWidth > 500 ? (
          <>
            <div className={classes.controlPanel}>
              <ControlPanel/>
            </div>
            <div className={classes.messagePanel}>
              <MessagePanel/>
            </div>
          </>
        ) : (
          <>
            {!listPanelOn ? (
              <div className={classes.controlPanel}>
                <ControlPanel/>
              </div>) : (
              <div className={classes.messagePanel}>
                <MessagePanel/>
              </div>
            )}
          </>
        )
      }
      {/*<div className={classes.listPanel}>*/}
      {/*  {listPanel}*/}
      {/*</div>*/}
      {/*<Slide direction="left" in={displayMode === AppWebDisplayMode.DetailPanelOn} mountOnEnter unmountOnExit>*/}
      {/*  <div className={classes.detailPanel}>*/}
      {/*    {detailPanel}*/}
      {/*  </div>*/}
      {/*</Slide>*/}
    </div>
  )
}
