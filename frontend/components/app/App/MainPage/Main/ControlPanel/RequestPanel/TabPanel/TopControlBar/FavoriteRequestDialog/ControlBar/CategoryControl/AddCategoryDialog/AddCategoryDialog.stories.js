import React from 'react'

import AddCategoryDialog from './AddCategoryDialog'


export default {
  title: 'App/MainPage/Main/ControlPanel/RequestPanel/TabPanel/TopControlBar/FavoriteRequestDialog/ControlBar/CategoryControl/AddCategoryDialog',
  component: AddCategoryDialog,
}


const Template = (args) => <AddCategoryDialog {...args} />

export const Default = Template.bind({})
Default.args = {
  open: true,
}
