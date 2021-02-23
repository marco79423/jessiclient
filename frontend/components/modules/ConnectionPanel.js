import React from 'react'
import InputBase from '@material-ui/core/InputBase'
import {Grid, InputAdornment} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  urlInput: {
  },
  connectButton: {
    padding: 10,
  },
}))

export default function ConnectionPanel() {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.urlInput}
        placeholder="欲連線的網址"
        inputProps={{'aria-label': '欲連線的網址'}}
        startAdornment={<InputAdornment position="start">ws://</InputAdornment>}
      />
      <Grid container>
        <Grid xs></Grid>
        <Grid>
          <Button color="primary" className={classes.connectButton} aria-label="open">建立連線</Button>
        </Grid>
      </Grid>
    </Paper>
  )
}
