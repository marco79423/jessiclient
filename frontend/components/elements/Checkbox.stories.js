import React from 'react'

import Checkbox from './Checkbox'


export default {
  title: 'elements/Checkbox',
  component: Checkbox,
}


const Template = (args) => <Checkbox {...args} />

export const Default = Template.bind({})
Default.args = {
  checked: false,
  label: '是否包含歷史訊息',
}
