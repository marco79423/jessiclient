import React from 'react'

import ExportDialogContainer from './ExportDialogContainer'


export default {
  title: 'containers/common/ExportDialogContainer',
  component: ExportDialogContainer,
}


const Template = (args) => <ExportDialogContainer {...args} />

export const Default = Template.bind({})
Default.args = {
  open: true,
}
