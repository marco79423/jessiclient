import React from 'react'

import ChangeSiteDialog from './ChangeSiteDialog'


export default {
  title: 'App/MainPage/Main/ControlPanel/ConnectionPanel/ChangeSiteDialog',
  component: ChangeSiteDialog,
}


const Template = (args) => <ChangeSiteDialog {...args} />

export const Default = Template.bind({})
Default.args = {
  open: true,
}
