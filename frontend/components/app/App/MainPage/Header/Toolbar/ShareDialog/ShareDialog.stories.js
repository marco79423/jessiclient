import React from 'react'

import ShareDialog from './ShareDialog'


export default {
  title: 'App/MainPage/Header/Toolbar/ShareDialog',
  component: ShareDialog,
}


const Template = (args) => <ShareDialog {...args} />

export const Default = Template.bind({})
Default.args = {
  open: true,
}
