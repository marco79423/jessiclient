import React from 'react'

import SharePanelContainer from './SharePanelContainer'


export default {
  title: 'containers/Toolbar/SharePanelContainer',
  component: SharePanelContainer,
}


const Template = (args) => <SharePanelContainer {...args} />

export const Default = Template.bind({})
Default.args = {
  open: true,
}
