import React from 'react';
import { Routes, Route, ActionFunction, ActionFunctionArgs } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Deals from './pages/Deals';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path='/shop' element={<Shop />} />
				<Route path='/deals' element={<Deals />} />
				<Route path='/blog' element={<Blog />} />
				<Route path='/blog/:blog_id' element={<BlogPost />} />
				<Route path='/contact' element={<Contact />} />
			</Routes>
		</>
	)
}

export default App;