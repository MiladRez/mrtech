import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/HomePage/Hero";
import FeaturedProducts from "../components/HomePage/FeaturedProducts";
import { productsOnSale, popularProducts, ProductItem } from "../data/products";
import PromoDisplay from "../components/HomePage/PromoDisplay";
import Footer from "../components/Footer";
import BuildYourPC from "../components/HomePage/BuildYourPC";
import FeaturedBlogs from "../components/HomePage/FeaturedBlogs";
import SubscribeToNewsletter from "../components/HomePage/SubscribeToNewsletter";

type HomeProps = {
	locale: {
		localLang: {
			text: any,
			lang: "english" | "french"
		},
		localCurrency: "cad" | "usd"
	}
	setLocale: Function,
}

export default function Home({locale, setLocale}: HomeProps) {

	const [product, setProduct] = useState(null);
	const localLang = locale.localLang.text;

	return (
		<>
			<NavBar
				product={product}
				setProduct={setProduct}
				localLang={locale.localLang}
				setLocale={setLocale}
			/>
			<Hero localLang={locale.localLang.text} />
			<FeaturedProducts
				header={localLang.featured_products_sale_header}
				subheader={localLang.featured_products_sale_subheader}
				products={productsOnSale}
				viewAllPage={"/deals"}
				setProduct={setProduct}
				locale={locale}
			/>
			<PromoDisplay localLang={locale.localLang} />
			<BuildYourPC localLang={locale.localLang.text} />
			<FeaturedProducts
				header={localLang.featured_products_pop_header}
				subheader={localLang.featured_products_pop_subheader}
				products={popularProducts} viewAllPage={"/shop"}
				setProduct={setProduct}
				locale={locale}
			/>
			<FeaturedBlogs localLang={locale.localLang} />
			<SubscribeToNewsletter localLang={locale.localLang.text} />
			<Footer localLang={locale.localLang.text} />
		</>
	)
}