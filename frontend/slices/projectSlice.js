import {createEntityAdapter, createSlice} from '@reduxjs/toolkit'


const projectAdapter = createEntityAdapter()

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    state: '', // loading, loaded, failed
    data: {
      // 設定
      setting: {
        reconnectTimes: 3
      },

      // 連線資訊
      connection: {
        url: '',
      },

      // 請求
      request: {
        text: '',
        format: 'json'
      }
    }
  },
  reducers: {

  },
})

export default projectSlice.reducer
