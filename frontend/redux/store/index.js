import {combineReducers, configureStore} from '@reduxjs/toolkit'

import {LoadingState} from '../../constants'
import currentSlice from '../current'
import projectSlice from '../project'
import {getProjectData, getProjectState} from '../selectors'
import {saveProjectDataToLocalStorage} from '../../features/projectLoader/useProjectLoader'

const projectAutoSaver = store => next => async action => {
  try {
    return next(action)
  } finally {
    const state = store.getState()
    if (getProjectState(state) === LoadingState.Loaded) {
      const projectData = getProjectData(state)
      await saveProjectDataToLocalStorage(projectData)
    }
  }
}


const store = configureStore({
  reducer: combineReducers({
    current: currentSlice.reducer,
    project: projectSlice.reducer,
  }),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => [
    projectAutoSaver,
    ...getDefaultMiddleware(),
  ],
})

export default store
