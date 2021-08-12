import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Link, Typography} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  root: {
    margin: '16px auto 0',
    color: theme.project.page.main.controlPanel.copyright.textColor,
  }
}))

function Copyright() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="body2" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://marco79423.net/">兩大類</Link>{' '}
        {new Date().getFullYear()}
      </Typography>
    </div>
  )
}

Copyright.propTypes = {}

export default React.memo(Copyright)
