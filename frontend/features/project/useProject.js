import React from 'react'

import {ProjectContext} from './ProjectProvider'

export default function useNotifications() {
  return React.useContext(ProjectContext)
}
