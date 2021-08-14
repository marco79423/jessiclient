import React from 'react'
import {useTranslation} from 'next-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'

import {ConnectionState} from '../../../../../../../constants'
import validateWebsocketUrl from '../../../../../../../utils/validateWebsocketUrl'
import {changeConnectionUrl} from '../../../../../../../redux/project'
import {selectConnectionUrl} from '../../../../../../../redux/selectors'
import useWSClient from '../../../../../../../features/wsClient/useWSClient'
import LinkButton from '../../../../../../elements/LinkButton'
import TextField from '../../../../../../elements/TextField'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
  },
}))

export default function ConnectionPanel() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const wsClient = useWSClient()
  const {t} = useTranslation()

  const connectionUrl = useSelector(selectConnectionUrl)

  const [localUrl, setLocalUrl] = React.useState(connectionUrl)
  const [buttonLabel, setButtonLabel] = React.useState((t('建立連線')))

  React.useEffect(() => {
    setLocalUrl(connectionUrl)
  }, [connectionUrl])

  React.useEffect(() => {
    switch (wsClient.connectionState) {
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
  }, [wsClient.connectionState])


  const onUrlChange = (value) => {
    setLocalUrl(value)
  }

  const onButtonClick = async () => {
    switch (wsClient.connectionState) {
      case ConnectionState.Idle:
        await dispatch(changeConnectionUrl(localUrl))
        await wsClient.connect(localUrl)
        return
      case ConnectionState.Connected:
        await wsClient.disconnect()
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
      onChange={onUrlChange}
      disabled={wsClient.connectionState !== ConnectionState.Idle}
      error={!isValidWSUrl}
      action={
        <LinkButton
          primary
          large
          disabled={(wsClient.connectionState === ConnectionState.Connecting || wsClient.connectionState === ConnectionState.Closing) || !isValidWSUrl}
          onClick={onButtonClick}
        >{buttonLabel}</LinkButton>
      }
    />
  )
}

ConnectionPanel.propTypes = {}
