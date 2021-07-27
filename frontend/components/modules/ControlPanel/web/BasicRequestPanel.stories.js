import React from 'react'

import BasicRequestPanel from './BasicRequestPanel'


export default {
  title: 'modules/web/ControlPanel/BasicRequestPanel',
  component: BasicRequestPanel,
}


const Template = (args) => <BasicRequestPanel {...args} />

export const Default = Template.bind({})
Default.args = {
}
