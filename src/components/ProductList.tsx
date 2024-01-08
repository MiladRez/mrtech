import React from "react";
import { ProductItem } from "../data/products";
import Product from "./Product";

function ProductList({products}: {products: ProductItem[]}) {
	return (
		<div className="flex justify-center pb-16">
			<div className="w-full max-w-screen-xl px-12 grid grid-cols-4 gap-y-8">
				{
					products.map((prod, index) => (
						<Product product={prod} key={index} />
					))
				}
			</div>
			
		</div>
	)
}

export default ProductList;