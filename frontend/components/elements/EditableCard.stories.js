import React from 'react'

import EditableCard from './EditableCard'


export default {
  title: 'elements/EditableCard',
  component: EditableCard,
  parameters: {
    backgrounds: {default: 'header',},
  }
}


const Template = (args) => <EditableCard {...args} />

export const Default = Template.bind({})
Default.args = {
  title: '標題',
  content: '內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文'
}
