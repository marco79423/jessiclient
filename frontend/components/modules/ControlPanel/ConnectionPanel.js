import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'

import {ConnectionState} from '../../../constants'
import {getConnectionState, getConnectionUrl} from '../../../selectors'
import {changeConnectionUrl} from '../../../slices/project'
import LinkButton from '../../elements/LinkButton'
import TextField from '../../elements/TextField'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
  },
}))

export default function ConnectionPanel({appController}) {
  const classes = useStyles()
  const {t} = useTranslation('ControlPanel')
  const connectionState = useSelector(getConnectionState)
  const connectionUrl = useSelector(getConnectionUrl)
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(connectionUrl)
  }, [connectionUrl])

  const onChange = (value) => {
    setUrl(value)
  }

  return (
    <TextField
      className={classes.root}
      large
      placeholder={t('欲連線的網址')}
      value={url}
      onChange={onChange}
      disabled={connectionState !== ConnectionState.Idle}
      action={
        <ConnectButton url={url} appController={appController}/>
      }
    />
  )
}

ConnectionPanel.propTypes = {
  appController: PropTypes.object.isRequired,
}


function ConnectButton({url, appController}) {
  const dispatch = useDispatch()
  const {t} = useTranslation('ControlPanel')
  const connectionState = useSelector(getConnectionState)
  const [buttonLabel, setButtonLabel] = useState('')

  useEffect(() => {
    switch (connectionState) {
      case ConnectionState.Idle:
        setButtonLabel(t('建立連線'))
        return
      case ConnectionState.Connecting:
        setButtonLabel(t('連線中…'))
        return
      case ConnectionState.Connected:
        setButtonLabel(t('關閉連線'))
        return
      case ConnectionState.Closing:
        setButtonLabel(t('關閉中…'))
        return
    }
  }, [connectionState])

  const onButtonClicked = async () => {
    switch (connectionState) {
      case ConnectionState.Idle:
        await dispatch(changeConnectionUrl(url))
        await appController.connect(url)
        return
      case ConnectionState.Connected:
        await appController.disconnect()
        return
    }
  }

  return (
    <LinkButton
      primary
      large
      disabled={connectionState === ConnectionState.Connecting || connectionState === ConnectionState.Closing}
      onClick={onButtonClicked}
    >{buttonLabel}</LinkButton>
  )
}
