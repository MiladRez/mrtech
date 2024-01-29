import React from "react";
import { Link } from "react-router-dom";
import { ProductItem } from "../../data/products";

export default function ResultsProductCard({ product }: { product: ProductItem }) {
	const { name, img, manufacturer, sale } = product; 

	// always displays to two decimal places
	const price = product.price.toLocaleString("en-CA", { style: "currency", currency: "CAD" });
	const salePrice = product.salePrice?.toLocaleString("en-CA", { style: "currency", currency: "CAD" });

	return (
		<>
			<Link to={`/product/${encodeURIComponent(name)}`}>
				<div className="flex flex-col h-full justify-between gap-4 group border px-4 py-4">
					<div>
						<div className="relative">
							<img src={img.toString()} className="w-72 px-6 py-6 group-hover:scale-105 transition duration-300" />
							<div className={`${product.sale ? "" : "hidden"} absolute bg-blue-800 text-sm text-white border px-4 py-1 rounded-2xl bottom-2 left-0`}>Sale</div>	
						</div>
						<div className="pt-2">
							<p className="text-sm line-clamp-2 group-hover:underline">{name}</p>
							<p className="text-xs text-neutral-400 uppercase py-2">{manufacturer}</p>	
						</div>	
					</div>
					<div className="inline-flex items-center">
						<p className={`${sale ? "text-sm line-through text-neutral-500 pr-4" : ""}`}>{price} CAD</p>		
						<p className={`${sale ? "" : "hidden"}`}>{salePrice} CAD</p>					
					</div>
				</div>	
			</Link>
		</>
	)
}