import React from 'react'
import {useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'

import useWindowSize from '../../../../../../../hooks/useWindowSize'
import {selectFilterMessageIDs} from '../../../../../../../../redux/selectors'
import List from '../../../../../../../elements/List'
import MessageFilters from './MessageFilters'
import Message from './Message'


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
}))

export default function MessageList() {
  const classes = useStyles()

  const messageIDs = useSelector(selectFilterMessageIDs)

  // TODO: 未來希望能找到方法不要用這種方式定義高度
  const {height: windowHeight} = useWindowSize()
  const [height, setHeight] = React.useState(0)
  React.useEffect(() => {
    setHeight(windowHeight - 64 - 64)
  }, [windowHeight])

  return (
    <div className={classes.root}>
      <MessageFilters/>
      <List height={height}>
        {messageIDs.map(messageID => (
          <Message key={messageID} id={messageID}/>
        ))}
      </List>
    </div>
  )
}

MessageList.propTypes = {}
