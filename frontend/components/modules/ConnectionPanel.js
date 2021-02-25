import React from 'react'
import classNames from 'classnames'
import {makeStyles} from '@material-ui/core/styles'
import {Button, Grid, InputBase, Paper} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))

export default function ConnectionPanel({className}) {
  const classes = useStyles()

  return (
    <Grid container component={Paper} className={classNames(classes.root, className)} justify="space-between">
      <Grid item>
        <InputBase
          placeholder="ws://欲連線的網址"
          inputProps={{'aria-label': 'ws://欲連線的網址'}}
        />
      </Grid>
      <Grid item>
        <Button color="primary" aria-label="open">建立連線</Button>
      </Grid>
    </Grid>
  )
}
