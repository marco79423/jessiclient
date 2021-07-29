import React, {useEffect, useState} from 'react'
import {GA4React} from 'ga-4-react'


export default function useTracker() {
  const [gaObj, setGAObj] = useState(null)

  useEffect(() => {
    if (!gaObj) {
      const ga4react = new GA4React('G-TQZV496TYL')
      ga4react.initialize()
        .then((ga4) => {
          setGAObj(ga4)
        })
        .catch(() => {
          // 什麼都不做
        })
    }
  }, [])

  return {
    trace: (key, data) => {
      if (gaObj) {
        gaObj.gtag('event', key, data)
      }
    }
  }
}
