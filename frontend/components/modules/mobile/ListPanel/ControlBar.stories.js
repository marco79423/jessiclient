import React from 'react'
import ControlBar from './ControlBar'


export default {
  title: 'modules/mobile/ListPanel/ControlBar',
  component: ControlBar,
}


const Template = (args) => <ControlBar {...args} />

export const Default = Template.bind({})
Default.args = {
  searchFilters: ['搜尋 1', '搜尋 2'],
}
