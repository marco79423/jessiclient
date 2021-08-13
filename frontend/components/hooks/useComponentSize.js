import React from 'react'

export default function useComponentSize(componentRef) {
  if (!componentRef) {
    throw new Error('必須要提供 ref (使用 useRef)')
  }

  const [size, setSize] = React.useState({
    width: 0,
    height: 0,
    ready: false,
  })

  const getSize = () => ({
    width: componentRef.current.offsetWidth,
    height: componentRef.current.offsetHeight,
  })

  React.useEffect(() => {
    const handleResize = () => {
      if (componentRef.current) {
        setSize({
          ...getSize(),
          ready: true,
        })
      }
    }

    if (componentRef.current) {
      setSize({
        ...getSize(),
        ready: true,
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [componentRef.current])

  return size
}
