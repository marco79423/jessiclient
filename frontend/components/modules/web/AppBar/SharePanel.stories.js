import React from 'react'

import SharePanel from './SharePanel'


export default {
  title: 'modules/web/AppBar/SharePanel',
  component: SharePanel,
}


const Template = (args) => <SharePanel {...args} />

export const Default = Template.bind({})
Default.args = {
  open: true,
}
