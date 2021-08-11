import React from 'react'

import BottomControlBar from './BottomControlBar'


export default {
  title: 'App/MainPage/Main/ControlPanel/RequestPanel/TabPanel/BottomControlBar',
  component: BottomControlBar,

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


const Template = (args) => <BottomControlBar {...args} />

export const Default = Template.bind({})
Default.args = {}
