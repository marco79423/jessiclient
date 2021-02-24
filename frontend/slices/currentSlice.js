import {createSlice} from '@reduxjs/toolkit'

const currentSlice = createSlice({
  name: 'current',
  initialState: {
    connectionState: 'idle', // idle, connecting, connected, closed
  },
  reducers: {

  },
})

export const selectConnectionState = (state) => state.connectionState

export default currentSlice.reducer
