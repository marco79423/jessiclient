import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import {TextField} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  root: {
    width: 50,
  },
}))

export default function NumberField({className, value, onChange, disabled, error}) {
  const classes = useStyles()

  const onValueChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <TextField className={`${classes.root} ${className}`}
               inputProps={{min: 0, style: {textAlign: 'center'}}}
               type="number"
               disabled={disabled}
               error={error}
               onChange={onValueChange}
               value={value}/>
  )
}

NumberField.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
}
