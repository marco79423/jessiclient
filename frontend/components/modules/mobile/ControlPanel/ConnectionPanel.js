import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'

import LinkButton from '../../../elements/LinkButton'
import TextField from '../../../elements/TextField'
import {ConnectionState} from '../../../../constants'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
  },
}))

export default function ConnectionPanel({state, url, connect, disconnect}) {
  const classes = useStyles()
  const {t} = useTranslation('ControlPanel')
  const [localUrl, setLocalUrl] = useState('')
  const [buttonLabel, setButtonLabel] = useState('')

  useEffect(() => {
    setLocalUrl(url)
  }, [url])

  useEffect(() => {
    switch (state) {
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
  }, [state])

  const onChange = (value) => {
    setLocalUrl(value)
  }

  const onButtonClicked = async () => {
    switch (state) {
      case ConnectionState.Idle:
        await connect(localUrl)
        return
      case ConnectionState.Connected:
        await disconnect()
        return
    }
  }

  const validWebsocketUrl = localUrl.length > 0 && (localUrl.startsWith('ws://') || localUrl.startsWith('wss://'))

  return (
    <TextField
      className={classes.root}
      large
      placeholder={t('欲連線的網址')}
      value={localUrl}
      onChange={onChange}
      disabled={state !== ConnectionState.Idle}
      error={!validWebsocketUrl}
      action={
        <LinkButton
          primary
          large
          disabled={(state === ConnectionState.Connecting || state === ConnectionState.Closing) || !validWebsocketUrl}
          onClick={onButtonClicked}
        >{buttonLabel}</LinkButton>
      }
    />
  )
}

ConnectionPanel.propTypes = {
  state: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  connect: PropTypes.func.isRequired,
  disconnect: PropTypes.func.isRequired,
}
