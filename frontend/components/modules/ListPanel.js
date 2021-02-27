import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {AppBar, Tab, Tabs, Toolbar} from '@material-ui/core'
import {TabContext, TabPanel} from '@material-ui/lab'

import HistoryList from './HistoryList'
import LogList from './LogList'


const useStyles = makeStyles((theme) => ({
  root: {},
}))

export default function ListPanel() {
  const classes = useStyles()
  const [tabValue, setTabValue] = useState('history')

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}>
            <Tab label="訊息" value="history"/>
            <Tab label="Log" value="log"/>
          </Tabs>
        </Toolbar>
      </AppBar>
      <TabContext value={tabValue}>
        <TabPanel value="history">
          <HistoryList/>
        </TabPanel>
        <TabPanel value="log">
          <LogList/>
        </TabPanel>
      </TabContext>
    </div>
  )
}
