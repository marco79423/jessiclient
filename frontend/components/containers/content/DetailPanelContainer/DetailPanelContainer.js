import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {getMessage} from '../../../../redux/selectors'
import {changeMobileDisplayMode, setSelectedMessageID} from '../../../../redux/current'
import {AppMobileDisplayMode} from '../../../../constants'
import DetailPanel from '../../../modules/content/DetailPanel'


export default function DetailPanelContainer({}) {
  const dispatch = useDispatch()
  const message = useSelector(getMessage)

  const onClose = () => {
    dispatch(setSelectedMessageID(null))
    dispatch(changeMobileDisplayMode(AppMobileDisplayMode.ListPanel))
  }

  return (
    <DetailPanel message={message} onClose={onClose}/>
  )
}
