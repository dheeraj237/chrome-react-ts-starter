import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import './tabs.css'
import { Link } from 'react-router-dom'

function Tabs() {
    return (
			<div>
				<ul>
					<li>
						<Link to="/home">Home</Link>
					</li>
					<li>
						<Link to="/about">About</Link>
					</li>
				</ul>
				<hr />
				<h1>Tab Content</h1>
				<Routes>
					<Route path="/home" element={<Home />} />
					<Route path="/about" element={<About />} />
				</Routes>
			</div>
		);
}

export default Tabs