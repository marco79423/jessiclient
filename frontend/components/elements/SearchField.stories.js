import React from 'react'
import SearchField from './SearchField'


export default {
  title: 'elements/SearchField',
  component: SearchField,
}


const Template = (args) => <SearchField {...args} />

export const Default = Template.bind({})
Default.args = {
  placeholder: '搜尋訊息',
}
