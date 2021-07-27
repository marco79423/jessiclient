import React from 'react'

import Toolbar from './Toolbar'


export default {
  title: 'modules/AppBar/mobile/Toolbar',
  component: Toolbar,
  parameters: {
    backgrounds: {default: 'header',},
  }
}


const Template = (args) => <Toolbar {...args} />

export const Default = Template.bind({})
Default.args = {}
