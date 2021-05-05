import React from 'react'

import Alert from './Alert'


export default {
  title: 'elements/Alert',
  component: Alert,
}


const Template = (args) => <Alert {...args} />

export const Default = Template.bind({})
Default.args = {
  message: '系統異常',
  severity: 'error',
  open: true,
}
