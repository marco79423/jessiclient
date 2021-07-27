import React, {useEffect, useState} from 'react'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'
import {InputBase, Paper, Tab, Toolbar} from '@material-ui/core'
import {TabContext, TabList, TabPanel} from '@material-ui/lab'
import CloseIcon from '@material-ui/icons/Close'

import IconButton from '../../../../elements/IconButton'
import JSONView from '../../../../elements/JSONView'


const useStyles = makeStyles((theme) => ({
  root: {},
  appBar: {
    background: theme.project.page.header.background,
    height: 64,
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

export default function DetailPanel({message, onClose}) {
  const classes = useStyles()
  const {t} = useTranslation()
  const [tabValue, setTabValue] = useState(PanelTab.PlainText)

  const [messageJsonData, setMessageJsonData] = useState(null)
  const [messageText, setMessageText] = useState('')

  useEffect(() => {
    if (message) {
      setMessageText(message.body)
    } else {
      setMessageText('')
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

  const onTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const onCloseButtonClick = () => {
    onClose()
  }

  return (
    <div className={classes.root}>
      <div className={classes.appBar}>
        <IconButton description={t('關閉訊息')} icon={CloseIcon} onClick={onCloseButtonClick}/>
      </div>
      <TabContext value={tabValue}>
        <Paper className={classes.dataSection} square>
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
            <JSONView data={messageJsonData}/>
          </TabPanel>
        </Paper>
        <Toolbar className={classes.controlBar}>
          <TabList value={tabValue} onChange={onTabChange}>
            <Tab className={classes.tab} label={t('純文字')} value={PanelTab.PlainText}/>
            <Tab className={classes.tab} label={t('JSON')} value={PanelTab.JSON} disabled={messageJsonData === null}/>
          </TabList>
        </Toolbar>
      </TabContext>
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
