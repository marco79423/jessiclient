import {combineReducers, configureStore} from '@reduxjs/toolkit'

import currentSlice from '../current'
import projectSlice from '../project'

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
