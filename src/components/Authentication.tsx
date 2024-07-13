// src/components/Auth.tsx
import React from "react";
import { auth } from "../firebaseConfigs";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { Button } from "./ui/button";

const Authentication: React.FC = () => {
	const signInWithGoogle = () => {
		// signInWithPopup(auth, googleProvider);

		chrome.identity.getAuthToken({ interactive: true }, (token) => {
			if (chrome.runtime.lastError || !token) {
				console.error(
					`SSO ended with an error: ${JSON.stringify(chrome.runtime.lastError)}`
				);
				return;
			}
			signInWithCredential(auth, GoogleAuthProvider.credential(null, token))
				.then((res) => {
					console.log("signed in!", res);
				})
				.catch((err) => {
					alert(`SSO ended with an error: ${err}`);
				});
		});
	};

	return (
		<div>
			<Button onClick={signInWithGoogle}>Sign in with Google</Button>
		</div>
	);
};

export default Authentication;
