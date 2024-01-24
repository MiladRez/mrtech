import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ProductListHeader from "../components/ProductListHeader";
import ProductList from "../components/ProductList";
import { allProducts } from "../data/products";

export default function Shop() {

	const [product, setProduct] = useState(null);

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<>
			<NavBar product={product} setProduct={setProduct} />
			<ProductListHeader title="Shop" desc="All of the products we offer." />
			<ProductList products={allProducts} setProduct={setProduct} />
			<Footer />
		</>
	)
}