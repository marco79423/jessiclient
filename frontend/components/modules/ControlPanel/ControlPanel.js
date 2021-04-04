import React, {useState} from 'react'
import {useGA4React} from 'ga-4-react'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Paper, Tab, Tabs} from '@material-ui/core'
import {TabContext} from '@material-ui/lab'

import ConnectionPanel from './ConnectionPanel'
import BasicTabPanel from './BasicTabPanel'
import ScheduleTabPanel from './ScheduleTabPanel'
import Copyright from './Copyright'


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.page.main.controlPanel.background,
    padding: theme.spacing(2),
    height: '100%',
  },
  connectionPanel: {
    marginTop: theme.spacing(3),
  },
  requestPanel: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  tab: {
    background: theme.project.page.main.controlPanel.requestPanel.tab,
    fontSize: '1rem',
    borderTopLeftRadius: '0.3rem',
    borderTopRightRadius: '0.3rem',

    '&:not(:first-child)': {
      marginLeft: '0.2rem'
    }
  },
  tabPanel: {
    borderTopLeftRadius: 0,
  },
}))


export default function ControlPanel({appController}) {
  const classes = useStyles()
  const ga4React = useGA4React()
  const [tabValue, setTabValue] = useState('basic')

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
    ga4React.gtag('event', 'change_tag', {value: newValue})
  }

  return (
    <Grid className={classes.root}
          container
          direction="column"
          justify="space-between"
          component={Paper}
          elevation={1}
          square>
      <Grid className={classes.connectionPanel} item>
        <ConnectionPanel appController={appController}/>
        <div className={classes.requestPanel}>
          <Tabs indicatorColor="secondary" value={tabValue} onChange={handleTabChange}>
            <Tab className={classes.tab} label="基本" value="basic"/>
            <Tab className={classes.tab} label="排程" value="schedule"/>
          </Tabs>
          <Paper className={classes.tabPanel}>
            <TabContext value={tabValue}>
              <BasicTabPanel appController={appController}/>
              <ScheduleTabPanel appController={appController}/>
            </TabContext>
          </Paper>
        </div>
      </Grid>
      <Grid item>
        <Copyright/>
      </Grid>
    </Grid>
  )
}
