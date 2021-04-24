import React from 'react'

import ShareDialog from './ShareDialog'


export default {
  title: 'modules/common/ShareDialog',
  component: ShareDialog,
}


const Template = (args) => <ShareDialog {...args} />

export const Default = Template.bind({})
Default.args = {
  open: true,
}
