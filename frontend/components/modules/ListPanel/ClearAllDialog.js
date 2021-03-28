import React from 'react'
import {useDispatch} from 'react-redux'
import {useGA4React} from 'ga-4-react'
import {Typography} from '@material-ui/core'

import {clearMessages} from '../../../slices'
import BasicDialog from '../../elements/BasicDialog'
import Button from '../../elements/Button'

export default function ClearAllDialog({open, onClose}) {
  const dispatch = useDispatch()
  const ga4React = useGA4React()

  const clearAllMessages = () => {
    dispatch(clearMessages())
    onClose()
    ga4React.gtag('event', 'clear_messages')
  }

  return (
    <BasicDialog title={'確定刪除嗎？'}
                 open={open}
                 onClose={onClose}
                 actions={
                   <>
                     <Button onClick={onClose}>取消</Button>
                     <Button primary onClick={clearAllMessages}>刪除</Button>
                   </>
                 }>
      <Typography>刪除的訊息將不再能恢復</Typography>
    </BasicDialog>
  )
}
