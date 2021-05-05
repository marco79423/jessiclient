import React from 'react'
import PropTypes from 'prop-types'
import {Snackbar} from '@material-ui/core'
import {Alert as MuiAlert} from '@material-ui/lab'

export default function Alert({message, severity, open, onClose}) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}>
      <MuiAlert onClose={onClose} severity={severity}>
        {message}
      </MuiAlert>
    </Snackbar>
  )
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  severity: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
