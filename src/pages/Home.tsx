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

export default function Home() {

	const [product, setProduct] = useState(null);

	return (
		<>
			<NavBar product={product} setProduct={setProduct} />
			<Hero />
			<FeaturedProducts header="Select products on sale" subheader="Free delivery on orders over $70" products={productsOnSale} viewAllPage={"/deals"} setProduct={setProduct} />
			<PromoDisplay />
			<BuildYourPC />
			<FeaturedProducts header="Popular Products" subheader="Easy returns with 30-day return policy" products={popularProducts} viewAllPage={"/shop"} setProduct={setProduct} />
			<FeaturedBlogs />
			<SubscribeToNewsletter />
			<Footer />
		</>
	)
}