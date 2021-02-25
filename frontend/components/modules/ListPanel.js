import React from 'react'
import {
  AppBar,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
  Tabs,
  Toolbar,
  Typography
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  root: {

  },
}))

export default function ListPanel() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar>
          <Tabs value={0}>
            <Tab label="訊息"/>
            <Tab label="Log"/>
          </Tabs>
        </Toolbar>
      </AppBar>
      <List>
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
    </div>
  )
}
