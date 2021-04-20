import React from 'react'

import ScheduleRequestPanel from './ScheduleRequestPanel'


export default {
  title: 'modules/web/ControlPanel/ScheduleRequestPanel',
  component: ScheduleRequestPanel,
}


const Template = (args) => <ScheduleRequestPanel {...args} />

export const Default = Template.bind({})
Default.args = {}
