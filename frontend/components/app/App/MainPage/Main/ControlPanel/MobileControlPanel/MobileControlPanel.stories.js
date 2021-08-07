import React from 'react'

import ConnectionPanel from './ConnectionPanel'
import MobileControlPanel from './MobileControlPanel'
import BasicRequestPanel from './BasicRequestPanel'
import {ConnectionState} from '../../../../../../../constants'


export default {
  title: 'modules/mobile/ControlPanel/ControlPanel',
  component: MobileControlPanel,
}


const Template = (args) => <MobileControlPanel {...args} />

export const Default = Template.bind({})
Default.args = {
  connectionPanel: <ConnectionPanel url={'wss://marco79423.ent'} state={ConnectionState.Idle}/>,
  requestPanel: <BasicRequestPanel isConnected={true} isFavoriteRequest={false} requestBody={''}/>,
}
