import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Deals from './pages/Deals';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Page404 from './pages/Page404';
import { CartProvider } from './components/CartContext';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductInfo from './pages/ProductInfo';
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';
import { localityText } from './data/locality';
import ProtectedRoute from './utils/ProtectedRoute';
import { version } from "../package.json";

export default function App() {

	const localLangFromLocalStorage: {text: any, lang: "english" | "french"} = localStorage.locality
		? (localStorage.locality === "Canada (FR)"
			? {text: localityText.french, lang: "french"}
			: {text: localityText.english, lang: "english"})
		: { text: localityText.english, lang: "english" };
	
	const localCurrencyFromLocalStorage: "cad" | "usd" = localStorage.locality
		? (localStorage.locality === "USA (EN)"
			? "usd"
			: "cad")
		: "cad";
	
	const [locale, setLocale] = useState({localLang: localLangFromLocalStorage, localCurrency: localCurrencyFromLocalStorage});

	useEffect(() => {
		const currentVersion = version;
		const storedVersion = localStorage.get("appVersion");
		
		if (storedVersion !== currentVersion) {
			localStorage.clear();
			localStorage.set("appVersion", currentVersion);
		}
		
	}, []);
	
	return (
		<>
			<CartProvider>
				<Routes>

					{/* Public routes accessible for both authenticated and non-authenticated users */}
					<Route path='/' element={<Navigate to='/home' />} />
					<Route path='/login' element={<Login localLang={locale.localLang.text} />} />
					<Route path='/register' element={<Register localLang={locale.localLang.text} />} />
					<Route path='/home' element={<Home locale={locale} setLocale={setLocale} />} />
					<Route path='/shop' element={<Shop locale={locale} setLocale={setLocale} />} />
					<Route path='/deals' element={<Deals locale={locale} setLocale={setLocale} />} />
					<Route path='/product/:product_name' element={<ProductInfo locale={locale} setLocale={setLocale} />} />
					<Route path='/blog' element={<Blog localLang={locale.localLang} setLocale={setLocale} />} />
					<Route path='/blog/:blog_title' element={<BlogPost localLang={locale.localLang} setLocale={setLocale} />} />
					<Route path='/contact' element={<Contact localLang={locale.localLang} setLocale={setLocale} />} />
					<Route path='/search' element={<Search locale={locale} setLocale={setLocale} />} />
					<Route path='/search/:search_query' element={<Search locale={locale} setLocale={setLocale} />} />
					<Route path='/cart' element={<Cart locale={locale} setLocale={setLocale} />} />

					{/* Routes that require a user to be authenticated */}
					<Route path='/checkout' element={
						<ProtectedRoute>
							<Checkout locale={locale} setLocale={setLocale} />
						</ProtectedRoute>
					} />
					<Route path='/checkout/:product_name' element={
						<ProtectedRoute>
							<Checkout locale={locale} setLocale={setLocale} />
						</ProtectedRoute>
					} />
					<Route path='*' element={<Page404 localLang={locale.localLang.text} />} />
				</Routes>	
			</CartProvider>
		</>
	)
}