import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ProductListHeader from "../components/ProductListHeader";
import ProductList from "../components/ProductList";
import { allProducts } from "../data/products";

function Shop() {
	return (
		<>
			<NavBar />
			<ProductListHeader title="Shop" desc="All of the products we offer." />
			<ProductList products={allProducts} />
			<Footer />
		</>
	)
}

export default Shop;