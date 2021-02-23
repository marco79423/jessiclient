import {createSlice} from '@reduxjs/toolkit'

const currentSlice = createSlice({
  name: 'current',
  initialState: {
    projectID: null,
  },
  reducers: {
    load: (state, action) => {
      state.projectID = action.payload.projectID
    },
  },
})

export const selectProjectID = (state) => state.projectID

export const {load} = currentSlice.actions

export default currentSlice.reducer
