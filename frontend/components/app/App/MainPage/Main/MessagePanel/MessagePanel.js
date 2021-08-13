import React from 'react'
import {useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'

import {selectSelectedMessage} from '../../../../../../redux/selectors'
import useComponentSize from '../../../../../hooks/useComponentSize'
import ListPanel from './ListPanel'
import DetailPanel from './DetailPanel'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  listPanel: {
    flex: 1,
  },
  detailPanel: {
    flex: 1,
  }
}))


export default function MessagePanel() {
  const ref = React.useRef()
  const classes = useStyles()
  const {width, ready} = useComponentSize(ref)

  const message = useSelector(selectSelectedMessage)
  const showDetail = !!message

  return (
    <div ref={ref} className={classes.root}>
      {showDetail ? (
        <>
          {/*顯示詳細模式 (預設)*/}
          {!ready || width > 500 ? (
            <div className={classes.listPanel}>
              <ListPanel/>
            </div>
          ) : null}
          <div className={classes.detailPanel}>
            <DetailPanel/>
          </div>
        </>
      ) : (
        <>
          {/*不顯示詳細模式*/}
          <div className={classes.listPanel}>
            <ListPanel/>
          </div>
        </>
      )}
    </div>
  )
}
