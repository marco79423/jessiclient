import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, InputBase, Paper} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(1),
    width: 300,
  },
}))

export default function TextField({placeholder, value, onChange, disabled}) {
  const classes = useStyles()

  const onValueChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <Grid className={classes.root} container alignItems="center" component={Paper}>
      <Grid item xs>
        <InputBase fullWidth disabled={disabled} placeholder={placeholder} value={value} onChange={onValueChange}/>
      </Grid>
    </Grid>
  )
}
