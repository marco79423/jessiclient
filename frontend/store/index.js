import {configureStore} from '@reduxjs/toolkit'

import {LoadingState} from '../constants'
import reducer, {getProjectData, getProjectState} from '../slices'

const projectAutoSaver = store => next => action => {
  try {
    return next(action)
  } finally {
    const state = store.getState()
    if (getProjectState(state) === LoadingState.Loaded) {
      const projectData = getProjectData(state)
      localStorage.setItem('projectData', JSON.stringify(projectData))
    }
  }
}


const store = configureStore({
  reducer: reducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => [
    projectAutoSaver,
    ...getDefaultMiddleware(),
  ],
})

export default store
