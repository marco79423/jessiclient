import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Switch as MuiSwitch, Typography} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {},
  colorPrimary: {
    color: theme.project.elements.switch.color,
  }
}))


export default function Switch({checked, setChecked, label}) {
  const classes = useStyles()

  const onCheckedChange = (e) => {
    setChecked(e.target.checked)
  }

  return (
    <Grid container alignItems="center">
      <Grid item>
        <MuiSwitch color="primary" classes={{colorPrimary: classes.colorPrimary}} checked={checked} onChange={onCheckedChange}/>
      </Grid>
      <Grid item>
        <Typography>{label}</Typography>
      </Grid>
    </Grid>
  )
}
