import {useContext} from 'react'

import {WSClientContext} from './WSClientProvider'

export default function useWSClient() {
  return useContext(WSClientContext)
}
