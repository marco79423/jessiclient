import React from 'react'

import ExportDialog from './ExportDialog'


export default {
  title: 'modules/common/ExportDialog',
  component: ExportDialog,
}


const Template = (args) => <ExportDialog {...args} />

export const Default = Template.bind({})
Default.args = {
  open: true,
}
