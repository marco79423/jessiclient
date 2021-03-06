import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {AppBar as MuiAppBar, Avatar, Grid, IconButton, Toolbar, Typography} from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import SettingsPanel from './SettingsPanel'


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.page.header.background,
  },
  brand: {
    width: 180,
  },
  logo: {
    margin: '3px auto 0',
    width: 45,
    height: 45,
  },
  title: {
    color: theme.project.page.header.titleColor,
  },
  subtitle: {
    color: theme.project.page.header.subtitleColor,
  },
  settingsButton: {
    color: theme.project.page.header.settingsButton,
  }
}))

export default function AppBar() {
  const classes = useStyles()
  const [settingsPanelOpen, setSettingsPanel] = useState(false)

  const showSettingsPanel = () => {
    setSettingsPanel(true)
  }

  const hideSettingsPanel = () => {
    setSettingsPanel(false)
  }

  return (
    <>
      <MuiAppBar className={classes.root} position="relative" elevation={1}>
        <Toolbar>
          <Grid container justify="space-between">
            <Grid className={classes.brand} container item>
              <Grid xs={4} item>
                <Avatar className={classes.logo} src={'/logo.png'}/>
              </Grid>
              <Grid xs={8} item container>
                <Typography className={classes.title} component="h1" variant="h5">Jessiclient</Typography>
                <Typography className={classes.subtitle} component="h2" variant="subtitle2">Websocket Client</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <IconButton className={classes.settingsButton} variant="outlined" onClick={showSettingsPanel}>
                <SettingsIcon fontSize="large"/>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </MuiAppBar>

      <SettingsPanel open={settingsPanelOpen} onClose={hideSettingsPanel}/>
    </>
  )
}
