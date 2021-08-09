import React from 'react'

import ControlPanel from './ControlPanel'


export default {
  title: 'App/MainPage/Main/ControlPanel',
  component: ControlPanel,
}


const Template = (args) => <ControlPanel {...args} />

export const Default = Template.bind({})
Default.args = {}
