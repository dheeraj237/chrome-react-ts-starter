import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfigs";

import "./Options.css";
import { ActionType } from "../types/Chrome";
import Authentication from "../components/Authentication";
import { Card } from "@/components/ui/card";

export const Options = () => {
	const [countSync, setCountSync] = useState(0);
	const [user] = useAuthState(auth);

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
			<h3>Options Page</h3>
			<h4>Count from Popup: {countSync}</h4>
			{user ? (
				<Card>
					<div className="flex items-center space-x-4">
						<div className="h-12 w-12 rounded-full">
							<img
								src={user.photoURL || ""}
								alt="User Avatar"
								className="w-16 h-16 rounded-full"
							/>
						</div>
						<div className="space-y-2">
							<div className="h-4 w-[250px]">{user.displayName}</div>
							<div className="h-4 w-[200px]">{user.email}</div>
						</div>
					</div>
				</Card>
			) : (
				<Authentication />
			)}
		</div>
	);
};

export default Options;
