import React from "react";
import { ProductItem } from "../data/products";
import { Link } from "react-router-dom";

export default function Product({ product, addToCart }: { product: ProductItem, addToCart: Function }) {

	const { img, name, manufacturer, stock } = product;

	// always displays to two decimal places
	const price = product.price.toLocaleString("en-CA", { style: "currency", currency: "CAD" });
	const salePrice = product.salePrice?.toLocaleString("en-CA", { style: "currency", currency: "CAD" });

	const handleAddProductToCart = () => {
		if (stock > 0) {
			addToCart(product)	
		}
	}

	return (
		<div className="flex flex-col justify-between w-72 group">
			<Link to={`/product/${encodeURIComponent(name)}`}>
				<div className="flex flex-col h-full justify-between gap-4 pb-5">
					<div>
						<div className="relative">
							<img src={img.toString()} className={`w-72 px-6 py-6 group-hover:scale-105 transition duration-300 ${stock > 0 ? "" : "grayscale"}`} />
							<div className={`${salePrice ? "" : "hidden"} absolute bg-blue-800 text-sm text-white border px-4 py-1 rounded-2xl bottom-2 left-0`}>Sale</div>	
							<div className={`${stock > 0 ? "hidden" : ""} absolute bg-neutral-600 text-sm text-white border px-4 py-1 rounded-2xl bottom-2 right-0`}>Out of stock</div>	
						</div>
						<div className="pt-2">
							<p className="text-sm line-clamp-2 group-hover:underline">{name}</p>
							<p className="text-xs text-neutral-400 uppercase py-2">{manufacturer}</p>	
						</div>	
					</div>
					<div className="inline-flex items-center">
						<p className={`${salePrice ? "text-sm line-through text-neutral-500 pr-4" : ""}`}>{price} CAD</p>		
						<p className={`${salePrice ? "" : "hidden"}`}>{salePrice} CAD</p>					
					</div>
				</div>	
			</Link>
			<button onClick={handleAddProductToCart} className={`${stock > 0 ? "hover:bg-black hover:text-white transition duration-200" : "cursor-not-allowed"} w-full border border-black py-3`}>Add to cart</button>
		</div>
	)
}