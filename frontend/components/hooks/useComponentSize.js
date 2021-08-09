import React from 'react'

export default function useComponentSize(componentRef) {
  if (!componentRef) {
    throw new Error('必須要提供 ref (使用 useRef)')
  }

  const [size, setSize] = React.useState({width: 0, height: 0})

  const getSize = () => ({
    width: componentRef.current.offsetWidth,
    height: componentRef.current.offsetHeight,
  })

  React.useEffect(() => {
    const handleResize = () => {
      console.log(size)
      setSize(getSize())
    }

    if (componentRef.current) {
      console.log(size)
      setSize(getSize())
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [componentRef.current])

  return size
}
