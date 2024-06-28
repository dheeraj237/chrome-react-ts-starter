import React from "react";
import ReactDOM from "react-dom/client";
import Popup from "./popup/popup";
import Options from "./options/options";
import Tabs from "./tabs/tabs";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Popup />
			<Options />
			<Tabs />
		</BrowserRouter>
	</React.StrictMode>
);
