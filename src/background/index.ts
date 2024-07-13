import { ActionType, ContextMenuAction } from "../types/Chrome";
import packageData from "../../package.json";

var isSidePanelEnabled = true;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	console.log(`Recieved Action Type: ${request.type}`);

	if (request.type === ActionType.TOGGLE_SIDEPANEL) {
		handleSidePanel(isSidePanelEnabled, request);
		sendResponse(isSidePanelEnabled);
	}
});

// register context menu
chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: ContextMenuAction.OPEN_SIDE_PANEL,
		title: packageData.displayName,
		contexts: ["all"],
	});
});
// context menu click event listener
chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (tab && isSidePanelEnabled) {
		handleSidePanel(true, tab); // always open only as this fails when open and close
	}
});

function handleSidePanel(enable: boolean, tab: any) {
	try {
		if (enable) {
			chrome.sidePanel.setOptions({
				enabled: enable,
				path: chrome.runtime.getManifest().side_panel.default_path,
			});
			chrome.sidePanel.open({ tabId: tab?.id, windowId: tab?.windowId });
			isSidePanelEnabled = false;
		} else {
			chrome.sidePanel.setOptions({
				enabled: enable,
				tabId: tab?.id,
			});
			isSidePanelEnabled = true;
		}
	} catch (error) {
		console.error("Error in handleSidePanel", error);
	}
}