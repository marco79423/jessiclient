import React from 'react'

import FavoriteRequestDialog from './FavoriteRequestDialog'


export default {
  title: 'App/MainPage/Main/ControlPanel/RequestPanel/TabPanel/TopControlBar/FavoriteRequestDialog',
  component: FavoriteRequestDialog,
}


const Template = (args) => <FavoriteRequestDialog {...args} />

export const Default = Template.bind({})
Default.args = {
  open: true,
}
