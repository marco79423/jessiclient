import {createEntityAdapter, createSlice} from '@reduxjs/toolkit'


const projectAdapter = createEntityAdapter()

const projectsSlice = createSlice({
  name: 'projects',
  initialState: projectAdapter.getInitialState(),
  reducers: {
    load: (state, action) => {
      projectAdapter.setAll(state, action.payload)
    },
  },
})

export const {load} = projectsSlice.actions

export default projectsSlice.reducer
