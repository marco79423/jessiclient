import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {AppBar as MuiAppBar, Avatar, Grid, IconButton, Toolbar, Tooltip, Typography} from '@material-ui/core'
import ArchiveIcon from '@material-ui/icons/Archive'
import UnarchiveIcon from '@material-ui/icons/Unarchive'
import SettingsIcon from '@material-ui/icons/Settings'
import ShareIcon from '@material-ui/icons/Share'

import SettingsPanel from './SettingsPanel'
import {useDispatch} from 'react-redux'
import {exportProject, importProject} from '../../slices'


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
  },
  icon: {
    fontSize: '2rem',
  }
}))

export default function AppBar() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [settingsPanelOpen, setSettingsPanel] = useState(false)

  const onExportClicked = () => {
    dispatch(exportProject())
  }

  const onImportClicked = () => {
    dispatch(importProject())
  }

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
            <Grid className={classes.brand} container item alignItems="center">
              <Grid xs={4} item>
                <Avatar className={classes.logo} variant="square" src={'/favicon.ico'}/>
              </Grid>
              <Grid xs={8} item container>
                <Typography className={classes.title} component="h1" variant="h5">Jessiclient</Typography>
                <Typography className={classes.subtitle} component="h2" variant="subtitle2">Websocket
                  Client</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Tooltip title="分享">
                <IconButton style={{visibility: 'hidden'}} className={classes.settingsButton}
                            onClick={showSettingsPanel}>
                  <ShareIcon className={classes.icon}/>
                </IconButton>
              </Tooltip>
              <Tooltip title="匯出專案">
                <IconButton className={classes.settingsButton} onClick={onExportClicked}>
                  <ArchiveIcon className={classes.icon}/>
                </IconButton>
              </Tooltip>
              <Tooltip title="匯入專案">
                <IconButton className={classes.settingsButton} onClick={onImportClicked}>
                  <UnarchiveIcon className={classes.icon}/>
                </IconButton>
              </Tooltip>
              <IconButton className={classes.settingsButton} onClick={showSettingsPanel}>
                <SettingsIcon className={classes.icon}/>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </MuiAppBar>

      <SettingsPanel open={settingsPanelOpen} onClose={hideSettingsPanel}/>
    </>
  )
}
