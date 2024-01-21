import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import ProductListHeader from "../components/ProductListHeader";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import { productsOnSale } from "../data/products";

export default function Deals() {

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<>
			<NavBar />
			<ProductListHeader title="Hottest Deals" desc="Score some of our top picks at unbelievably low prices." />
			<ProductList products={productsOnSale} />
			<Footer />
		</>
	)
}