import {configureStore} from '@reduxjs/toolkit'
import reducer, {getProjectData, getProjectState} from '../slices'
import {LoadingState} from '../constants'

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
    middleware: (getDefaultMiddleware) => [
        projectAutoSaver,
        ...getDefaultMiddleware(),
    ],
})

export default store
