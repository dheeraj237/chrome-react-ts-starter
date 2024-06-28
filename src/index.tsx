import React from "react";
import ReactDOM from "react-dom/client";
import Popup from "./popup/popup";
import Options from "./options/options";
import Tabs from "./tabs/tabs";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./index.css";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<div className="home">
				<h1>Navigate to Desired Component</h1>
				<ul>
					<li>
						<Link to="/">Popup</Link>
					</li>
					<li>
						<Link to="/options">Options</Link>
					</li>
					<li>
						<Link to="/tabs">Tabs</Link>
					</li>
				</ul>
				<Routes>
					<Route path="/" element={<Popup />} />
					<Route path="/options" element={<Options />} />
					<Route path="/tabs" element={<Tabs />} />
				</Routes>
			</div>
		</BrowserRouter>
	</React.StrictMode>
);
