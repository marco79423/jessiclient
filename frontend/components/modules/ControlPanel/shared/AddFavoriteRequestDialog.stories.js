import React from 'react'

import AddFavoriteRequestDialog from './AddFavoriteRequestDialog'


export default {
  title: 'modules/common/AddFavoriteRequestDialog',
  component: AddFavoriteRequestDialog,
}


const Template = (args) => <AddFavoriteRequestDialog {...args} />

export const Default = Template.bind({})
Default.args = {
  open: true,
  categories: [
    {
      id: 'id',
      label: '未分類'
    }
  ],
}
