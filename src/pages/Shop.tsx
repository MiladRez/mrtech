import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ProductListHeader from "../components/ProductListHeader";
import ProductList from "../components/ProductList";
import { allProducts } from "../data/products";

export default function Shop() {

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<>
			<NavBar />
			<ProductListHeader title="Shop" desc="All of the products we offer." />
			<ProductList products={allProducts} />
			<Footer />
		</>
	)
}