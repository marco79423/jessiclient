import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {getMessage} from '../../../../selectors'
import DetailPanel from '../../../modules/mobile/DetailPanel/DetailPanel'
import {setSelectedMessageID} from '../../../../slices/current'
import {AppMobileDisplayMode} from '../../../../constants'


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
