import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'


const currentSlice = createSlice({
  name: 'current',
  initialState: {
    connectionState: 'idle', // idle, connecting, connected, closed
    selectedHistoryID: null,
  },
  reducers: {
    historySelected(state, action) {
      state.selectedHistoryID = action.payload
    },
    historyUnselected(state) {
      state.selectedHistoryID = null
    }
  },
})


const selectHistory = createAsyncThunk(
  'current/selectHistory',
  async (historyID, {dispatch}) => {
    await dispatch(currentSlice.actions.historySelected(historyID))
  }
)

const unselectHistory = createAsyncThunk(
  'current/selectHistory',
  async (historyID, {dispatch}) => {
    await dispatch(currentSlice.actions.historyUnselected(historyID))
  }
)


const selectSelectedHistoryID = state => state.current.selectedHistoryID

// Actions
export {selectHistory, unselectHistory}

// Selectors
export {selectSelectedHistoryID}

// Reducer
export default currentSlice.reducer
