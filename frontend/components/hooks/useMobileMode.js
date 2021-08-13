import useWindowSize from './useWindowSize'

export default function useMobileMode() {
  const {width, ready} = useWindowSize()

  // 初始的時候先給完整的內容
  if (!ready) {
    return false
  }

  return width <= 500
}
