import {createEntityAdapter, createSlice} from '@reduxjs/toolkit'


const settingAdapter = createEntityAdapter()

const settingsSlice = createSlice({
  name: 'settings',
  initialState: settingAdapter.getInitialState(),
  reducers: {
    load: (state, action) => {
      settingAdapter.setAll(state, action.payload)
    },
  },
})

export const {load} = settingsSlice.actions

export default settingsSlice.reducer
