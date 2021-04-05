import React from 'react'

import EditableText from './EditableText'


export default {
  title: 'elements/EditableText',
  component: EditableText,
}


const Template = (args) => <EditableText {...args} />

export const Default = Template.bind({})
Default.args = {
  value: '標題',
}
