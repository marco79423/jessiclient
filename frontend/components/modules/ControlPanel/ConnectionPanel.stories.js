import React from 'react'

import ConnectionPanel from './ConnectionPanel'


export default {
  title: 'modules/ControlPanel/ConnectionPanel',
  component: ConnectionPanel,
}


const Template = (args) => <ConnectionPanel {...args} />

export const Default = Template.bind({})
Default.args = {}
