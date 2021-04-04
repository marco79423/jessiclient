import React from 'react'
import {Link, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.project.page.main.controlPanel.copyright.textColor,
  },
}))

export default function Copyright() {
  const classes = useStyles()

  return (
    <Typography className={classes.root} variant="body2" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://eng.marco79423.net/">兩大類</Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  )
}
