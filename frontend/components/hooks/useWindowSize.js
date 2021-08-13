import React from 'react'

export default function useWindowSize() {
  const [size, setSize] = React.useState({width: 0, height: 0, ready: false})
  React.useEffect(() => {
    function updateSize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
        ready: true,
      })
    }

    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}
