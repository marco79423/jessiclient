import React from 'react'
import {Button as MuiButton} from '@material-ui/core'


export default function Button({children, className, primary, disabled, onClick}) {
  return (
    <MuiButton
      className={className}
      color={primary ? 'primary' : 'default'}
      disabled={disabled}
      variant="contained"
      onClick={onClick}>
      {children}
    </MuiButton>
  )
}
