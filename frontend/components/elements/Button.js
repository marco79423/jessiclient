import React from 'react'
import PropTypes from 'prop-types'
import {Button as MuiButton} from '@material-ui/core'


export default function Button({children, className, primary, disabled, onClick}) {
  return (
    <MuiButton
      className={className}
      color={primary ? 'primary' : 'default'}
      disabled={disabled}
      variant='contained'
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
