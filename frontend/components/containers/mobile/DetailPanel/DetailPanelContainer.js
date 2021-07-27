import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {getMessage} from '../../../../redux/selectors'
import {setSelectedMessageID} from '../../../../redux/current'
import {AppMobileDisplayMode} from '../../../../constants'
import DetailPanel from '../../../modules/DetailPanel/mobile/DetailPanel/DetailPanel'


export default function DetailPanelContainer({setDisplayMode}) {
  const dispatch = useDispatch()
  const message = useSelector(getMessage)

  useEffect(() => {
    if (message) {
      setDisplayMode(AppMobileDisplayMode.DetailPanel)
    } else {
      setDisplayMode(AppMobileDisplayMode.ListPanel)
    }
  }, [message])

  const unselected = () => {
    dispatch(setSelectedMessageID(null))
  }

  return (
    <DetailPanel message={message} unselected={unselected}/>
  )
}
