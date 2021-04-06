import React from 'react'

import FavoriteRequestDialog from './FavoriteRequestDialog'


export default {
  title: 'modules/ControlPanel/FavoriteRequestDialog',
  component: FavoriteRequestDialog,
}


const Template = (args) => <FavoriteRequestDialog {...args} />

export const Default = Template.bind({})
Default.args = {
  open: true,
  favoriteRequests: [
    {
      id: 'id 1',
      name: 'name 1',
      text: 'text 1',
    },
    {
      id: 'id 2',
      name: 'name 2',
      text: 'text 2',
    },
    {
      id: 'id 3',
      name: 'name 3',
      text: 'text 3',
    },
    {
      id: 'id 4',
      name: 'name 4',
      text: 'text 4',
    },
  ]
}
