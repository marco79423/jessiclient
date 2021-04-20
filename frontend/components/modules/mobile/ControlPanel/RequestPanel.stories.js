import React from 'react'

import RequestPanel from './RequestPanel'


export default {
  title: 'modules/mobile/ControlPanel/RequestPanel',
  component: RequestPanel,
}


const Template = (args) => <RequestPanel {...args} />

export const Default = Template.bind({})
Default.args = {}
