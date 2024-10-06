import React, {useEffect, useState} from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SearchHeader from "../components/SearchPage/SearchHeader";
import SearchResults from "../components/SearchPage/SearchResults";
import {useParams} from "react-router-dom";
import {getAllProductsFromDB, ProductItem} from "../data/products";
import {BlogItem, getAllBlogsFromDB} from "../data/blogs";

type SearchProps = {
	locale: {
		localLang: {
			text: any,
			lang: "english" | "french"
		},
		localCurrency: "cad" | "usd"
	},
	setLocale: Function
}

export default function Search({locale, setLocale}: SearchProps) {

	const {search_query} = useParams();
	
	const [productList, setProductList] = useState<ProductItem[]>([])
	const [blogList, setBlogList] = useState<BlogItem[]>([])

	useEffect(() => {
		const getProductList = async () => {
			const data = await getAllProductsFromDB();
			setProductList(data);
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
			<NavBar localLang={locale.localLang} setLocale={setLocale} />
			<SearchHeader searchQuery={search_query!} localLang={locale.localLang} />
			<SearchResults searchQuery={search_query!} locale={locale} productList={productList} blogList={blogList} />
			<Footer localLang={locale.localLang.text} />
		</>
	);
}