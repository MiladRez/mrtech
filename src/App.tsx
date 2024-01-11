import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Deals from './pages/Deals';
import Contact from './pages/Contact';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path='/shop' element={<Shop />} />
				<Route path='/deals' element={<Deals />} />
				<Route path='/blog' element={<Deals />} />
				<Route path='/contact' element={<Contact />} />
			</Routes>
		</>
	)
}

export default App;