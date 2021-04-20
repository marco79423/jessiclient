export default class Scheduler {
  constructor() {
    this.handler = null
  }

  isEnabled = () => {
    return this.handler !== null
  }

  enable = (onEvent, timeInterval) => {
    if (this.isEnabled()) {
      throw new Error('已經啟動過了')
    }

    this.handler = setInterval(() => {
      onEvent()
    }, timeInterval * 1000)
  }

  disable = () => {
    if (this.handler) {
      clearInterval(this.handler)
      this.handler = null
    }
  }
}
