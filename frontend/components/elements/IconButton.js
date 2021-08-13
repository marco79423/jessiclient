import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import {IconButton as MuiIconButton, Tooltip} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.project.elements.iconButton.color,
  },
  icon: {
    fontSize: '2rem',
  }
}))

function IconButton({description, icon: Icon, onClick}) {
  const classes = useStyles()

  return (
    <Tooltip title={description}>
      <MuiIconButton className={classes.root} onClick={onClick}>
        <Icon className={classes.icon}/>
      </MuiIconButton>
    </Tooltip>
  )
}

IconButton.propTypes = {
  description: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default React.memo(IconButton)
