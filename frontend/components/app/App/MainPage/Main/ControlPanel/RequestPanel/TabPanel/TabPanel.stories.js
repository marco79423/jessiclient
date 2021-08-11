import React from 'react'

import TabPanel from './TabPanel'


export default {
  title: 'App/MainPage/Main/ControlPanel/RequestPanel/TabPanel',
  component: TabPanel,
  parameters: {
    backgrounds: {default: 'header',},
  },

  // 因為 Storybook 不支援引用的變數
  argTypes: {
    mode: {
      name: 'mode',
      defaultValue: 'basic',
      table: {
        defaultValue: null,
        type: {
          summary: 'PanelTab.Basic | PanelTab.Schedule',
        }
      },
      control: {
        type: 'radio',
        options: [
          'basic',
          'schedule',
        ],
      }
    },
  },
}


const Template = (args) => <TabPanel {...args} />

export const Default = Template.bind({})
Default.args = {}
