import React from 'react'

import {ConnectionState} from '../../../../../../../constants'
import ConnectionPanel from './ConnectionPanel'


export default {
  title: 'App/MainPage/Main/ControlPanel/ConnectionPanel',
  component: ConnectionPanel,
  argTypes: {
    state: {
      control: {
        type: 'select',
        options: Object.values(ConnectionState)
      }
    },
  },
}


const Template = (args) => <ConnectionPanel {...args} />

export const Default = Template.bind({})
Default.args = {
  state: ConnectionState.Idle
}
