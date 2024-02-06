import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import ProductListHeader from "../components/Shop/Deals Page/ProductListHeader";
import ProductList from "../components/Shop/Deals Page/ProductList";
import Footer from "../components/Footer";
import { productsOnSale } from "../data/products";

type DealsProps = {
	locale: {
		localLang: {
			text: any,
			lang: "english" | "french"
		},
		localCurrency: "cad" | "usd"
	},
	setLocale: Function
}

export default function Deals({ locale, setLocale }: DealsProps) {

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
				localLang={locale.localLang.text}
				setLocale={setLocale}
			/>
			<ProductListHeader title={localLang.deals_header} desc={localLang.deals_subheader} />
			<ProductList products={productsOnSale} setProduct={setProduct} locale={locale} />
			<Footer localLang={locale.localLang.text} />
		</>
	)
}