import {createEntityAdapter, createSlice} from '@reduxjs/toolkit'


const requestAdapter = createEntityAdapter()

const requestsSlice = createSlice({
  name: 'requests',
  initialState: requestAdapter.getInitialState(),
  reducers: {
    load: (state, action) => {
      requestAdapter.setAll(state, action.payload)
    },
  },
})

export const {load} = requestsSlice.actions

export default requestsSlice.reducer
