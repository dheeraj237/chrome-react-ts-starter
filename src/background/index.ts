import { ActionType, ContextMenuAction } from '../types/Chrome'
import packageData from '../../package.json'

let isSidePanelEnabled = false

chrome.runtime.onMessage.addListener((request) => {
  console.log(`Recieved Action Type: ${request.type}`)
  if (request.type === ActionType.COUNT) {
    console.log('backgroud script, recieved count: ', request?.count)
  }
  if (request.type === ActionType.TOGGLE_SIDEPANEL) {
    if (request?.enable) {
      // opening side panel
      chrome.sidePanel.setOptions({ enabled: true, tabId: request?.tabId, path: chrome.runtime.getManifest().side_panel.default_path })
      chrome.sidePanel.open({ tabId: request?.tabId, windowId: request?.windowId})
      isSidePanelEnabled = true
    } else {
      chrome.sidePanel.setOptions({ enabled: false, tabId: request?.tabId })
      isSidePanelEnabled = false
    }
  }
})

// register context menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: ContextMenuAction.OPEN_SIDE_PANEL,
    title: packageData.displayName,
    contexts: ['all'],
  })
})
// context menu click event listener
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (tab) {
    isSidePanelEnabled = !isSidePanelEnabled
    if (isSidePanelEnabled) {
      chrome.sidePanel.setOptions({
        enabled: true,
        tabId: tab?.id,
        path: chrome.runtime.getManifest().side_panel.default_path,
      })
      chrome.sidePanel.open({ tabId: tab?.id, windowId: tab?.windowId })
    } else {
      chrome.sidePanel.setOptions({ enabled: isSidePanelEnabled, tabId: tab?.id })
    }
  }
})
