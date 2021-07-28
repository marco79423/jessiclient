import React from 'react'
import PropTypes from 'prop-types'
import useMobileMode from '../../../hooks/useMobileMode'
import MobileControlPanel from './mobile/MobileControlPanel'
import WebControlPanel from './web/WebControlPanel'


export default function ControlPanel({
                                       connectionState,
                                       connectionUrl,
                                       onConnect,
                                       onDisconnect,

                                       requestBody,
                                       onRequestBodyChange,
                                       onSendRequest,

                                       scheduleTimeInterval,
                                       onScheduleTimeIntervalChange,
                                       scheduleEnabled,
                                       onEnableSchedule,

                                       favoriteRequestCategories,
                                       favoriteRequestID,
                                       onShowFavoriteRequestDialog,
                                       onAddFavoriteRequest,
                                       onRemoveFavoriteRequest,

                                       onChangeMobileDisplayMode,
                                     }) {
  const mobileMode = useMobileMode()

  if (mobileMode) {
    return (
      <MobileControlPanel
        connectionState={connectionState}
        connectionUrl={connectionUrl}
        onConnect={onConnect}
        onDisconnect={onDisconnect}

        requestBody={requestBody}
        onRequestBodyChange={onRequestBodyChange}
        onSendRequest={onSendRequest}

        favoriteRequestCategories={favoriteRequestCategories}
        favoriteRequestID={favoriteRequestID}
        onShowFavoriteRequestDialog={onShowFavoriteRequestDialog}
        onAddFavoriteRequest={onAddFavoriteRequest}
        onRemoveFavoriteRequest={onRemoveFavoriteRequest}

        onChangeMobileDisplayMode={onChangeMobileDisplayMode}
      />
    )
  } else {
    return (
      <WebControlPanel
        connectionState={connectionState}
        connectionUrl={connectionUrl}
        onConnect={onConnect}
        onDisconnect={onDisconnect}

        requestBody={requestBody}
        onRequestBodyChange={onRequestBodyChange}
        onSendRequest={onSendRequest}

        scheduleTimeInterval={scheduleTimeInterval}
        onScheduleTimeIntervalChange={onScheduleTimeIntervalChange}
        scheduleEnabled={scheduleEnabled}
        onEnableSchedule={onEnableSchedule}

        favoriteRequestCategories={favoriteRequestCategories}
        favoriteRequestID={favoriteRequestID}
        onShowFavoriteRequestDialog={onShowFavoriteRequestDialog}
        onAddFavoriteRequest={onAddFavoriteRequest}
        onRemoveFavoriteRequest={onRemoveFavoriteRequest}
      />
    )
  }
}

ControlPanel.propTypes = {
}
