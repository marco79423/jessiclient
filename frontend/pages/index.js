import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import {
  AppBar,
  Divider,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab, Tabs,
  Toolbar
} from '@material-ui/core'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://marco79423.net/">兩大類</Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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

function renderRow(props) {
  const {index, style} = props

  return (
    <ListItem button style={style} key={index}>
      <ListItemText primary={`Item ${index + 1}`}/>
    </ListItem>
  )
}

export default function Index() {
  const classes = useStyles()

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <List className={classes.root}>
          <AppBar style={{top: -8}} position="relative">
            <Toolbar>
              <Tabs value={0}>
                <Tab label="訊息" />
                <Tab label="Log" />
              </Tabs>
            </Toolbar>
          </AppBar>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
            </ListItemAvatar>
            <ListItemText
              primary={new Date().toLocaleString()}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Ali Connors
                  </Typography>
                  {' — I\'ll be in your neighborhood doing errands this…'}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li"/>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg"/>
            </ListItemAvatar>
            <ListItemText
              primary={new Date().toLocaleString()}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    to Scott, Alex, Jennifer
                  </Typography>
                  {' — Wish I could come, but I\'m out of town this…'}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li"/>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg"/>
            </ListItemAvatar>
            <ListItemText
              primary={new Date().toLocaleString()}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Sandra Adams
                  </Typography>
                  {' — Do you have Paris recommendations? Have you ever…'}
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Jessiclient
          </Typography>
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
              <Tab label="基本" />
              <Tab label="排程" />
              <Tab label="驗證" />
            </Tabs>
            <Paper style={{padding: 16}}>
              <TextField
                variant="outlined"
                margin="normal"
                multiline
                rows={8}
                fullWidth
                id="email"
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
