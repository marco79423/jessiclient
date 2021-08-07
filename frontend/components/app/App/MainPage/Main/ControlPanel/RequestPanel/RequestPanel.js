import React, {useState} from 'react'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'
import {TabContext, TabList, TabPanel} from '@material-ui/lab'
import {Tab} from '@material-ui/core'

import BasicTabPanel from './BasicTabPanel/BasicTabPanel'
import ScheduleTabPanel from './ScheculeTabPanel'
import useWindowSize from '../../../../../../hooks/useWindowSize'


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
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
    height: '100%',
  },
}))

const PanelTab = Object.freeze({
  Basic: 'basic',
  Schedule: 'schedule',
})

export default function RequestPanel() {
  const classes = useStyles()
  const {t} = useTranslation()
  const [_, windowHeight] = useWindowSize()

  const [tabValue, setTabValue] = useState(PanelTab.Basic)

  const onTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <div className={classes.root}>
      <TabContext value={tabValue}>
        {windowHeight > 800 ? (
        <TabList indicatorColor="secondary" aria-label={t('請求控制區')} value={tabValue} onChange={onTabChange}>
          <Tab className={classes.tab} label={t('基本')} value={PanelTab.Basic}/>
          <Tab className={classes.tab} label={t('排程')} value={PanelTab.Schedule}/>
        </TabList>
        ) : null}

        {/* Basic */}
        <TabPanel className={classes.tabPanel} value={PanelTab.Basic}>
          <BasicTabPanel/>
        </TabPanel>

        {/* Schedule */}
        <TabPanel className={classes.tabPanel} value={PanelTab.Schedule}>
          <ScheduleTabPanel/>
        </TabPanel>
      </TabContext>
    </div>
  )
}

RequestPanel.propTypes = {}
