import React from 'react'
import PropTypes from 'prop-types'
import {Button as MuiButton} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: ({large}) => ({
    fontSize: large ? '1.1rem' : '0.9rem',
    textTransform: 'initial',
  }),
}))

export default function LinkButton({large, primary, children, onClick}) {
  const classes = useStyles({large})

  return (
    <MuiButton
      className={classes.root}
      color={primary ? 'primary' : 'default'}
      onClick={onClick}>
      {children}
    </MuiButton>
  )
}

LinkButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
}
