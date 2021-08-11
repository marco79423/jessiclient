import React, {useEffect, useState} from 'react'
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

  const filteredMessageIDs = useSelector(selectFilterMessageIDs)

  const [height, setHeight] = useState(0)

  // TODO: 不要用這種方式定義高度
  const {height: windowHeight} = useWindowSize()
  useEffect(() => {
    setHeight(windowHeight - 64 - 64)
  }, [windowHeight])

  return (
    <div className={classes.root}>
      <MessageFilters/>
      <List height={height}>
        {filteredMessageIDs.map(filteredMessageID => (
          <Message key={filteredMessageID} id={filteredMessageID}/>
        ))}
      </List>
    </div>
  )
}

MessageList.propTypes = {}
