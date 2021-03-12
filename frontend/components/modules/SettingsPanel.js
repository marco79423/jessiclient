import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {useDispatch, useSelector} from 'react-redux'
import {TextField} from '@material-ui/core'
import {changeSettingMaxMessageCount, getSettingMaxMessageCount} from '../../slices'

import Button from '../elements/Button'
import BasicDialog from '../elements/BasicDialog'

const useStyles = makeStyles((theme) => ({
  content: {},
  valueInput: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))

export default function SettingsPanel({open, onClose}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [value, setValue] = useState(null)
  const maxMessageCount = useSelector(getSettingMaxMessageCount)

  useEffect(() => {
    setValue(maxMessageCount)
  }, [maxMessageCount])

  const confirm = () => {
    dispatch(changeSettingMaxMessageCount(value))
    onClose()
  }

  const onValueChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <BasicDialog title={'設定'}
                 open={open}
                 onClose={onClose}
                 actions={
                   <>
                     <Button onClick={onClose}>取消</Button>
                     <Button primary onClick={confirm}>修改</Button>
                   </>
                 }
    >

      <TextField className={classes.valueInput}
                 label="最大訊息數"
                 onChange={onValueChange}
                 margin="dense"
                 value={value}/>
    </BasicDialog>
  )
}
