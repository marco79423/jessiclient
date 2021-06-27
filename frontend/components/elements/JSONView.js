import React from 'react'
import dynamic from 'next/dynamic'


const ReactJson = dynamic(() => import('react-json-view'), {ssr: false})

export default function JSONView({data}) {
  return (
    <ReactJson src={data} indentWidth={2}/>
  )
}
