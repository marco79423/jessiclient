import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'

import {MenuItem, Paper, TextField} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block',
  },
}))


export default function Select({className, currentValue, selections, onSelectionChange}) {
  const classes = useStyles()

  const onChange = (event) => {
    onSelectionChange(event.target.value)
  }

  return (
    <Paper className={`${classes.root} ${className}`}>
      <TextField size="small" select value={currentValue} variant="outlined" onChange={onChange}>
        {selections.map(selection => (
          <MenuItem
            key={selection.key}
            disabled={selection.disabled}
            value={selection.value}>{selection.label}</MenuItem>
        ))}
      </TextField>
    </Paper>
  )
}

Select.propTypes = {
  className: PropTypes.string,
  currentValue: PropTypes.any.isRequired,
  selections: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    disabled: PropTypes.bool,
  })).isRequired,
  onSelectionChange: PropTypes.func.isRequired,
}
