import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'
import {Link, Paper, Typography} from '@material-ui/core'
import Button from '../../../../elements/Button'
import ConnectionPanel from './ConnectionPanel'
import RequestPanel from './RequestPanel'
import {AppMobileDisplayMode, ConnectionState} from '../../../../../constants'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: theme.project.page.main.controlPanel.background,
    padding: theme.spacing(2),
    height: '100%',
  },
  controlBar: {
    textAlign: 'right',
  },
  connectionPanel: {
    marginTop: theme.spacing(2),
  },
  requestPanel: {
    marginTop: theme.spacing(2),
    flex: 1,
  },
  copyright: {
    margin: '16px auto 8px',
    color: theme.project.page.main.controlPanel.copyright.textColor,
  }
}))

export default function MobileControlPanel({
                                             connectionState,
                                             connectionUrl,
                                             onConnect,
                                             onDisconnect,

                                             requestBody,
                                             onRequestBodyChange,
                                             onSendRequest,

                                             favoriteRequestCategories,
                                             favoriteRequestID,
                                             onShowFavoriteRequestDialog,
                                             onAddFavoriteRequest,
                                             onRemoveFavoriteRequest,

                                             onChangeMobileDisplayMode
                                           }) {
  const classes = useStyles()
  const {t} = useTranslation()

  const onShowListPanel = () => {
    onChangeMobileDisplayMode(AppMobileDisplayMode.ListPanel)
  }

  return (
    <Paper className={classes.root} elevation={1} square>
      <div className={classes.controlBar}>
        <Button onClick={onShowListPanel}>{t('展開訊息列表')}</Button>
      </div>
      <div className={classes.connectionPanel}>
        <ConnectionPanel
          state={connectionState}
          url={connectionUrl}

          onConnect={onConnect}
          onDisconnect={onDisconnect}
        />
      </div>
      <div className={classes.requestPanel}>
        <RequestPanel
          isConnected={connectionState === ConnectionState.Connected}

          requestBody={requestBody}
          onRequestBodyChange={onRequestBodyChange}
          onSendRequest={onSendRequest}

          favoriteRequestCategories={favoriteRequestCategories}
          favoriteRequestID={favoriteRequestID}
          onShowFavoriteRequestDialog={onShowFavoriteRequestDialog}
          onAddFavoriteRequest={onAddFavoriteRequest}
          onRemoveFavoriteRequest={onRemoveFavoriteRequest}
        />
      </div>
      <div className={classes.copyright}>
        <Typography variant="body2" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://marco79423.net/">兩大類</Link>{' '}
          {new Date().getFullYear()}
        </Typography>
      </div>
    </Paper>
  )
}

MobileControlPanel.propTypes = {
}
