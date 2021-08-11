import React from 'react'
import MessageList from './MessageList'


export default {
  title: 'App/MainPage/Main/MessagePanel/ListPanel/MessageList',
  component: MessageList,
}


const Template = (args) => <MessageList {...args} />

export const Default = Template.bind({})
Default.args = {}
