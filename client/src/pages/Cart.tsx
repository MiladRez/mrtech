import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import FeaturedProducts from "../components/HomePage/FeaturedProducts";
import { ProductItem, getAllProductsFromDB } from "../data/products";
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
	const [freqBoughtTogetherList, setFreqBoughtTogetherList] = useState([] as ProductItem[]);
	const [productList, setProductList] = useState<ProductItem[]>([])

	useEffect(() => {
		const getProductList = async () => {
			const data = await getAllProductsFromDB();
			setProductList(data);
		}
		getProductList();
	}, []);

	const localLang = locale.localLang.text;

	useEffect(() => {
		const randomProductsList = productList.sort(() => 0.5 - Math.random());
		setFreqBoughtTogetherList(randomProductsList.slice(0, 4));
	}, [productList]);

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