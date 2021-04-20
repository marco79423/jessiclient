import React from 'react'
import {useSelector} from 'react-redux'

import {getMessage} from '../../../../selectors'
import DetailPanel from '../../../modules/mobile/DetailPanel/DetailPanel'


export default function DetailPanelContainer({setDisplayMode}) {
  const message = useSelector(getMessage)

  return (
    <DetailPanel message={message} setDisplayMode={setDisplayMode}/>
  )
}
