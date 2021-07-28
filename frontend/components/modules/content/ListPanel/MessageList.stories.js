import React from 'react'

import {MessageSource} from '../../../../constants'
import generateRandomString from '../../../../utils/generateRandomString'
import MessageList from './MessageList'


export default {
  title: 'modules/ListPanel/shared/MessageList',
  component: MessageList,
}


const Template = (args) => <MessageList {...args} />

export const Default = Template.bind({})
Default.args = {
  messages: [
    {
      id: generateRandomString(),
      time: new Date(),
      source: MessageSource.Client,
      body: '內文 1'
    },
    {
      id: generateRandomString(),
      time: new Date(),
      source: MessageSource.Server,
      body: '內文 2'
    },
    {
      id: generateRandomString(),
      time: new Date(),
      source: MessageSource.Client,
      body: '內文 3'
    },
    {
      id: generateRandomString(),
      time: new Date(),
      source: MessageSource.Client,
      body: '內文 4'
    },
    {
      id: generateRandomString(),
      time: new Date(),
      source: MessageSource.Server,
      body: '內文 5'
    },
    {
      id: generateRandomString(),
      time: new Date(),
      source: MessageSource.Client,
      body: '內文 6'
    },
  ],
}
