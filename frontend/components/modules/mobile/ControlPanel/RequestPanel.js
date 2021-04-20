import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Tab, Tabs} from '@material-ui/core'
import {TabContext, TabPanel} from '@material-ui/lab'
import {useTranslation} from 'next-i18next'
import ScheduleRequestPanel from './ScheduleRequestPanel'
import BasicRequestPanel from './BasicRequestPanel'
import PropTypes from 'prop-types'
import useMobileMode from '../../../hooks/useMobileMode'


const useStyles = makeStyles((theme) => ({
  root: {},
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

const PanelTab = Object.freeze({
  Basic: 'basic',
  Schedule: 'schedule',
})

export default function RequestPanel({
                                       isConnected,

                                       requestBody,
                                       onRequestBodyChange,

                                       favoriteRequestID,
                                       showFavoriteRequestDialog,
                                       onFavoriteRequestSet,
                                       onFavoriteRequestUnset,

                                       scheduleTimeInterval,
                                       onScheduleTimeIntervalChange,

                                       onSendMessage,

                                       scheduleEnabled,
                                       onEnableButtonClick,
                                     }) {
  const mobileMode = useMobileMode()
  const classes = useStyles({mobileMode})
  const {t} = useTranslation('ControlPanel')
  const [tabValue, setTabValue] = useState(PanelTab.Basic)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  if (mobileMode) {
    return (
      <BasicRequestPanel
        isConnected={isConnected}

        favoriteRequestID={favoriteRequestID}
        onShowFavoriteRequestsClick={showFavoriteRequestDialog}
        onFavoriteRequestSet={onFavoriteRequestSet}
        onFavoriteRequestUnset={onFavoriteRequestUnset}

        requestBody={requestBody}
        onRequestBodyChange={onRequestBodyChange}

        onSendButtonClick={onSendMessage}
      />
    )
  }

  return (
    <div className={classes.root}>
      <Tabs indicatorColor="secondary" value={tabValue} onChange={handleTabChange}>
        <Tab className={classes.tab} label={t('基本')} value={PanelTab.Basic}/>
        <Tab className={classes.tab} label={t('排程')} value={PanelTab.Schedule}/>
      </Tabs>
      <TabContext value={tabValue}>
        <TabPanel className={classes.tabPanel} value={PanelTab.Basic}>
          <BasicRequestPanel
            isConnected={isConnected}

            favoriteRequestID={favoriteRequestID}
            onShowFavoriteRequestsClick={showFavoriteRequestDialog}
            onFavoriteRequestSet={onFavoriteRequestSet}
            onFavoriteRequestUnset={onFavoriteRequestUnset}

            requestBody={requestBody}
            onRequestBodyChange={onRequestBodyChange}

            onSendButtonClick={onSendMessage}
          />
        </TabPanel>
        <TabPanel className={classes.tabPanel} value={PanelTab.Schedule}>
          <ScheduleRequestPanel
            isConnected={isConnected}

            favoriteRequestID={favoriteRequestID}
            onShowFavoriteRequestsClick={showFavoriteRequestDialog}
            onFavoriteRequestSet={onFavoriteRequestSet}
            onFavoriteRequestUnset={onFavoriteRequestUnset}

            requestBody={requestBody}
            onRequestBodyChange={onRequestBodyChange}

            scheduleTimeInterval={scheduleTimeInterval}
            onScheduleTimeIntervalChange={onScheduleTimeIntervalChange}

            scheduleEnabled={scheduleEnabled}
            onEnableButtonClick={onEnableButtonClick}
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

  favoriteRequestID: PropTypes.string,
  showFavoriteRequestDialog: PropTypes.func.isRequired,
  onFavoriteRequestSet: PropTypes.func.isRequired,
  onFavoriteRequestUnset: PropTypes.func.isRequired,

  scheduleTimeInterval: PropTypes.number.isRequired,
  onScheduleTimeIntervalChange: PropTypes.func.isRequired,

  onSendMessage: PropTypes.func.isRequired,

  scheduleEnabled: PropTypes.bool.isRequired,
  onEnableButtonClick: PropTypes.func.isRequired,
}
