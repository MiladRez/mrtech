import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import FeaturedProducts from "../components/HomePage/FeaturedProducts";
import { ProductItem, allProducts } from "../data/products";
import StarRatings from 'react-star-ratings';
import { useCart } from "../components/CartContext";

export default function ProductInfo() {

	const { cart, addItemToCart, removeItemFromCart, updateItemQuantity } = useCart();

	const product: ProductItem = useLocation().state.product;

	const [quantity, setQuantity] = useState(0);
	const [numOfReviews, setNumOfReviews] = useState(Math.floor(Math.random() * 1000))
	const [disabled, setDisabled] = useState(quantity === 1);
	
	// get random list of products for "Similar products" list
	const randomProductsList = allProducts.sort(() => 0.5 - Math.random());
	const similarProducts = randomProductsList.slice(0, 4);

	// always displays to two decimal places
	const price = product.price.toLocaleString("en-CA", { style: "currency", currency: "CAD" });
	const salePrice = product.salePrice?.toLocaleString("en-CA", { style: "currency", currency: "CAD" });

	const handleQuantityDecreaseClick = () => {
		if (quantity > 1) {
			const newQuantity = quantity - 1;
			setQuantity(newQuantity);
			updateItemQuantity(product, newQuantity);
		} else if (quantity === 1) {
			const newQuantity = quantity - 1;
			setQuantity(newQuantity);
			removeItemFromCart(product);
		}
	}
	
	const handleQuantityOnChange = (event: any) => {
		if (event.target.value === "") {
			setQuantity(event.target.value);
		} else {
			addItemToCart(product);
			const newQuantity = parseInt(event.target.value);
			setQuantity(newQuantity);
			updateItemQuantity(product, newQuantity);
		}
	}

	const handleQuantityOnBlur = (event: any) => {
		if (event.target.value === "") {
			const newQuantity = 0;
			setQuantity(newQuantity);
			removeItemFromCart(product);
		}
	}

	const handleQuantityIncreaseClick = () => {
		const newQuantity = quantity + 1
		setQuantity(newQuantity);
		addItemToCart(product);
	}

	useEffect(() => {
		quantity < 1 ? setDisabled(true) : setDisabled(false);
	}, [quantity]);

	useEffect(() => {
		Array.from(cart.keys()).map(k => {
			if (k.id === product.id) {
				setQuantity(cart.get(k)!);
			}
		});
	}, []);

	return (
		<>
			<NavBar />
			<section className="flex justify-center">
				<div className="flex max-w-screen-xl px-12 py-12">
					<div className="w-2/3 flex flex-col items-center">
						<img src={ product.img.toString() } className="w-3/5 sticky top-32 border" />	
					</div>
					<div className="w-1/3 flex flex-col gap-8">
						<div className="flex flex-col gap-2">
							<p className="text-xs uppercase text-neutral-500">{ product.manufacturer }</p>
							<h1 className="text-4xl">{product.name}</h1>
							<div className="flex gap-2">
								<StarRatings
									rating={product.rating}
									starRatedColor="#fbbf24"
									starDimension="20px"
									starSpacing="1px"
								/>
								<p className="pt-0.5 font-bold">{ product.rating } <span className="font-light">({ numOfReviews } Reviews)</span></p>	
							</div>
							<div className="flex pt-4 text-xl font-bold">
								<p className={`${product.sale ? "text-sm line-through text-neutral-500 pr-4" : ""}`}>{price} CAD</p>		
								<p className={`${product.sale ? "" : "hidden"}`}>{salePrice} CAD</p>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<p className="text-xs text-neutral-500">Quantity</p>
							<div className="flex items-center">
								<div className="w-40 flex items-center justify-between ring-1 ring-neutral-500 hover:ring-2 transition duration-200">
									<div onClick={handleQuantityDecreaseClick} className={`${disabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-black/10"} px-4 py-4`}>
										<svg className="w-4 h-4">
											<use href="src/icons_sprite.svg#minus"/>
										</svg>
									</div>
									<input type="number" value={quantity} onChange={handleQuantityOnChange} onBlur={handleQuantityOnBlur} className="px-0 py-0 text-center text-sm w-8 border-none focus:ring-0" />
									<div onClick={handleQuantityIncreaseClick} className="px-4 py-4 cursor-pointer hover:bg-black/10">
										<svg className="w-3.5 h-4">
											<use href="src/icons_sprite.svg#plus"/>
										</svg>
									</div>	
								</div>
							</div>	
						</div>
						<div className="flex flex-col gap-3">
							<button className="border border-black px-4 py-3 text-sm hover:bg-black hover:text-white transition duration-200">Add to cart</button>
							<button className="border border-black px-4 py-3 bg-black text-white text-sm hover:bg-primary hover:border-primary hover:text-white transition duration-200">Buy now</button>
						</div>
						<div className="py-4">
							<ul className="flex flex-col gap-2">
								{
									product.features.map((feature, index) => (
										<li key={index} className="list-disc">{ feature }</li>
									))
								}
							</ul>
						</div>
					</div>
				</div>
			</section>
			<FeaturedProducts header="You may also like" subheader="" products={similarProducts} />
			<Footer />
		</>
	)
}