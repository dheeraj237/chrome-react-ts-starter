import { useState, useEffect } from "react";

import "./SidePanel.css";
import { ActionType } from "../types/Chrome";

export const SidePanel = () => {
	const [countSync, setCountSync] = useState(0);

	useEffect(() => {
		chrome.storage.sync.get(["count"], (result) => {
			setCountSync(result.count || 0);
		});

		chrome.runtime.onMessage.addListener((request) => {
			if (request.type === ActionType.COUNT) {
				setCountSync(request.count || 0);
			}
		});
	}, []);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h3>SidePanel Page</h3>
			<h4>Count from Popup: {countSync}</h4>
		</div>
	);
};

export default SidePanel;
