import React from 'react'
import PropTypes from 'prop-types'

import BasicRequestPanel from './BasicRequestPanel'


export default function RequestPanel({
                                       isConnected,

                                       requestBody,
                                       onRequestBodyChange,

                                       favoriteRequestID,
                                       onFavoriteRequestDialogShow,
                                       onFavoriteRequestAdd,
                                       onFavoriteRequestRemove,
                                       onSendMessage,
                                     }) {
  return (
    <BasicRequestPanel
      isConnected={isConnected}

      favoriteRequestID={favoriteRequestID}
      onFavoriteRequestDialogShow={onFavoriteRequestDialogShow}
      onFavoriteRequestAdd={onFavoriteRequestAdd}
      onFavoriteRequestRemove={onFavoriteRequestRemove}

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
  onFavoriteRequestDialogShow: PropTypes.func.isRequired,
  onFavoriteRequestAdd: PropTypes.func.isRequired,
  onFavoriteRequestRemove: PropTypes.func.isRequired,

  onSendMessage: PropTypes.func.isRequired,
}
