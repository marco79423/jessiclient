import {createEntityAdapter, createSlice} from '@reduxjs/toolkit'


const historyAdapter = createEntityAdapter()

const historiesSlice = createSlice({
  name: 'histories',
  initialState: historyAdapter.getInitialState(),
  reducers: {
    load: (state, action) => {
      historyAdapter.setAll(state, action.payload)
    },
  },
})

export const {load} = historiesSlice.actions

export default historiesSlice.reducer
