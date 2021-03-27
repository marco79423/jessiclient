import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'

import {LoadingState} from '../constants'
import {changeProjectState, getProjectState, getSelectedMessageID, setProjectData} from '../slices'
import ListPanel from '../components/modules/ListPanel'
import ControlPanel from '../components/modules/ControlPanel'
import DetailPanel from '../components/modules/DetailPanel'
import Toolbar from '../components/modules/Toolbar'
import DefaultLayout from '../components/layouts/DefaultLayout'
import {loadProjectDataFromLocalStorage, loadProjectDataFromSharingServer} from '../features/project'
import useAsyncEffect from 'use-async-effect'

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  }
})

export default function Index() {
  const [loading] = initialize()
  const detailOpen = useDetailOpen()
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

function initialize() {
  const dispatch = useDispatch()
  const projectState = useSelector(getProjectState)

  const loading = projectState === LoadingState.Loading

  useAsyncEffect(async () => {
    await dispatch(changeProjectState(LoadingState.Loading))

    const projectData = await loadProjectData()
    if (projectData) {
      await dispatch(setProjectData(projectData))
    }
    await dispatch(changeProjectState(LoadingState.Loaded))
  }, [])

  return [loading]
}

function useDetailOpen() {
  const messageID = useSelector(getSelectedMessageID)
  return messageID !== null
}

async function loadProjectData() {
  const projectCode = new URLSearchParams(window.location.search).get('projectCode')
  if (projectCode) {
    return await loadProjectDataFromSharingServer(projectCode)
  }

  try {
    return await loadProjectDataFromLocalStorage()
  } catch {
    return null
  }
}
