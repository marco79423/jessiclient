import React from 'react'

import Logo from './Logo'


export default {
  title: 'modules/web/AppBar/Logo',
  component: Logo,
}


const Template = (args) => <Logo {...args} />

export const Default = Template.bind({})
Default.args = {}
