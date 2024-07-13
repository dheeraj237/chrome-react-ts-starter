import { useState, useEffect } from "react";

import "./Popup.css";
import { ActionType } from "../types/Chrome";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfigs";
import { Button } from "../components/ui/button";
import { Card } from "@/components/ui/card";

export const Popup = () => {
	const [count, setCount] = useState(0);
	const [sidePanelEnabled, setsidePanelEnabled] = useState(true);
	const [user] = useAuthState(auth);

	const minus = () => {
		if (count > 0) setCount(count - 1);
	};

	const add = () => setCount(count + 1);

	useEffect(() => {
		chrome.storage.sync.get(["count"], (result) => {
			setCount(result.count || 0);
		});
	}, []);

	useEffect(() => {
		chrome.storage.sync.set({ count });
		chrome.runtime.sendMessage({ type: ActionType.COUNT, count });
	}, [count]);

	const handleOpenSidePanel = async () => {
		let queryOptions = {
			active: true,
			currentWindow: true,
			lastFocusedWindow: true,
		};
		chrome.tabs.query(queryOptions, (tabs) => {
			if (tabs && tabs.length > 0) {
				chrome.runtime.sendMessage(
					{
						type: ActionType.TOGGLE_SIDEPANEL,
						tabId: tabs[0].id,
						windowId: tabs[0].windowId,
					},
					(res) => setsidePanelEnabled(res)
				);
			}
		});
	};

	return (
		<div className="popupContainer flex flex-col items-center justify-center min-h-screen rounded-lg bg-gray-100 p-4">
			<h3 className="text-2xl font-bold mb-4">Popup Page</h3>
			<div className="calc flex items-center space-x-2">
				<Button onClick={minus} disabled={count <= 0}>
					-
				</Button>
				<label className="text-xl font-bold">{count}</label>
				<Button onClick={add}>+</Button>
			</div>
			<Button className="mt-4" onClick={handleOpenSidePanel}>
				{sidePanelEnabled ? "Open" : "Close"} Side Panel
			</Button>
			{user ? (
				<Card className="m-4 p-4 bg-white rounded-lg shadow-md">
					<div className="flex items-center space-x-4">
						<div className="ml-5 h-12 w-12 rounded-full overflow-hidden">
							<img
								src={user.photoURL || ""}
								alt="User Avatar"
								className="w-16 h-16 rounded-full"
							/>
						</div>
						<div className="space-y-2">
							<div className="h-4 w-60 text-bold text-xl mb-1">
								{user.displayName}
							</div>
							<div className="h-4 w-60">{user.email}</div>
						</div>
					</div>
				</Card>
			) : (
				<Button
					className="mt-4"
					onClick={() => chrome.runtime.openOptionsPage()}
				>
					Sign in
				</Button>
			)}
		</div>
	);
};

export default Popup;
