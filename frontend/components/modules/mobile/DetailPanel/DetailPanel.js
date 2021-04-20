import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {InputBase, Paper, Tab, Tabs, Toolbar} from '@material-ui/core'
import {TabContext, TabPanel} from '@material-ui/lab'
import ReactJson from 'react-json-view'
import {useTranslation} from 'next-i18next'
import Button from '../../../elements/Button'
import {AppMobileDisplayMode} from '../../../../constants'


const useStyles = makeStyles((theme) => ({
  root: {
  },
  controlBar: {
    position: 'fixed',
    bottom: 0,
    alignItems: 'flex-end',
  },
  tab: {
    background: theme.project.page.main.detailPanel.controlBar.tab,
    borderTopLeftRadius: '0.3rem',
    borderTopRightRadius: '0.3rem',

    '&:not(:first-child)': {
      marginLeft: '0.2rem'
    }
  },
  dataSection: {
    padding: 0,
    position: 'relative',
    overflow: 'auto',
    height: 'calc(100vh - 64px)',
  }
}))

const PanelTab = Object.freeze({
  PlainText: 'plain-text',
  JSON: 'json',
})

export default function DetailPanel({message, setDisplayMode}) {
  const classes = useStyles()
  const {t} = useTranslation('DetailPanel')
  const [tabValue, setTabValue] = useState(PanelTab.PlainText)

  const [messageJsonData, setMessageJsonData] = useState(null)
  const [messageText, setMessageText] = useState('')

  useEffect(() => {
    if (message) {
      setMessageText(message.body)
    }
  }, [message])

  useEffect(() => {
    if (isJSONShowable(messageText)) {
      setMessageJsonData(JSON.parse(messageText))
      setTabValue(PanelTab.JSON)
    } else {
      setMessageJsonData(null)
      setTabValue(PanelTab.PlainText)
    }
  }, [messageText])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <div className={classes.root}>
      <div>
        <Button onClick={() => setDisplayMode(AppMobileDisplayMode.ListPanel)}>切換</Button>
      </div>
      <Paper className={classes.dataSection} square>
        <TabContext value={tabValue}>
          <TabPanel value={PanelTab.PlainText}>
            <InputBase
              autoFocus
              readOnly
              fullWidth
              multiline
              value={messageText}
            />
          </TabPanel>
          <TabPanel value={PanelTab.JSON}>
            <ReactJson src={messageJsonData} indentWidth={2}/>
          </TabPanel>
        </TabContext>
      </Paper>
      <Toolbar className={classes.controlBar}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab className={classes.tab} label={t('純文字')} value={PanelTab.PlainText}/>
          <Tab className={classes.tab} label={t('JSON')} value={PanelTab.JSON} disabled={messageJsonData === null}/>
        </Tabs>
      </Toolbar>
    </div>
  )
}

const isJSONShowable = (value) => {
  try {
    const jsonData = JSON.parse(value)
    return typeof jsonData === 'object' && jsonData !== null
  } catch {
    return false
  }
}
