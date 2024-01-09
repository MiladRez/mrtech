import React, { useState } from "react";
import { allProducts } from "../data/products";

function ProductListHeader({ title, desc }: { title: string, desc: string }) {
	
	return (
		<div className="flex justify-center pt-12">
			<div className="w-full max-w-screen-xl px-12 flex flex-col gap-12">
				<div className="flex flex-col gap-6 pb-12">
					<h1 className="text-4xl">{title}</h1>
					<p>{desc}</p>		
				</div>
			</div>
		</div>
	)
}

export default ProductListHeader;