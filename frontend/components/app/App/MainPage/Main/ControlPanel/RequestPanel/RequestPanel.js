import React, {useState} from 'react'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'
import {TabContext, TabList, TabPanel as MuiTabPanel} from '@material-ui/lab'
import {Tab} from '@material-ui/core'

import {PanelTab} from '../../../../../../../constants'
import useWindowSize from '../../../../../../hooks/useWindowSize'
import TabPanel from './TabPanel'


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    maxWidth: 500,
  },
  tabs: {},
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


export default function RequestPanel() {
  const classes = useStyles()
  const {t} = useTranslation()
  const {height} = useWindowSize()

  const [tabValue, setTabValue] = useState(PanelTab.Basic)

  const onTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <div className={classes.root}>
      <TabContext value={tabValue}>
        {height > 800 ? (
          <TabList className={classes.tabs} aria-label={t('請求控制區')} value={tabValue} onChange={onTabChange}>
            <Tab className={classes.tab} label={t('基本')} value={PanelTab.Basic}/>
            <Tab className={classes.tab} label={t('排程')} value={PanelTab.Schedule}/>
          </TabList>
        ) : null}

        {/* Basic */}
        <MuiTabPanel className={classes.tabPanel} value={PanelTab.Basic}>
          <TabPanel mode={PanelTab.Basic}/>
        </MuiTabPanel>

        {/* Schedule */}
        <MuiTabPanel className={classes.tabPanel} value={PanelTab.Schedule}>
          <TabPanel mode={PanelTab.Schedule}/>
        </MuiTabPanel>
      </TabContext>
    </div>
  )
}

RequestPanel.propTypes = {}
