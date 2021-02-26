import React from 'react'
import classNames from 'classnames'
import {makeStyles} from '@material-ui/core/styles'
import {Paper, Tab, Tabs, TextField} from '@material-ui/core'
import {createDraftSafeSelector} from '@reduxjs/toolkit'
import {selectSelectedHistoryID} from '../../slices/currentSlice'
import {selectHistoryFunc, selectHistoryState} from '../../slices/historySlice'
import {useSelector} from 'react-redux'
import {LoadingState} from '../../constants'

const selectHistory = createDraftSafeSelector(
  [
    selectSelectedHistoryID,
    selectHistoryFunc,
  ],
  (selectedID, historyFunc) => historyFunc(selectedID),
)


const useStyles = makeStyles((theme) => ({
  root: {},
}))

export default function RequestPanel({className}) {
  const classes = useStyles()

  const historyID = useSelector(selectSelectedHistoryID)
  const history = useSelector(selectHistory)

  if (historyID === null) {
    return (
      <div className={classNames(classes.root, className)}>
      </div>
    )
  }

  return (
    <div className={classNames(classes.root, className)}>
      <Tabs indicatorColor="primary" style={{marginTop: 48}} value={0}>
        <Tab label="基本"/>
      </Tabs>
      <Paper style={{padding: 16}}>
        <TextField
          variant="outlined"
          margin="normal"
          multiline
          rows={24}
          fullWidth
          autoFocus
          value={history.text}
          InputProps={{
            readOnly: true,
          }}
        />
      </Paper>
    </div>
  )
}
