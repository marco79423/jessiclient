import {useEffect, useState} from 'react'

export default function useWindowSize() {
  const [size, setSize] = useState({width: 0, height: 0, ready: false})
  useEffect(() => {
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
