import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {AppBar as MuiAppBar, Grid} from '@material-ui/core'

import Logo from './Logo'
import Toolbar from './Toolbar'


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.page.header.background,
    height: 64,
  },
}))

export default function Header() {
  const classes = useStyles()

  return (
    <MuiAppBar className={classes.root} position="relative" elevation={1}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Logo/>
        </Grid>
        <Grid item>
          <Toolbar/>
        </Grid>
      </Grid>
    </MuiAppBar>
  )
}
