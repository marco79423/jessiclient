import React from 'react'
import classNames from 'classnames'
import {makeStyles} from '@material-ui/core/styles'
import {Button, Grid, Paper, Tab, Tabs, TextField} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {},
  send: {},
}))

export default function RequestPanel({className}) {
  const classes = useStyles()

  return (
    <div className={classNames(classes.root, className)}>
      <Tabs indicatorColor="primary" style={{marginTop: 48}} value={0}>
        <Tab label="基本"/>
        <Tab label="排程"/>
        <Tab label="驗證"/>
      </Tabs>
      <Paper style={{padding: 16}}>
        <TextField
          variant="outlined"
          margin="normal"
          multiline
          rows={8}
          fullWidth
          label="請求內容"
          name="請求內容"
          autoComplete="請求內容"
          autoFocus
        />

        <Grid container>
          <Grid item xs>

          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.send}>
              送出
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
