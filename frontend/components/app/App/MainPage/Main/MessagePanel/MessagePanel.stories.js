import React from 'react'

import MessagePanel from './MessagePanel'


export default {
  title: 'App/MainPage/Main/MessagePanel',
  component: MessagePanel,
}


const Template = (args) => <MessagePanel {...args} />

export const Default = Template.bind({})
Default.args = {}
