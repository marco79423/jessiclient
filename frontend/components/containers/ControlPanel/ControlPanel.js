import React, {useState} from 'react'
import {useGA4React} from 'ga-4-react'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Paper, Tab, Tabs} from '@material-ui/core'
import {TabContext, TabPanel} from '@material-ui/lab'

import ConnectionPanelContainer from './ConnectionPanelContainer'
import BasicRequestPanelContainer from './BasicRequestPanelContainer'
import ScheduleRequestPanelContainer from './ScheduleRequestPanelContainer'
import Copyright from '../../modules/ControlPanel/Copyright'
import {useTranslation} from 'next-i18next'


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
    padding: 0,
  },
}))


export default function ControlPanel({appController}) {
  const classes = useStyles()
  const ga4React = useGA4React()
  const {t} = useTranslation('ControlPanel')
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
        <ConnectionPanelContainer appController={appController}/>
        <div className={classes.requestPanel}>
          <Tabs indicatorColor="secondary" value={tabValue} onChange={handleTabChange}>
            <Tab className={classes.tab} label={t('基本')} value="basic"/>
            <Tab className={classes.tab} label={t('排程')} value="schedule"/>
          </Tabs>
          <TabContext value={tabValue}>
            <TabPanel className={classes.tabPanel} value="basic">
              <BasicRequestPanelContainer appController={appController}/>
            </TabPanel>
            <TabPanel className={classes.tabPanel} value="schedule">
              <ScheduleRequestPanelContainer appController={appController}/>
            </TabPanel>
          </TabContext>
        </div>
      </Grid>
      <Grid item>
        <Copyright/>
      </Grid>
    </Grid>
  )
}
