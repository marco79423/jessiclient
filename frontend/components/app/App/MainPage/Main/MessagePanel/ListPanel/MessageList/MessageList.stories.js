import React from 'react'
import {nanoid} from 'nanoid'

import {MessageSource} from '../../../../../../../../constants'
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
      id: nanoid(),
      time: new Date(),
      source: MessageSource.Client,
      body: '內文 1'
    },
    {
      id: nanoid(),
      time: new Date(),
      source: MessageSource.Server,
      body: '內文 2'
    },
    {
      id: nanoid(),
      time: new Date(),
      source: MessageSource.Client,
      body: '內文 3'
    },
    {
      id: nanoid(),
      time: new Date(),
      source: MessageSource.Client,
      body: '內文 4'
    },
    {
      id: nanoid(),
      time: new Date(),
      source: MessageSource.Server,
      body: '內文 5'
    },
    {
      id: nanoid(),
      time: new Date(),
      source: MessageSource.Client,
      body: '內文 6'
    },
  ],
}
