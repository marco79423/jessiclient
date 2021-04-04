import React from 'react'
import {Button as MuiButton} from '@material-ui/core'
import PropTypes from 'prop-types'


export default function LinkButton({children, onClick}) {
  return (
    <MuiButton
      variant='text'
      onClick={onClick}>
      {children}
    </MuiButton>
  )
}

LinkButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
}
