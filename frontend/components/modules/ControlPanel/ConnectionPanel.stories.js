import React from 'react'

import ConnectionPanel from './ConnectionPanel'
import {ConnectionState} from '../../../constants'


export default {
  title: 'modules/ControlPanel/ConnectionPanel',
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
