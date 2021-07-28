import React from 'react'
import ToolbarContainer from './ToolbarContainer'


export default {
  title: 'containers/Appbar/web/ToolbarContainer',
  component: ToolbarContainer,
  parameters: {
    backgrounds: {default: 'header',},
  }
}


const Template = (args) => <ToolbarContainer {...args} />

export const Default = Template.bind({})
Default.args = {}
