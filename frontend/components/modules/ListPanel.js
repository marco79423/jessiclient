import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Tab, Tabs, Toolbar} from '@material-ui/core'
import {TabContext, TabPanel} from '@material-ui/lab'

import HistoryList from './HistoryList'
import LogList from './LogList'


const useStyles = makeStyles((theme) => ({
  root: {

  },
  controlBar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 64,
  },
  dataSection: {
    padding: 0,
    position: 'relative',
    overflow: 'auto',
    height: 'calc(100vh - 64px)',
  }
}))

export default function ListPanel() {
  const classes = useStyles()
  const [tabValue, setTabValue] = useState('history')

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <div className={classes.root}>
      <Toolbar className={classes.controlBar}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="訊息" value="history"/>
          <Tab label="Log" value="log"/>
        </Tabs>
      </Toolbar>
      <TabContext value={tabValue}>
        <TabPanel className={classes.dataSection} value="history">
          <HistoryList/>
        </TabPanel>
        <TabPanel className={classes.dataSection} value="log">
          <LogList/>
        </TabPanel>
      </TabContext>
    </div>
  )
}
