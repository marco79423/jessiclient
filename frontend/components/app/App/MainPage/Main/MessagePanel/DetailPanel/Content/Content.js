import React from 'react'
import {useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {InputBase} from '@material-ui/core'

import {DetailMode} from '../../../../../../../../constants'
import {selectSelectedMessage} from '../../../../../../../../redux/selectors'
import JSONView from '../../../../../../../elements/JSONView'


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    position: 'relative',
    overflow: 'auto',
    height: '100%',
  },
}))


export default function Content({detailMode}) {
  const classes = useStyles()
  const message = useSelector(selectSelectedMessage)

  return (
    <div className={classes.root}>
      {detailMode === DetailMode.PlainText ? (
        <InputBase
          autoFocus
          readOnly
          fullWidth
          multiline
          value={message ? message.body : ''}
        />
      ) : null}

      {detailMode === DetailMode.JSON && isJSONShowable(message.body) ? (
        <JSONView data={JSON.parse(message.body)}/>
      ) : null}
    </div>
  )
}

export const isJSONShowable = (value) => {
  try {
    const jsonData = JSON.parse(value)
    return typeof jsonData === 'object' && jsonData !== null
  } catch {
    return false
  }
}
