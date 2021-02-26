import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import classNames from 'classnames'
import {makeStyles} from '@material-ui/core/styles'
import {Button, Grid, InputBase, Paper} from '@material-ui/core'

import {changeConnectionUrl, selectConnectionUrl} from '../../slices/projectSlice'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))

export default function ConnectionPanel({className}) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const connectionUrl = useSelector(selectConnectionUrl)

  const onConnectionUrlInputChange = (e) => {
    dispatch(changeConnectionUrl(e.target.value))
  }

  console.log('c', connectionUrl)
  return (
    <Grid container component={Paper} className={classNames(classes.root, className)} justify="space-between">
      <Grid item>
        <InputBase
          placeholder="ws://欲連線的網址"
          inputProps={{'aria-label': 'ws://欲連線的網址'}}
          value={connectionUrl}
          onChange={onConnectionUrlInputChange}
        />
      </Grid>
      <Grid item>
        <Button color="primary" aria-label="open">建立連線</Button>
      </Grid>
    </Grid>
  )
}
