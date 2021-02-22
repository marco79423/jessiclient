import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import {InputAdornment, Tab, Tabs} from '@material-ui/core'

import Copyright from '../components/elements/Copyright'
import Logo from '../components/elements/Logo'
import MainPanel from '../components/modules/MainPanel'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  mainPanel: {

  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  // connect
  connectForm: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}))

export default function Index() {
  const classes = useStyles()

  return (
    <Grid container component="main" className={classes.root}>
      <Grid className={classes.mainPanel} item xs={false} sm={4} md={7}>
        <MainPanel/>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Logo/>
          <form className={classes.form} noValidate>
            <Paper style={{marginTop: 32}} className={classes.connectForm}>
              <InputBase
                startAdornment={<InputAdornment position="start">ws://</InputAdornment>}
                className={classes.input}
                placeholder="欲連線的網址"
                inputProps={{'aria-label': '欲連線的網址'}}
              />
              <Button color="primary" className={classes.iconButton} aria-label="open">建立連線</Button>
            </Paper>

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
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    送出
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            <Box mt={5}>
              <Copyright/>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}
