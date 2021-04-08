import React from 'react'

import NumberField from './NumberField'


export default {
  title: 'elements/NumberField',
  component: NumberField,
}


const Template = (args) => <NumberField {...args} />

export const Default = Template.bind({})
Default.args = {
  value: 3,
}
