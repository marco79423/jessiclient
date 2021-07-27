import React from 'react'

import Toolbar from './Toolbar'


export default {
  title: 'modules/web/AppBar/Toolbar',
  component: Toolbar,
  parameters: {
    backgrounds: {default: 'header',},
  }
}


const Template = (args) => <Toolbar {...args} />

export const Default = Template.bind({})
Default.args = {}
