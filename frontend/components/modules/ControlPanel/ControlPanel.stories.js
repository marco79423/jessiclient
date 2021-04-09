import React from 'react'

import ConnectionPanel from './ConnectionPanel'
import ControlPanel from './ControlPanel'
import BasicRequestPanel from './BasicRequestPanel'
import {ConnectionState} from '../../../constants'


export default {
  title: 'modules/ControlPanel/ControlPanel',
  component: ControlPanel,
}


const Template = (args) => <ControlPanel {...args} />

export const Default = Template.bind({})
Default.args = {
  connectionPanel: <ConnectionPanel url={'wss://marco79423.ent'} state={ConnectionState.Idle}/>,
  requestPanel: <BasicRequestPanel isConnected={true} isFavoriteRequest={false} requestBody={''}/>,
}
