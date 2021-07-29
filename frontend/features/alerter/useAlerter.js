import {useContext} from 'react'
import {AlerterContext} from './AlertProvider'

export default function useAlerter() {
  return useContext(AlerterContext)
}
