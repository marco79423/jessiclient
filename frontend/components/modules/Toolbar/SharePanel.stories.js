import React from 'react'

import SharePanel from './SharePanel'


export default {
  title: 'modules/Toolbar/SharePanel',
  component: SharePanel,
}


const Template = (args) => <SharePanel {...args} />

export const Default = Template.bind({})
Default.args = {
  open: true,
}
