import React from 'react'

import ExportPanel from './ExportPanel'


export default {
  title: 'modules/Toolbar/ExportPanel',
  component: ExportPanel,
}


const Template = (args) => <ExportPanel {...args} />

export const Default = Template.bind({})
Default.args = {
  open: true,
}