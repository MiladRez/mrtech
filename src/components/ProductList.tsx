import React, { useState } from "react";
import { ProductItem } from "../data/products";
import Product from "./Product";

function ProductList({ products }: { products: ProductItem[] }) {
	
	const [availabilityFilter, setAvailabilityFilter] = useState(true);

	return (
		<div className="flex justify-center pb-16">
			<div className="w-full max-w-screen-xl px-12 grid grid-cols-4 gap-4">
				<div className="col-span-1 border-r">
					<div className="border-b py-3">
						<div onClick={() => setAvailabilityFilter(!availabilityFilter)} className="flex justify-between items-center pr-4 group cursor-pointer select-none">
							<h3 className="font-medium group-hover:text-primary">Availability</h3>
							<svg stroke="currentColor" strokeWidth={1.6} className={`w-7 h-7 group-hover:text-primary ${availabilityFilter ? "rotate-180" : ""}`}>
								<use href="src/icons_sprite.svg#chevron-down" />
							</svg>
						</div>
						<div className={`${availabilityFilter ? "max-h-36" : "max-h-0"} overflow-hidden transition-[max-height] duration-200`}>
							<div className="py-4">
								<ul className="flex flex-col gap-4">
									<li className="flex gap-2">
										<input id="in-stock" type="checkbox" className="disabled:cursor-not-allowed peer" />
										<label htmlFor="in-stock" className="w-full text-sm text-neutral-500 cursor-pointer select-none peer-disabled:cursor-not-allowed peer-disabled:text-neutral-500/50">In stock (10)</label>
									</li>
									<li className="flex gap-2">
										<input id="out-of-stock" disabled type="checkbox" className="disabled:cursor-not-allowed peer" />
										<label htmlFor="out-of-stock" className="w-full text-sm text-neutral-500 cursor-pointer select-none peer-disabled:cursor-not-allowed peer-disabled:text-neutral-500/50">Out of stock (0)</label>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="col-span-3 grid grid-cols-3 gap-y-8">
					{
						products.map((prod, index) => (
							<Product product={prod} key={index} />
						))
					}
				</div>
			</div>
		</div>
	)
}

export default ProductList;