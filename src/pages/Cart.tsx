import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import FeaturedProducts from "../components/HomePage/FeaturedProducts";
import { allProducts } from "../data/products";
import CartList from "../components/CartPage/CartList";

type CartProps = {
	locale: {
		localLang: {
			text: any,
			lang: "english" | "french"
		},
		localCurrency: "cad" | "usd"
	},
	setLocale: Function
}

export default function Cart({locale, setLocale}: CartProps) {

	const [product, setProduct] = useState(null);

	const localLang = locale.localLang.text;

	const randomProductsList = allProducts.sort(() => 0.5 - Math.random());
	let freqBoughtTogetherList = randomProductsList.slice(0, 4);

	return (
		<>
			<NavBar
				product={product}
				setProduct={setProduct}
				localLang={locale.localLang}
				setLocale={setLocale}
			/>
			<CartList locale={locale} />
			<FeaturedProducts
				header={localLang.cart_freq_bought_together_header}
				subheader={localLang.cart_freq_bought_together_subheader}
				products={freqBoughtTogetherList}
				viewAllPage="/shop"
				setProduct={setProduct}
				locale={locale}
			/>
			<Footer localLang={locale.localLang.text} />
		</>
	)
}