import React from 'react'
import PropTypes from 'prop-types'

import BasicRequestPanel from './BasicRequestPanel'


export default function RequestPanel({
                                       isConnected,

                                       requestBody,
                                       onRequestBodyChange,

                                       favoriteRequestID,
                                       showFavoriteRequestDialog,
                                       onFavoriteRequestSet,
                                       onFavoriteRequestUnset,
                                       onSendMessage,
                                     }) {
  return (
    <BasicRequestPanel
      isConnected={isConnected}

      favoriteRequestID={favoriteRequestID}
      onShowFavoriteRequestsClick={showFavoriteRequestDialog}
      onFavoriteRequestSet={onFavoriteRequestSet}
      onFavoriteRequestUnset={onFavoriteRequestUnset}

      requestBody={requestBody}
      onRequestBodyChange={onRequestBodyChange}

      onSendButtonClick={onSendMessage}
    />
  )
}

RequestPanel.propTypes = {
  isConnected: PropTypes.bool.isRequired,

  requestBody: PropTypes.string.isRequired,
  onRequestBodyChange: PropTypes.func.isRequired,

  favoriteRequestID: PropTypes.string,
  showFavoriteRequestDialog: PropTypes.func.isRequired,
  onFavoriteRequestSet: PropTypes.func.isRequired,
  onFavoriteRequestUnset: PropTypes.func.isRequired,

  onSendMessage: PropTypes.func.isRequired,
}
