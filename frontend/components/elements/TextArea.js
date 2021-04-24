import React from 'react'
import PropTypes from 'prop-types'
import {TextField} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    '& .MuiInputBase-root': {
      height: "100%",
      display: "flex",
      alignItems: "start"
    },
  },
}))

export default function TextArea({label, value, onChange}) {
  const classes = useStyles()

  const onValueChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <TextField
      className={classes.root}
      variant="outlined"
      margin="normal"
      multiline
      fullWidth
      label={label}
      value={value}
      onChange={onValueChange}
    />
  )
}

TextArea.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}
