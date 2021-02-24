export function createEmptyProject() {
  return {
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
}
