import {configureStore} from '@reduxjs/toolkit'
import currentReducer from '../slices/currentSlice'
import projectReducer from '../slices/projectSlice'
import historyReducer from '../slices/historySlice'
import logReducer from '../slices/logSlice'

const store = configureStore({
  reducer: {
    current: currentReducer,
    project: projectReducer,
    history: historyReducer,
    log: logReducer,
  },
})

export default store
