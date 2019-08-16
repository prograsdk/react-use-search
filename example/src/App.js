import React from 'react'

import { useMyHook } from 'use-search'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
