import {createEntityAdapter, createSlice} from '@reduxjs/toolkit'


const connectionAdapter = createEntityAdapter()

const connectionsSlice = createSlice({
  name: 'connections',
  initialState: connectionAdapter.getInitialState(),
  reducers: {
    load: (state, action) => {
      connectionAdapter.setAll(state, action.payload)
    },
  },
})

export const {load} = connectionsSlice.actions

export default connectionsSlice.reducer
