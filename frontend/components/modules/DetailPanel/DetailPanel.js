import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import classNames from 'classnames'
import {makeStyles} from '@material-ui/core/styles'
import {InputBase, Paper, Tab, Tabs, Toolbar} from '@material-ui/core'

import {getMessage} from '../../../slices'
import ReactJson from 'react-json-view'
import {TabContext, TabPanel} from '@material-ui/lab'


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.page.main.detailPanel.controlBar.background,
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

export default function DetailPanel({className}) {
  const classes = useStyles()
  const [tabValue, setTabValue] = useState('plain-text')
  const [jsonData, setJsonData] = useState(null)

  const message = useSelector(getMessage)

  useEffect(() => {
    try {
      setJsonData(JSON.parse(message.text))
      setTabValue('json')
    } catch (_) {
      setJsonData(null)
      setTabValue('plain-text')
    }
  }, [message])


  if (!message) {
    return (
      <div className={classNames(classes.root, className)}>
      </div>
    )
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <div className={classNames(classes.root, className)}>

      <Paper className={classes.dataSection} square>
        <TabContext value={tabValue}>
          <TabPanel value="plain-text">
            <InputBase
              autoFocus
              readOnly
              fullWidth
              multiline
              value={message.text}
            />
          </TabPanel>
          <TabPanel value="json">
            <ReactJson
              src={jsonData}
              indentWidth={2}
            />
          </TabPanel>
        </TabContext>
      </Paper>
      <Toolbar className={classes.controlBar}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab className={classes.tab} label="純文字" value="plain-text"/>
          <Tab className={classes.tab} label="JSON" value="json" disabled={jsonData === null}/>
        </Tabs>
      </Toolbar>
    </div>
  )
}
