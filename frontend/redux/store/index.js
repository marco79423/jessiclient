import {combineReducers, configureStore} from '@reduxjs/toolkit'

import {LoadingState} from '../../constants'
import currentSlice from '../current'
import projectSlice from '../project'
import {getProjectData, getProjectState} from '../selectors'
import {saveProjectDataToLocalStorage} from '../../features/project/useProject'

const store = configureStore({
  reducer: combineReducers({
    current: currentSlice.reducer,
    project: projectSlice.reducer,
  }),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
  ],
})

export default store
