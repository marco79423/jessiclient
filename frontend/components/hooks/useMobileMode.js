import useWindowSize from './useWindowSize'

export default function useMobileMode() {
  const {width: windowWidth} = useWindowSize()
  return windowWidth <= 500
}
