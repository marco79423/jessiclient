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

export function LinkButton({large, primary, disabled, children, onClick}) {
  const classes = useStyles({large})

  return (
    <MuiButton
      className={classes.root}
      color={primary ? 'primary' : 'default'}
      disabled={disabled}
      onClick={onClick}>
      {children}
    </MuiButton>
  )
}

LinkButton.propTypes = {
  large: PropTypes.bool,
  primary: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default React.memo(LinkButton)
