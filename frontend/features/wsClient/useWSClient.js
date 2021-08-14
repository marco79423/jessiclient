import React from 'react'

import {WSClientContext} from './WSClientProvider'

export default function useWSClient() {
  return React.useContext(WSClientContext)
}
