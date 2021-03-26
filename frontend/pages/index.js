import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'

import {LoadingState} from '../constants'
import {getProjectState, getSelectedMessageID, initialize} from '../slices'
import ListPanel from '../components/modules/ListPanel'
import ControlPanel from '../components/modules/ControlPanel'
import DetailPanel from '../components/modules/DetailPanel'
import Toolbar from '../components/modules/Toolbar'
import DefaultLayout from '../components/layouts/DefaultLayout'

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  }
})

export default function Index() {
  const dispatch = useDispatch()
  const projectState = useSelector(getProjectState)

  useEffect(() => {
    dispatch(initialize())
  }, [])

  const messageID = useSelector(getSelectedMessageID)

  const loading = projectState === LoadingState.Loading
  const detailOpen = messageID !== null

  return (
    <DefaultLayout
      loading={loading}
      detailOpen={detailOpen}
      toolbar={<Toolbar/>}
      controlPanel={<ControlPanel/>}
      listPanel={<ListPanel/>}
      detailPanel={<DetailPanel/>}
    />
  )
}
