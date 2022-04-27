import React from 'react'


const ReactJson = React.lazy(() => import('react-json-view'))

/**
 * 展示 JSON 的組件
 * @param {object} data -  JSON 內容
 * @returns {JSX.Element}
 */
export default function JSONView({data}) {
  return (
    <React.Suspense fallback={<div>Loading ...</div>}>
      <ReactJson src={data} indentWidth={2}/>
    </React.Suspense>
  )
}
