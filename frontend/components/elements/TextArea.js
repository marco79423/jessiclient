import React from 'react'
import PropTypes from 'prop-types'
import {TextField} from '@material-ui/core'

export default function TextArea({className, rows, label, value, onChange}) {
  const onValueChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <TextField
      className={className}
      variant="outlined"
      margin="normal"
      multiline
      rows={rows}
      fullWidth
      label={label}
      value={value}
      onChange={onValueChange}
    />
  )
}

TextArea.propTypes = {
  className: PropTypes.string,
  rows: PropTypes.number.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}
