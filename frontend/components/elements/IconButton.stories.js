import React from 'react'
import ArchiveIcon from '@material-ui/icons/Archive'

import IconButton from './IconButton'


export default {
  title: 'elements/IconButton',
  component: IconButton,
  parameters: {
    backgrounds: {default: 'header',},
  }
}


const Template = (args) => <IconButton {...args} />

export const Default = Template.bind({})
Default.args = {
  description: '匯出專案',
  icon: ArchiveIcon,
}
