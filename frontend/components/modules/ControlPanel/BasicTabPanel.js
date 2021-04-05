import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useGA4React} from 'ga-4-react'
import {useTranslation} from 'next-i18next'
import {Grid, makeStyles} from '@material-ui/core'
import {TabPanel} from '@material-ui/lab'

import generateRandomString from '../../../utils/generateRandomString'
import {ConnectionState} from '../../../constants'
import {getAppliedFavoriteRequest, getConnectionState, getRequestText} from '../../../selectors'
import {addFavoriteRequest, changeRequestText} from '../../../slices/project'
import {clearAppliedFavoriteRequestID, setAppliedFavoriteRequestID} from '../../../slices/current'
import Button from '../../elements/Button'
import TextArea from '../../elements/TextArea'
import FavoriteRequestsPanel from './FavoriteRequestsPanel'

const useStyles = makeStyles((theme) => ({
  requestBody: {
    marginTop: theme.spacing(3),
  },
}))


export default function BasicTabPanel({appController}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const ga4React = useGA4React()
  const {t} = useTranslation('ControlPanel')
  const connectionState = useSelector(getConnectionState)
  const requestText = useSelector(getRequestText)
  const appliedFavoriteRequest = useSelector(getAppliedFavoriteRequest)
  const [localRequestBody, setLocalRequestBody] = useState('')
  const [favoriteRequestsPanelOpen, setFavoriteRequestsPanel] = useState(false)

  useEffect(() => {
    setLocalRequestBody(requestText)
  }, [requestText])

  const onRequestTextInputChange = (value) => {
    setLocalRequestBody(value)
    dispatch(clearAppliedFavoriteRequestID())
  }

  const onAppliedFavoriteRequestButtonClicked = () => {
    if (appliedFavoriteRequest) {
      dispatch(clearAppliedFavoriteRequestID(appliedFavoriteRequest.id))
    } else {
      const favoriteRequest = {
        id: generateRandomString(),
        name: new Date().toLocaleString(),
        text: localRequestBody,
      }
      dispatch(addFavoriteRequest(favoriteRequest))
      dispatch(setAppliedFavoriteRequestID(favoriteRequest.id))
      ga4React.gtag('event', 'add_favorite_message')
    }
  }

  const onSendButtonClicked = async () => {
    dispatch(changeRequestText(localRequestBody))
    try {
      await appController.sendMessage(localRequestBody)
    } catch (e) {
      console.log(e)
      appController.throwError(t('訊息傳送失敗'))
    }
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
          <Button onClick={showFavoriteRequestsPanel}>{t('展開常用列表')}</Button>
          <FavoriteRequestsPanel
            appController={appController}
            open={favoriteRequestsPanelOpen}
            onClose={hideFavoriteRequestsPanel}
          />
        </Grid>
      </Grid>
      <TextArea
        className={classes.requestBody}
        label={t('請求內容')}
        value={localRequestBody}
        onChange={onRequestTextInputChange}
      />
      <Grid style={{marginTop: 8}} container justify="space-between">
        <Grid item>
          <Button onClick={onAppliedFavoriteRequestButtonClicked}>{appliedFavoriteRequest ? t('取消常用') : t('設為常用')}</Button>
        </Grid>
        <Grid item>
          <Button primary disabled={!isConnected} onClick={onSendButtonClicked}>{t('送出')}</Button>
        </Grid>
      </Grid>
    </TabPanel>
  )
}
