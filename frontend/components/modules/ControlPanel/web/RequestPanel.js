import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'
import {Tab} from '@material-ui/core'
import {TabContext, TabList, TabPanel} from '@material-ui/lab'

import ScheduleRequestPanel from './ScheduleRequestPanel'
import BasicRequestPanel from './BasicRequestPanel'


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

export default function RequestPanel({
                                       isConnected,

                                       requestBody,
                                       onRequestBodyChange,
                                       onSendRequest,

                                       scheduleTimeInterval,
                                       onScheduleTimeIntervalChange,
                                       scheduleEnabled,
                                       onEnableSchedule,

                                       favoriteRequestCategories,
                                       favoriteRequestID,
                                       onShowFavoriteRequestDialog,
                                       onAddFavoriteRequest,
                                       onRemoveFavoriteRequest,
                                     }) {
  const classes = useStyles()
  const {t} = useTranslation()
  const [tabValue, setTabValue] = useState(PanelTab.Basic)

  const onTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <div className={classes.root}>
      <TabContext value={tabValue}>
        <TabList indicatorColor="secondary" aria-label={t('請求控制區')} value={tabValue} onChange={onTabChange}>
          <Tab className={classes.tab} label={t('基本')} value={PanelTab.Basic}/>
          <Tab className={classes.tab} label={t('排程')} value={PanelTab.Schedule}/>
        </TabList>

        <TabPanel className={classes.tabPanel} value={PanelTab.Basic}>
          <BasicRequestPanel
            isConnected={isConnected}

            requestBody={requestBody}
            onRequestBodyChange={onRequestBodyChange}
            onSendRequest={onSendRequest}

            favoriteRequestCategories={favoriteRequestCategories}
            favoriteRequestID={favoriteRequestID}

            onShowFavoriteRequestDialog={onShowFavoriteRequestDialog}
            onAddFavoriteRequest={onAddFavoriteRequest}
            onRemoveFavoriteRequest={onRemoveFavoriteRequest}
          />
        </TabPanel>
        <TabPanel className={classes.tabPanel} value={PanelTab.Schedule}>
          <ScheduleRequestPanel
            isConnected={isConnected}

            requestBody={requestBody}
            onRequestBodyChange={onRequestBodyChange}

            scheduleTimeInterval={scheduleTimeInterval}
            onScheduleTimeIntervalChange={onScheduleTimeIntervalChange}

            scheduleEnabled={scheduleEnabled}
            onEnableSchedule={onEnableSchedule}

            favoriteRequestCategories={favoriteRequestCategories}
            favoriteRequestID={favoriteRequestID}
            onShowFavoriteRequestDialog={onShowFavoriteRequestDialog}
            onAddFavoriteRequest={onAddFavoriteRequest}
            onRemoveFavoriteRequest={onRemoveFavoriteRequest}
          />
        </TabPanel>
      </TabContext>
    </div>
  )
}

RequestPanel.propTypes = {
  isConnected: PropTypes.bool.isRequired,

  requestBody: PropTypes.string.isRequired,
  onRequestBodyChange: PropTypes.func.isRequired,
  onSendRequest: PropTypes.func.isRequired,

  scheduleTimeInterval: PropTypes.number.isRequired,
  onScheduleTimeIntervalChange: PropTypes.func.isRequired,
  scheduleEnabled: PropTypes.bool.isRequired,
  onEnableSchedule: PropTypes.func.isRequired,

  favoriteRequestCategories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  favoriteRequestID: PropTypes.string,
  onShowFavoriteRequestDialog: PropTypes.func.isRequired,
  onAddFavoriteRequest: PropTypes.func.isRequired,
  onRemoveFavoriteRequest: PropTypes.func.isRequired,
}
