import React from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/HomePage/Hero";
import FeaturedProducts from "../components/HomePage/FeaturedProducts";
import { productsOnSale, popularProducts } from "../data/products";
import PromoDisplay from "../components/HomePage/PromoDisplay";
import Footer from "../components/Footer";

function Home() {
	return (
		<section>
			<NavBar />
			<Hero />
			<FeaturedProducts header="Select products on sale" subheader="Free delivery on orders over $70" products={productsOnSale} />
			<PromoDisplay />
			<FeaturedProducts header="Popular Products" subheader="Easy returns with 30-day return policy" products={popularProducts} />
			<Footer />
		</section>
	)
}

export default Home;