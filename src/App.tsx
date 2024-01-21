import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Deals from './pages/Deals';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Page404 from './pages/Page404';
import { CartProvider } from './components/CartContext';
import Cart from './pages/Cart';

export default function App() {
	return (
		<>
			<CartProvider>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path='/shop' element={<Shop />} />
					<Route path='/deals' element={<Deals />} />
					<Route path='/blog' element={<Blog />} />
					<Route path='/blog/:blog_id' element={<BlogPost />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='*' element={<Page404 />} />
				</Routes>	
			</CartProvider>
		</>
	)
}