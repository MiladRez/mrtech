import React from "react";
import NavBar from "../components/NavBar";
import ProductListHeader from "../components/ProductListHeader";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import { productsOnSale } from "../data/products";

function Deals() {
	return (
		<>
			<NavBar />
			<ProductListHeader title="Hottest Deals" desc="Score some of our top picks at unbelievably low prices." />
			<ProductList products={productsOnSale} />
			<Footer />
		</>
	)
}

export default Deals;