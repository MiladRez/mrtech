import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/HomePage/Hero";
import FeaturedProducts from "../components/HomePage/FeaturedProducts";
import { getProductsOnSaleFromDB, getPopularProductsFromDB, ProductItem } from "../data/products";
import PromoDisplay from "../components/HomePage/PromoDisplay";
import Footer from "../components/Footer";
import BuildYourPC from "../components/HomePage/BuildYourPC";
import FeaturedBlogs from "../components/HomePage/FeaturedBlogs";
import SubscribeToNewsletter from "../components/HomePage/SubscribeToNewsletter";
import {BlogItem, getAllBlogsFromDB} from "../data/blogs";

import RazerTomahawkCase from "../images/razer-tomahawk-case.jpeg";

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

	const [productsOnSale, setProductsOnSale] = useState<ProductItem[]>([
		{

			id: "12",
			img: RazerTomahawkCase,
			name: "Test",
			manufacturer: "Test",
			price: {
				cad: 123,
				usd: 134
			},
			salePrice: {
				cad: 123,
				usd: 134
			},
			stock: 123,
			rating: 2,
			numOfReviews: 45,
			features: {
				english: ["test"],
				french: ["test"]
			}
		}
	]);
	const [popularProducts, setPopularProducts] = useState<ProductItem[]>([]);
	const [blogList, setBlogList] = useState<BlogItem[]>([]);

	useEffect(() => {
		const getProductList = async () => {
			const response_productOnSale = await getProductsOnSaleFromDB();
			const response_popularProducts = await getPopularProductsFromDB();
			setProductsOnSale(response_productOnSale);
			setPopularProducts(response_popularProducts)
		}
		getProductList();
	}, []);

	useEffect(() => {
		const getBlogList = async () => {
			const data = await getAllBlogsFromDB();
			setBlogList(data);
		}
		getBlogList();
	}, []);

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
			<FeaturedBlogs localLang={locale.localLang} blogs={blogList} />
			<SubscribeToNewsletter localLang={locale.localLang.text} />
			<Footer localLang={locale.localLang.text} />
		</>
	)
}