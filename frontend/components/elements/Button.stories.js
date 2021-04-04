import React from 'react'

import Button from './Button'

export default {
  title: 'elements/Button',
  component: Button,
}


const Template = (args) => <Button {...args}>按鈕</Button>

export const Default = Template.bind({})
Default.args = {
  primary: false,
  disabled: false,
}
