import React from 'react'

import RequestPanel from './RequestPanel'


export default {
  title: 'App/MainPage/Main/ControlPanel/RequestPanel',
  component: RequestPanel,
  parameters: {
    backgrounds: {default: 'header',},
  }
}


const Template = (args) => <RequestPanel {...args} />

export const Default = Template.bind({})
Default.args = {}
