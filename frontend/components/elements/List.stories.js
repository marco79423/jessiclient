import React from 'react'

import List from './List'
import ListItem from './ListItem'


export default {
  title: 'elements/List',
  component: List,
}


const Template = (args) => (
  <List {...args} >
    <ListItem selected={false} title={<span style={{fontSize: '1rem'}}>2021/3/19 上午11:09:18 [服務端]</span>}>
      ABC
    </ListItem>
    <ListItem selected={true} title={<span style={{fontSize: '1rem'}}>2021/3/19 上午11:09:19 [服務端]</span>}>
      DEF
    </ListItem>
    <ListItem selected={false} title={<span style={{fontSize: '1rem'}}>2021/3/19 上午11:09:20 [服務端]</span>}>
      GHI
    </ListItem>
    <ListItem selected={false} title={<span style={{fontSize: '1rem'}}>2021/3/19 上午11:09:21 [服務端]</span>}>
      JKL
    </ListItem>
    <ListItem selected={false} title={<span style={{fontSize: '1rem'}}>2021/3/19 上午11:09:22 [服務端]</span>}>
      MNO
    </ListItem>
  </List>
)

export const Default = Template.bind({})
Default.args = {
  height: 300,
}
