import React from 'react'

import LinkButton from './LinkButton'


export default {
  title: 'elements/LinkButton',
  component: LinkButton,
}


const Template = (args) => <LinkButton {...args}>按鈕</LinkButton>

export const Default = Template.bind({})
Default.args = {
}
