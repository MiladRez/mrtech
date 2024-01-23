import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import FeaturedProducts from "../components/HomePage/FeaturedProducts";
import { allProducts } from "../data/products";
import CartList from "../components/CartList";

export default function Cart() {

	const randomProductsList = allProducts.sort(() => 0.5 - Math.random());
	let freqBoughtTogetherList = randomProductsList.slice(0, 4);

	return (
		<>
			<NavBar />
			<CartList />
			<FeaturedProducts header="Frequently bought together" subheader="Save with bundled products" products={freqBoughtTogetherList} viewAllPage="/shop" />
			<Footer />
		</>
	)
}