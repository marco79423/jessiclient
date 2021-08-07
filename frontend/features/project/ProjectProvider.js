import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import useAsyncEffect from 'use-async-effect'
import generateRandomString from 'paji-sdk/dist/utils/generateRandomString'
import {useTranslation} from 'next-i18next'
import {Backdrop, CircularProgress} from '@material-ui/core'

import {LoadingState} from '../../constants'
import {getFavoriteRequestCategories, getProjectData, getProjectState} from '../../redux/selectors'
import {changeProjectState} from '../../redux/current'
import {addFavoriteRequestCategory, setProjectData} from '../../redux/project'
import {
  loadProjectDataFromLocalStorage,
  loadProjectDataFromSharingServer,
  saveProjectDataToLocalStorage
} from './useProject'


/**
 * 處理 Project Loader 的 Provider
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export default function ProjectProvider({children}) {
  const dispatch = useDispatch()
  const {t} = useTranslation()

  const projectState = useSelector(getProjectState)
  const projectData = useSelector(getProjectData)
  const favoriteRequestCategories = useSelector(getFavoriteRequestCategories)

  useAsyncEffect(async () => {
    await dispatch(changeProjectState(LoadingState.Loading))

    const projectData = await loadProjectData()
    if (projectData) {
      await dispatch(setProjectData(projectData))
    }

    await dispatch(changeProjectState(LoadingState.Loaded))
  }, [])


  useEffect(() => {
    if (favoriteRequestCategories.length === 0) {
      dispatch(addFavoriteRequestCategory({
        id: generateRandomString(),
        label: t('未分類'),
        readonly: true,
      }))
    }
  }, [favoriteRequestCategories])

  useAsyncEffect(async () => {
    if (projectState === LoadingState.Loaded) {
      await saveProjectDataToLocalStorage(projectData)
    }
  }, [projectData, projectState])

  return (
    <>
      <Backdrop style={{zIndex: 100}} open={projectState === LoadingState.Loading}>
        <CircularProgress color="inherit"/>
      </Backdrop>

      {children}
    </>
  )
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
