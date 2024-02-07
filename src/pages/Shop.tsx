import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ProductListHeader from "../components/Shop/Deals Page/ProductListHeader";
import ProductList from "../components/Shop/Deals Page/ProductList";
import { allProducts } from "../data/products";

type ShopProps = {
	locale: {
		localLang: {
			text: any,
			lang: "english" | "french"
		},
		localCurrency: "cad" | "usd"
	},
	setLocale: Function
}

export default function Shop({ locale, setLocale }: ShopProps) {

	const [product, setProduct] = useState(null);

	const localLang = locale.localLang.text;

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<>
			<NavBar
				product={product}
				setProduct={setProduct}
				localLang={locale.localLang}
				setLocale={setLocale}
			/>
			<ProductListHeader title={localLang.shop_header} desc={localLang.shop_subheader} />
			<ProductList products={allProducts} setProduct={setProduct} locale={locale} />
			<Footer localLang={locale.localLang.text} />
		</>
	)
}