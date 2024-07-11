import { useState, useEffect } from 'react'

import './Popup.css'
import { ActionType } from '../types/Chrome'

export const Popup = () => {
  const [count, setCount] = useState(0)
  const [sidePanelEnabled, setsidePanelEnabled] = useState(true)

  const minus = () => {
    if (count > 0) setCount(count - 1)
  }

  const add = () => setCount(count + 1)

  useEffect(() => {
    chrome.storage.sync.get(['count'], (result) => {
      setCount(result.count || 0)
    })
  }, [])

  useEffect(() => {
    chrome.storage.sync.set({ count })
    chrome.runtime.sendMessage({ type: ActionType.COUNT, count })
  }, [count])

  const handleOpenSidePanel = async () => {
    let queryOptions = { active: true }
    chrome.tabs.query(queryOptions, ([tab]) => {
      if (tab) {
        setsidePanelEnabled(!sidePanelEnabled)
        chrome.runtime.sendMessage({
          type: ActionType.TOGGLE_SIDEPANEL,
          tabId: tab.id,
          windowId: tab.windowId,
          enable: sidePanelEnabled,
        })
      }
    })
  }

  return (
    <main>
      <h3>Popup Page</h3>
      <div className="calc">
        <button onClick={minus} disabled={count <= 0}>
          -
        </button>
        <label>{count}</label>
        <button onClick={add}>+</button>
      </div>
      <button onClick={handleOpenSidePanel}>
        {sidePanelEnabled ? 'Open' : 'Close'} Side Panel
      </button>
    </main>
  )
}

export default Popup
