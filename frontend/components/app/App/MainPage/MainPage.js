import React, {useEffect} from 'react'
import {CssBaseline} from '@material-ui/core'
import Header from './Header'
import Main from './Main'
import {useDispatch, useSelector} from 'react-redux'
import useMobileMode from '../../../hooks/useMobileMode'
import {getSelectedMessageID} from '../../../../redux/selectors'


/**
 * 應用的主頁面
 * @returns {JSX.Element}
 * @constructor
 */
export default function MainPage() {
  const dispatch = useDispatch()
  const mobileMode = useMobileMode()

  const selectedMessageID = useSelector(getSelectedMessageID)
  useEffect(() => {
    // if (mobileMode) {
    //   if (selectedMessageID) {
    //     dispatch(changeMobileDisplayMode(AppMobileDisplayMode.DetailPanel))
    //   } else {
    //     dispatch(changeMobileDisplayMode(AppMobileDisplayMode.ListPanel))
    //   }
    // } else {
    //   if (selectedMessageID) {
    //     dispatch(changeWebDisplayMode(AppWebDisplayMode.DetailPanelOn))
    //   } else {
    //     dispatch(changeWebDisplayMode(AppWebDisplayMode.DetailPanelOff))
    //   }
    // }
  }, [mobileMode, selectedMessageID])

  return (
    <>
      <CssBaseline/>

      {/*主要內容*/}
      <Header/>
      <Main/>
    </>
  )
}
