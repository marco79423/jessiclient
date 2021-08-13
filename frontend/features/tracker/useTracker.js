import React from 'react'
import getConfig from 'next/config'
import {GA4React} from 'ga-4-react'


export default function useTracker() {
  const {publicRuntimeConfig} = getConfig()
  const [gaObj, setGAObj] = React.useState(null)

  React.useEffect(() => {
    if (!gaObj) {
      const ga4react = new GA4React(publicRuntimeConfig.gaTrackingCode)
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
