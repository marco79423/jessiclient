import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {IconButton as MuiIconButton, Tooltip} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.project.basic.iconButton.color,
  },
  icon: {
    fontSize: '2rem',
  }
}))

export default function IconButton({description, icon: Icon, onClick}) {
  const classes = useStyles()

  return (
    <Tooltip title={description}>
      <MuiIconButton className={classes.root} onClick={onClick}>
        <Icon className={classes.icon}/>
      </MuiIconButton>
    </Tooltip>
  )
}

