import React from 'react'
import IconButton from './IconButton'
import ArchiveIcon from '@material-ui/icons/Archive'


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
