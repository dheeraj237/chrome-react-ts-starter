import { useState, useEffect } from 'react'

import './Options.css'
import { ActionType } from '../types/Chrome'

export const Options = () => {
  const [countSync, setCountSync] = useState(0)

  useEffect(() => {
    chrome.storage.sync.get(['count'], (result) => {
      setCountSync(result.count || 0)
    })

    chrome.runtime.onMessage.addListener((request) => {
      if (request.type === ActionType.COUNT) {
        setCountSync(request.count || 0)
      }
    })
  }, [])

  return (
    <main>
      <h3>Options Page</h3>
      <h4>Count from Popup: {countSync}</h4>
    </main>
  )
}

export default Options
