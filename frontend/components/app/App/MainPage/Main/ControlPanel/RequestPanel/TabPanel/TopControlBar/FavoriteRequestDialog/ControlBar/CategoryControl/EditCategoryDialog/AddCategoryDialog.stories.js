import React from 'react'

import EditCategoryDialog from './EditCategoryDialog'


export default {
  title: 'App/MainPage/Main/ControlPanel/RequestPanel/TabPanel/TopControlBar/FavoriteRequestDialog/ControlBar/CategoryControl/EditCategoryDialog',
  component: EditCategoryDialog,
}


const Template = (args) => <EditCategoryDialog {...args} />

export const Default = Template.bind({})
Default.args = {
  open: true,
}
