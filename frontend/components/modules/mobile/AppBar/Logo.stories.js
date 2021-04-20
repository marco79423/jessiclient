import React from 'react'

import Logo from './Logo'


export default {
  title: 'modules/mobile/AppBar/Logo',
  component: Logo,
}


const Template = (args) => <Logo {...args} />

export const Default = Template.bind({})
Default.args = {}
