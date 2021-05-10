import React from 'react'
import Select from './Select'


export default {
  title: 'elements/Select',
  component: Select,
}


const Template = (args) => <Select {...args} />

export const Default = Template.bind({})
Default.args = {
  currentValue: 'en',
  selections: [
    {
      key: 'en',
      label: 'English',
      value: 'en',
    },
    {
      key: 'zh-TW',
      label: '繁體中文',
      value: 'zh-TW',
    },
    {
      key: 'zh-CN',
      label: '简体中文',
      value: 'zh-CN',
    },
  ]
}
