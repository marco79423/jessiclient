import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'
import {TabContext, TabList, TabPanel} from '@material-ui/lab'
import {Grid, InputBase, Paper, Tab} from '@material-ui/core'

import {setSelectedMessageID} from '../../../../../../../redux/current'
import {getMessage} from '../../../../../../../redux/selectors'
import JSONView from '../../../../../../elements/JSONView'
import Button from '../../../../../../elements/Button'
import useWindowSize from '../../../../../../hooks/useWindowSize'


const useStyles = makeStyles((theme) => ({
  root: {},
  controlBar: {
    background: theme.project.page.main.detailPanel.appBar.background,
    height: 64,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  toolbar: {
    height: 64,
  },
  tab: {
    minWidth: 120, // 覆蓋預設
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


export default function DetailPanel() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {t} = useTranslation()
  const [windowWidth] = useWindowSize()

  const message = useSelector(getMessage)

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
    dispatch(setSelectedMessageID(null))
  }

  return (
    <div className={classes.root}>
      <TabContext value={tabValue}>
        <Paper className={classes.dataSection} square>
          <Grid className={classes.controlBar} container justify="space-between" alignItems="flex-end">
            <Grid item>
              {windowWidth >= 1300 ? (
                <TabList value={tabValue} onChange={onTabChange}>
                <Tab className={classes.tab} label={t('純文字')} value={PanelTab.PlainText}/>
                <Tab className={classes.tab} label={t('JSON')} value={PanelTab.JSON}
                     disabled={messageJsonData === null}/>
              </TabList>
              ) : null}
            </Grid>
            <Grid item>
              <Grid className={classes.toolbar} container alignItems="center">
                <Grid item>
                  <Button onClick={onCloseButtonClick}>{t('關閉詳細訊息')}</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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
