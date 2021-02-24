import {createEntityAdapter, createSlice} from '@reduxjs/toolkit'


const logAdapter = createEntityAdapter()

const logSlice = createSlice({
  name: 'log',
  initialState: {
    state: '',
    data: logAdapter.getInitialState(),
  },
  reducers: {
    loaded: (state, action) => {
      logAdapter.setAll(state.data, action.payload)
    },
  },
})

export const {loaded} = logSlice.actions

export default logSlice.reducer
