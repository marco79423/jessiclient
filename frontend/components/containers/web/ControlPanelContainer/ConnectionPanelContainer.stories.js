import React from 'react'

import ConnectionPanelContainer from './ConnectionPanelContainer'


export default {
  title: 'containers/ControlPanel/ConnectionPanelContainer',
  component: ConnectionPanelContainer,
}


const Template = (args) => <ConnectionPanelContainer {...args} />

export const Default = Template.bind({})
Default.args = {}
