import React from 'react'

import Logo from './Logo'


export default {
  title: 'App/MainPage/Header/Logo',
  component: Logo,
}


const Template = (args) => <Logo {...args} />

export const Default = Template.bind({})
Default.args = {}
