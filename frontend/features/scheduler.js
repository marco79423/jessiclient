class Scheduler {
  constructor() {
    this.handler = null
    this.onEvent = null
  }

  setOnEvent = (onEvent) => {
    this.onEvent = onEvent
  }

  isEnabled = () => {
    return this.handler !== null
  }

  enable = (timeInterval) => {
    if (this.isEnabled()) {
      throw new Error('已經啟動過了')
    }

    this.handler = setInterval(() => {
      this.onEvent()
    }, timeInterval * 1000)
  }

  disable = () => {
    if (this.handler) {
      clearInterval(this.handler)
      this.handler = null
    }
  }
}

export default new Scheduler()
