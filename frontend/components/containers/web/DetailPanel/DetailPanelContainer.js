import React from 'react'
import {useSelector} from 'react-redux'

import {getMessage} from '../../../../selectors'
import DetailPanel from '../../../modules/web/DetailPanel/DetailPanel'


export default function DetailPanelContainer() {
  const message = useSelector(getMessage)

  return (
    <DetailPanel message={message}/>
  )
}
