import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, InputBase, Paper} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  root: ({large}) => ({
    paddingLeft: large ? theme.spacing(2) : theme.spacing(1),
    padding: large ? theme.spacing(2) : undefined,
    maxWidth:  500,
  }),
  input: ({large, error}) => ({
    fontSize: large ? '1.3rem' : '1rem',
    width: '100%',
    height: '100%',
    color: error ? theme.project.elements.textField.errorTextColor : undefined
  }),
}))

export default function TextField({className, large, placeholder, multiline, value, onChange, disabled, readOnly, error, action}) {
  const classes = useStyles({large, error})

  const onValueChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <Grid className={`${classes.root} ${className}`} container alignItems="center" component={Paper}>
      <Grid item xs>
        <InputBase
          className={classes.input}
          fullWidth
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          multiline={multiline}
          value={value}
          onChange={onValueChange}
        />
      </Grid>
      {action ? (
        <Grid item>
          {action}
        </Grid>
      ) : null}
    </Grid>
  )
}

TextField.propTypes = {
  className: PropTypes.string,
  large: PropTypes.bool,
  placeholder: PropTypes.string,
  multiline: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  error: PropTypes.bool,
  action: PropTypes.node,
}
