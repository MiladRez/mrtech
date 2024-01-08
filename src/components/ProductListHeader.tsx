import React from "react";
import { allProducts } from "../data/products";

const sortOrder: string[] = [
	"Featured",
	"Best selling",
	"Alphabetically, A-Z",
	"Alphabetically, Z-A",
	"Price, low to high",
	"Price, high to low",
	"Date, old to new",
	"Date, new to old"
]

function ProductListHeader({ title, desc }: {title: string, desc: string}) {
	return (
		<div className="flex justify-center pt-12">
			<div className="w-full max-w-screen-xl px-12 flex flex-col gap-12">
				<div className="flex flex-col gap-6 py-4">
					<h1 className="text-4xl">{title}</h1>
					<p>{desc}</p>		
				</div>
				<div className="flex justify-between">
					<div className="flex gap-8">
						<p className="text-sm text-neutral-500">Filter:</p>
						<p className="text-sm text-neutral-500">Availability</p>
						<p className="text-sm text-neutral-500">Price</p>
					</div>
					<div className="flex gap-8">
						<p className="text-sm text-neutral-500">Sort by:</p>
						<select defaultValue={'default'} className="text-sm text-neutral-500 cursor-pointer focus:outline-none hover:text-primary">
							{sortOrder.map((order, index) => {
								if (order === "Alphabetically, A-Z") {
									return (
										<option value="default" key={index}>
											{order}
										</option>
									)
								}
								return(
									<option value={order} key={index}>
										{order}
									</option>
								)
							})}
						</select>
						<p className="text-sm text-neutral-500">{allProducts.length} products</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductListHeader;