import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'

import validateWebsocketUrl from '../../../../utils/validateWebsocketUrl'
import {ConnectionState} from '../../../../constants'
import LinkButton from '../../../elements/LinkButton'
import TextField from '../../../elements/TextField'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
  },
}))

export default function ConnectionPanel({state, url, onConnect, onDisconnect}) {
  const classes = useStyles()
  const {t} = useTranslation()
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
        await onConnect(localUrl)
        return
      case ConnectionState.Connected:
        await onDisconnect()
        return
    }
  }

  const isValidWSUrl = validateWebsocketUrl(localUrl)

  return (
    <TextField
      className={classes.root}
      large
      placeholder={t('欲連線的網址')}
      value={localUrl}
      onChange={onChange}
      disabled={state !== ConnectionState.Idle}
      error={!isValidWSUrl}
      action={
        <LinkButton
          primary
          large
          disabled={(state === ConnectionState.Connecting || state === ConnectionState.Closing) || !isValidWSUrl}
          onClick={onButtonClicked}
        >{buttonLabel}</LinkButton>
      }
    />
  )
}

ConnectionPanel.propTypes = {
  state: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,

  onConnect: PropTypes.func.isRequired,
  onDisconnect: PropTypes.func.isRequired,
}
