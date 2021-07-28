import React from 'react'

import Logo from './Logo'


export default {
  title: 'modules/AppBar/shared/Logo',
  component: Logo,
}


const Template = (args) => <Logo {...args} />

export const Default = Template.bind({})
Default.args = {}
