import React from 'react'
import PropTypes from 'prop-types'
import {Button as MuiButton} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    textTransform: 'initial',
  }
}))

function Button({children, className, primary, disabled, onClick}) {
  const classes = useStyles()

  return (
    <MuiButton
      className={`${classes.root} ${className}`}
      color={primary ? 'primary' : 'default'}
      disabled={disabled}
      variant="contained"
      onClick={onClick}>
      {children}
    </MuiButton>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  primary: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

export default React.memo(Button)
