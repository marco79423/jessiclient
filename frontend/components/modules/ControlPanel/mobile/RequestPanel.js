import React from 'react'
import PropTypes from 'prop-types'

import BasicRequestPanel from './BasicRequestPanel'


export default function RequestPanel({
                                       isConnected,

                                       requestBody,
                                       onRequestBodyChange,
                                       onSendRequest,

                                       favoriteRequestCategories,
                                       favoriteRequestID,
                                       onShowFavoriteRequestDialog,
                                       onAddFavoriteRequest,
                                       onRemoveFavoriteRequest,
                                     }) {
  return (
    <BasicRequestPanel
      isConnected={isConnected}

      requestBody={requestBody}
      onRequestBodyChange={onRequestBodyChange}
      onSendRequest={onSendRequest}

      favoriteRequestCategories={favoriteRequestCategories}
      favoriteRequestID={favoriteRequestID}
      onShowFavoriteRequestDialog={onShowFavoriteRequestDialog}
      onAddFavoriteRequest={onAddFavoriteRequest}
      onRemoveFavoriteRequest={onRemoveFavoriteRequest}
    />
  )
}

RequestPanel.propTypes = {
  isConnected: PropTypes.bool.isRequired,

  requestBody: PropTypes.string.isRequired,
  onRequestBodyChange: PropTypes.func.isRequired,
  onSendRequest: PropTypes.func.isRequired,

  favoriteRequestCategories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  favoriteRequestID: PropTypes.string,
  onShowFavoriteRequestDialog: PropTypes.func.isRequired,
  onAddFavoriteRequest: PropTypes.func.isRequired,
  onRemoveFavoriteRequest: PropTypes.func.isRequired,
}
