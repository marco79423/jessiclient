import React from 'react'
import PropTypes from 'prop-types'
import {Button as MuiButton} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    textTransform: 'initial',
  }
}))

export default function LinkButton({children, onClick}) {
  const classes = useStyles()

  return (
    <MuiButton
      className={classes.root}
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
