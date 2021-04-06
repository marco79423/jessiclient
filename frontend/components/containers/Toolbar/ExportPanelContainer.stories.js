import React from 'react'

import ExportPanelContainer from './ExportPanelContainer'


export default {
  title: 'containers/Toolbar/ExportPanelContainer',
  component: ExportPanelContainer,
}


const Template = (args) => <ExportPanelContainer {...args} />

export const Default = Template.bind({})
Default.args = {
  open: true,
}
