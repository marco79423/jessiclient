import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useGA4React} from 'ga-4-react'
import {Grid, TextField} from '@material-ui/core'
import {TabPanel} from '@material-ui/lab'

import generateRandomString from '../../../utils/generateRandomString'
import {ConnectionState, MessageSource} from '../../../constants'
import Button from '../../elements/Button'
import FavoriteRequestsPanel from './FavoriteRequestsPanel'
import wsClient from '../../../features/wsClient'
import {
  getAppliedFavoriteRequest,
  getConnectionState, getMessageCount,
  getRequestText,
  getSettingMaxMessageCount
} from '../../../selectors'
import {addFavoriteRequest, appendMessage, changeRequestText, removeFirstMessage} from '../../../slices/project'
import {clearAppliedFavoriteRequestID, setAppliedFavoriteRequestID} from '../../../slices/current'

export default function BasicTabPanel() {
  const dispatch = useDispatch()
  const ga4React = useGA4React()
  const connectionState = useSelector(getConnectionState)
  const requestText = useSelector(getRequestText)
  const appliedFavoriteRequest = useSelector(getAppliedFavoriteRequest)
  const maxMessageCount = useSelector(getSettingMaxMessageCount)
  const messageCount = useSelector(getMessageCount)
  const [value, setValue] = useState('')
  const [favoriteRequestsPanelOpen, setFavoriteRequestsPanel] = useState(false)

  useEffect(() => {
    setValue(requestText)
  }, [requestText])

  const onRequestTextInputChange = (e) => {
    setValue(e.target.value)
    dispatch(clearAppliedFavoriteRequestID())
  }

  const onAppliedFavoriteRequestButtonClicked = () => {
    if (appliedFavoriteRequest) {
      dispatch(clearAppliedFavoriteRequestID(appliedFavoriteRequest.id))
    } else {
      const favoriteRequest = {
        id: generateRandomString(),
        name: new Date().toLocaleString(),
        text: value,
      }
      dispatch(addFavoriteRequest(favoriteRequest))
      dispatch(setAppliedFavoriteRequestID(favoriteRequest.id))
      ga4React.gtag('event', 'add_favorite_message')
    }
  }

  const onSendButtonClicked = async () => {
    dispatch(changeRequestText(value))
    wsClient.send(value)

    if (messageCount >= maxMessageCount) {
      await dispatch(removeFirstMessage())
    }

    await dispatch(appendMessage({
      id: generateRandomString(),
      time: new Date().toISOString(),
      source: MessageSource.Client,
      text: value,
    }))

    ga4React.gtag('event', 'send_message')
  }

  const showFavoriteRequestsPanel = () => {
    setFavoriteRequestsPanel(true)
    ga4React.gtag('event', 'show_favorite_requests_panel')
  }

  const hideFavoriteRequestsPanel = () => {
    setFavoriteRequestsPanel(false)
  }

  const isConnected = connectionState === ConnectionState.Connected
  return (
    <TabPanel value="basic">
      <Grid container direction="row-reverse">
        <Grid item>
          <Button onClick={showFavoriteRequestsPanel}>展開常用列表</Button>
          <FavoriteRequestsPanel open={favoriteRequestsPanelOpen} onClose={hideFavoriteRequestsPanel}/>
        </Grid>
      </Grid>
      <TextField
        style={{marginTop: 24}}
        variant="outlined"
        margin="normal"
        multiline
        rows={16}
        fullWidth
        label="請求內容"
        autoFocus
        value={value}
        onChange={onRequestTextInputChange}
      />

      <Grid style={{marginTop: 8}} container justify="space-between">
        <Grid item>
          <Button onClick={onAppliedFavoriteRequestButtonClicked}>{appliedFavoriteRequest ? '取消常用' : '設為常用'}</Button>
        </Grid>
        <Grid item>
          <Button primary disabled={!isConnected} onClick={onSendButtonClicked}>送出</Button>
        </Grid>
      </Grid>
    </TabPanel>
  )
}
