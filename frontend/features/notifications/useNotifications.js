import React from 'react'

import {NotificationsContext} from './NotificationsProvider'

export default function useNotifications() {
  return React.useContext(NotificationsContext)
}
