import React from 'react'
import {Button, TextField} from '@material-ui/core'

import BasicDialog from './BasicDialog'

export default {
  title: 'elements/BasicDialog',
  component: BasicDialog,
}


const Template = (args) => (
  <BasicDialog {...args}>
    <TextField
      label="最大訊息數"
      margin="dense"
      value={100}
    />
  </BasicDialog>
)

export const Default = Template.bind({})
Default.args = {
  title: '設定',
  open: true,
}

export const WithActions = Template.bind({})
WithActions.args = {
  title: '設定',
  open: true,
  actions: (
    <>
      <Button variant="contained">取消</Button>
      <Button variant="contained" color="primary" onClick={confirm}>修改</Button>
    </>
  )
}
