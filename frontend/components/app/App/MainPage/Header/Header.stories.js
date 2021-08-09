import React from 'react'

import Header from './Header'


export default {
  title: 'App/MainPage/Header',
  component: Header,
}


const Template = (args) => <Header {...args} />

export const Default = Template.bind({})
Default.args = {}
