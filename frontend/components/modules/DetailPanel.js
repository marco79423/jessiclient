import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import classNames from 'classnames'
import {makeStyles} from '@material-ui/core/styles'
import {Paper, Tab, Tabs, TextField, Toolbar} from '@material-ui/core'

import {getMessage} from '../../slices'
import ReactJson from 'react-json-view'
import {TabContext, TabPanel} from '@material-ui/lab'


const useStyles = makeStyles((theme) => ({
  root: {},
  controlBar: {
    height: 64,
  },
  dataSection: {
    padding: 0,
    position: 'relative',
    overflow: 'auto',
    height: 'calc(100vh - 64px)',
  }
}))

export default function RequestPanel({className}) {
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
      <Toolbar className={classes.controlBar}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="純文字" value="plain-text"/>
          <Tab label="JSON" value="json" disabled={jsonData === null}/>
        </Tabs>
      </Toolbar>
      <Paper className={classes.dataSection}>
        <TabContext value={tabValue}>
          <TabPanel value="plain-text">
            <TextField
              variant="outlined"
              margin="normal"
              multiline
              rows={24}
              fullWidth
              autoFocus
              value={message.text}
              InputProps={{
                readOnly: true,
              }}
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
    </div>
  )
}
