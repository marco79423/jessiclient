import React from 'react'

import TopControlBar from './TopControlBar'


export default {
  title: 'App/MainPage/Main/ControlPanel/RequestPanel/TabPanel/TopControlBar',
  component: TopControlBar,
  parameters: {
    backgrounds: {default: 'header',},
  },
}


const Template = (args) => <TopControlBar {...args} />

export const Default = Template.bind({})
Default.args = {}
