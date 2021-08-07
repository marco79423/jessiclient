import {useContext} from 'react'

import {AlerterContext} from './AlerterProvider'

export default function useAlerter() {
  return useContext(AlerterContext)
}
