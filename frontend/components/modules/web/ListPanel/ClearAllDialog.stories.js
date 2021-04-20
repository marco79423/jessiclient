import React from 'react'

import ClearAllDialog from './ClearAllDialog'


export default {
  title: 'modules/web/ListPanel/ClearAllDialog',
  component: ClearAllDialog,
}


const Template = (args) => <ClearAllDialog {...args} />

export const Default = Template.bind({})
Default.args = {
  open: true,
}
