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
				<div className="flex flex-col h-96 justify-between gap-4 group border px-4 py-4">
					<div>
						<div className="relative">
							<img src={img.toString()} className="w-72 px-6 py-6 group-hover:scale-105 transition duration-300" />
							<div className={`${product.sale ? "" : "hidden"} absolute bg-blue-800 text-sm text-white border px-4 py-1 rounded-2xl bottom-2 left-0`}>Sale</div>	
						</div>
						<div className="pt-2">
							<p className="text-sm line-clamp-2 group-hover:underline">{name}</p>
							<div className="flex items-center justify-between">
								<p className="text-xs text-neutral-400 uppercase py-2">{manufacturer}</p>
								{
									sale ?
										<p className="text-blue-800 px-2 py-2">{salePrice} CAD</p>
										:
										<p className="px-2 py-2">{price} CAD</p>
								}

							</div>
						</div>
					</div>
				</div>	
			</Link>
		</>
	)
}