import React from 'react'

import ClearAllMessagesDialog from './ClearAllMessagesDialog'


export default {
  title: 'modules/ListPanel/shared/ClearAllMessagesDialog',
  component: ClearAllMessagesDialog,
}


const Template = (args) => <ClearAllMessagesDialog {...args} />

export const Default = Template.bind({})
Default.args = {
  open: true,
}
