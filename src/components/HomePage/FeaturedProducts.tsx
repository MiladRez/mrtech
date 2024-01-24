import React from "react";
import Product from "../Product";
import { ProductItem } from "../../data/products";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";

type FeaturedProductsProps = {
	header: string,
	subheader: string,
	products: ProductItem[],
	viewAllPage: string,
	setProduct: Function
}

export default function FeaturedProducts({ header, subheader, products, viewAllPage, setProduct }: FeaturedProductsProps) {

	const { addItemToCart } = useCart();

	const addToCart = (item: ProductItem) => {
		addItemToCart(item)
		setProduct(item);
	}

	return (
		<section className="flex justify-center">
			<div className="w-full max-w-screen-xl px-12 py-10">
				<div className="flex flex-col gap-4 items-center py-8">
					<h1 className="text-4xl">{header}</h1>
					<p>{subheader}</p>
				</div>
				<div className="flex gap-2 justify-between">
					{
						products.slice(0, 4).map((prod, index) => (
							<Product product={prod} key={index} addToCart={addToCart} />
						))
					}
				</div>
				<div className="flex justify-center py-8">
					<Link to={viewAllPage}>
						<button className="w-fit border px-10 py-3 bg-black border-black text-white hover:bg-primary hover:border-primary hover:text-white transition duration-200">View all</button>
					</Link>
				</div>
			</div>
		</section>
	)
}