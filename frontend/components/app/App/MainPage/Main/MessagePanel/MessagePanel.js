import React from 'react'
import {useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'

import {getMessage} from '../../../../../../redux/selectors'
import useWindowSize from '../../../../../hooks/useWindowSize'
import ListPanel from './ListPanel'
import DetailPanel from './DetailPanel'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  listPanel: {
    flex: 1,
  },
  detailPanel: {
    flex: 1,
  }
}))


export default function MessagePanel() {
  const [windowWidth] = useWindowSize()

  const classes = useStyles()
  const message = useSelector(getMessage)

  return (
    <div className={classes.root}>
      {(!message) || (message && windowWidth > 1000) ? (
        <div className={classes.listPanel}>
          <ListPanel/>
        </div>
      ) : null}

      {message ? (
        <div className={classes.detailPanel}>
          <DetailPanel/>
        </div>
      ) : null}
    </div>
  )
}
