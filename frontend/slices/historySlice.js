import {createEntityAdapter, createSlice} from '@reduxjs/toolkit'


const historyAdapter = createEntityAdapter()

const historySlice = createSlice({
  name: 'history',
  initialState: {
    state: 'idle',
    data: historyAdapter.getInitialState(),
  },
  reducers: {
    loaded: (state, action) => {
      historyAdapter.setAll(state.data, action.payload)
    },
  },
})

export const {loaded} = historySlice.actions

export default historySlice.reducer
