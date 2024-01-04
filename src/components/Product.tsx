import React from "react";
import { ProductItem } from "../data/products";

function Product({ product }: { product: ProductItem }) {
	return (
		<div className="flex flex-col justify-between w-72">
			<div className="flex flex-col h-full justify-between gap-4 pb-5">
				<div>
					<div className="relative">
						<img src={product.img.toString()} className="w-72 px-6 py-6" />
						<button className={`${product.sale ? "" : "hidden"} absolute bg-blue-800 text-sm text-white border px-4 py-1 rounded-2xl bottom-2 left-0`}>Sale</button>	
					</div>
					<div className="pt-2">
						<p className="text-sm line-clamp-2">{product.name}</p>
						<p className="text-xs text-neutral-400 uppercase py-2">{product.manufacturer}</p>	
					</div>	
				</div>
				<div className="inline-flex items-center">
					<p className={`${product.sale ? "text-sm line-through text-neutral-500 pr-4" : ""}`}>{product.price}</p>		
					<p className={`${product.sale ? "" : "hidden"}`}>{product.salePrice}</p>					
				</div>
			</div>
			<button className="w-full border border-black py-3 hover:bg-black hover:text-white transition duration-200">Add to cart</button>
		</div>
	)
}

export default Product;