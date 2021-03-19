import React from 'react'

import ListItem from './ListItem'


export default {
  title: 'elements/ListItem',
  component: ListItem,
}


const Template = (args) => <ListItem {...args} />

export const Default = Template.bind({})
Default.args = {
  key: 'key',
  selected: false,
  title: <span style={{fontSize: '1rem'}}>2021/3/19 上午11:09:18 [服務端]</span>,
  children: <span>Hello world</span>,
}
