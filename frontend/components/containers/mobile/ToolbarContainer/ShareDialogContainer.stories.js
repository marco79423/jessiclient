import React from 'react'

import ShareDialogContainer from './ShareDialogContainer'


export default {
  title: 'containers/Toolbar/ShareDialogContainer',
  component: ShareDialogContainer,
}


const Template = (args) => <ShareDialogContainer {...args} />

export const Default = Template.bind({})
Default.args = {
  open: true,
}
