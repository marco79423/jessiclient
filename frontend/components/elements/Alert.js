import React from 'react'
import {Snackbar} from '@material-ui/core'
import {Alert as MuiAlert} from '@material-ui/lab'

export default function Alert({message, open, onClose}) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}>
      <MuiAlert onClose={onClose} severity="error">
        {message}
      </MuiAlert>
    </Snackbar>
  )
}
