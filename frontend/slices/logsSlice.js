import {createEntityAdapter, createSlice} from '@reduxjs/toolkit'


const logAdapter = createEntityAdapter()

const logsSlice = createSlice({
  name: 'histories',
  initialState: logAdapter.getInitialState(),
  reducers: {
    load: (state, action) => {
      logAdapter.setAll(state, action.payload)
    },
  },
})

export const {load} = logsSlice.actions

export default logsSlice.reducer
