import React from 'react'
import PropTypes from 'prop-types'
import {TextField} from '@material-ui/core'

export default function TextArea({className, label, value, onChange}) {
  const onValueChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <TextField
      className={className}
      variant="outlined"
      margin="normal"
      multiline
      rows={16}
      fullWidth
      label={label}
      value={value}
      onChange={onValueChange}
    />
  )
}

TextArea.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}
