import React from "react";
import Product from "../Product";
import { ProductItem } from "../../data/products";

type FeaturedProductsProps = {
	header: string,
	subheader: string,
	products: ProductItem[]
}

function FeaturedProducts({header, subheader, products}: FeaturedProductsProps) {
	return (
		<section className="flex justify-center">
			<div className="max-w-screen-xl">
				<div className="flex flex-col gap-4 items-center py-12">
					<h1 className="text-4xl">{header}</h1>
					<p>{subheader}</p>
				</div>
				<div className="flex gap-2">
					{
						products.map((prod, index) => (
							<Product product={prod} key={index} />
						))
					}
				</div>
				<div className="flex justify-center py-8">
					<button className="w-fit border px-10 py-3 bg-black border-black text-white hover:bg-primary hover:border-primary hover:text-white transition duration-200">View all</button>
				</div>
			</div>
		</section>
	)
}

export default FeaturedProducts;