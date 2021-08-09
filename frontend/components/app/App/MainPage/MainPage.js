import React from 'react'
import {CssBaseline} from '@material-ui/core'
import Header from './Header'
import Main from './Main'
import {makeStyles} from '@material-ui/core/styles'
import useWindowSize from '../../../hooks/useWindowSize'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    height: 64,
  },
  main: {
    flexGrow: 1
  }
}))

/**
 * 應用的主頁面
 * @returns {JSX.Element}
 * @constructor
 */
export default function MainPage() {
  const classes = useStyles()

  // 解決 Safari 無法正常使用 100vh 的問題，所以直接使用 innerHeight
  const {height} = useWindowSize()

  return (
    <>
      <CssBaseline/>

      {/*主要內容*/}
      <div className={classes.root} style={{height: height}}>
        <div className={classes.header}>
          <Header/>
        </div>
        <div className={classes.main}>
          <Main/>
        </div>
      </div>
    </>
  )
}
