import React from 'react'
import TextField from './TextField'
import Button from './Button'


export default {
  title: 'elements/TextField',
  component: TextField,
}


const Template = (args) => <TextField {...args} />

export const Default = Template.bind({})
Default.args = {
  placeholder: '搜尋訊息',
}

export const WithAction = Template.bind({})
WithAction.args = {
  ...Default.args,
  action: <Button link>產生連結</Button>
}
