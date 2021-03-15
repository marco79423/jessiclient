import React from 'react'

import Switch from './Switch'


export default {
  title: 'elements/Switch',
  component: Switch,
}


const Template = (args) => <Switch {...args} />

export const Default = Template.bind({})
Default.args = {
  checked: false,
  label: '是否包含歷史訊息',
}
