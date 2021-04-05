import React from 'react'

import TextArea from './TextArea'


export default {
  title: 'elements/TextArea',
  component: TextArea,
}


const Template = (args) => <TextArea {...args} />

export const Default = Template.bind({})
Default.args = {
  label: '請求內容'
}
