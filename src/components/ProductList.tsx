import React, { useRef, useState } from "react";
import { ProductItem, allProducts } from "../data/products";
import Product from "./Product";
import FilterDropdown from "./FilterDropdown";
import { useCart } from "./CartContext";

const sortOrder: string[] = [
	"Highest Rated",
	"Best Selling",
	"Name, A-Z",
	"Name, Z-A",
	"Price, Low-High",
	"Price, High-Low",
	"Recently Added",
]

export default function ProductList({ products }: { products: ProductItem[] }) {

	const { addItemToCart } = useCart();

	const [disabledApplyPriceRangeButton, setDisabledApplyPriceRangeButton] = useState(true);
	const minPriceInput = useRef(null);
	const maxPriceInput = useRef(null);

	const handlePriceInput = (event: { target: { value: string; }; }) => {
		if (event.target.value === "") {
			setDisabledApplyPriceRangeButton(true);
		} else {
			setDisabledApplyPriceRangeButton(false)
		}
	}

	const addToCart = (item: ProductItem) => {
		addItemToCart(item)
	}

	const availabilityFilterContent = 
		<ul className="flex flex-col gap-4">
			<li className="flex gap-2">
				<input id="in-stock" type="checkbox" className="disabled:cursor-not-allowed peer" />
				<label htmlFor="in-stock" className="w-full text-sm cursor-pointer select-none hover:underline peer-disabled:cursor-not-allowed peer-disabled:text-black/50">In stock (10)</label>
			</li>
			<li className="flex gap-2">
				<input id="out-of-stock" disabled type="checkbox" className="disabled:cursor-not-allowed peer" />
				<label htmlFor="out-of-stock" className="w-full text-sm cursor-pointer select-none peer-disabled:cursor-not-allowed peer-disabled:text-black/50">Out of stock (0)</label>
			</li>
		</ul>
	
	const priceFilterContent = 
		<div>
			<div className="flex justify-between items-center gap-2">
				<div className="flex flex-col gap-1">
					<label htmlFor="min-price" className="text-sm text-neutral-500 select-none">Min</label>
					<div className="relative focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
						<input ref={minPriceInput} type="number" placeholder="$" onChange={handlePriceInput} id="min-price" className="w-28 px-2 py-2 border border-neutral-400 focus:outline-none peer" />
						<div className="absolute top-0 w-full h-full pointer-events-none border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
					</div>
				</div>
				<p className="pt-6">-</p>
				<div className="flex flex-col gap-1">
					<label htmlFor="max-price" className="text-sm text-neutral-500 select-none">Max</label>
					<div className="relative focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
						<input ref={maxPriceInput} type="number" placeholder="$" onChange={handlePriceInput} id="max-price" className="w-28 px-2 py-2 border border-neutral-400 focus:outline-none peer" />
						<div className="absolute top-0 w-full h-full pointer-events-none border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
					</div>
				</div>
			</div>
			<div className="flex flex-col py-4 border-b">
				<button disabled={disabledApplyPriceRangeButton} className="w-full border px-12 py-4 bg-primary text-sm text-white font-semibold hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-black transition duration-200">Apply Price Range</button>
				<button className={`${disabledApplyPriceRangeButton ? "hidden" : ""} text-sm text-primary pt-6 self-start hover:underline`}>Clear price range</button>
			</div>
			<ul className="flex flex-col gap-4 pt-6">
				<li className="flex gap-2">
					<input id="pr-lt200" type="checkbox" className="disabled:cursor-not-allowed peer" />
					<label htmlFor="pr-lt200" className="w-full text-sm cursor-pointer select-none hover:underline peer-disabled:cursor-not-allowed peer-disabled:text-black/50">Less than $200 (5)</label>
				</li>
				<li className="flex gap-2">
					<input id="pr-200to300" type="checkbox" className="disabled:cursor-not-allowed peer" />
					<label htmlFor="pr-200to300" className="w-full text-sm cursor-pointer select-none hover:underline peer-disabled:cursor-not-allowed peer-disabled:text-black/50">$200 - $299.99 (1)</label>
				</li>
				<li className="flex gap-2">
					<input id="pr-300to400" type="checkbox" className="disabled:cursor-not-allowed peer" />
					<label htmlFor="pr-300to400" className="w-full text-sm cursor-pointer select-none hover:underline peer-disabled:cursor-not-allowed peer-disabled:text-black/50">$300 - $399.99 (0)</label>
				</li>
				<li className="flex gap-2">
					<input id="pr-400to600" type="checkbox" className="disabled:cursor-not-allowed peer" />
					<label htmlFor="pr-400to600" className="w-full text-sm cursor-pointer select-none hover:underline peer-disabled:cursor-not-allowed peer-disabled:text-black/50">$400 - $599.99 (3)</label>
				</li>
				<li className="flex gap-2">
					<input id="pr-600to800" type="checkbox" className="disabled:cursor-not-allowed peer" />
					<label htmlFor="pr-600to800" className="w-full text-sm cursor-pointer select-none hover:underline peer-disabled:cursor-not-allowed peer-disabled:text-black/50">$600 - $799.99 (0)</label>
				</li>
				<li className="flex gap-2">
					<input id="pr-800to1000" type="checkbox" className="disabled:cursor-not-allowed peer" />
					<label htmlFor="pr-800to1000" className="w-full text-sm cursor-pointer select-none hover:underline peer-disabled:cursor-not-allowed peer-disabled:text-black/50">$800 - $999.99 (0)</label>
				</li>
				<li className="flex gap-2">
					<input id="pr-1000to1200" type="checkbox" className="disabled:cursor-not-allowed peer" />
					<label htmlFor="pr-1000to1200" className="w-full text-sm cursor-pointer select-none hover:underline peer-disabled:cursor-not-allowed peer-disabled:text-black/50">$1000 - $1199.99 (0)</label>
				</li>
				<li className="flex gap-2">
					<input id="pr-1200andUp" type="checkbox" className="disabled:cursor-not-allowed peer" />
					<label htmlFor="pr-1200andUp" className="w-full text-sm cursor-pointer select-none hover:underline peer-disabled:cursor-not-allowed peer-disabled:text-black/50">$1200 and Up (1)</label>
				</li>
			</ul>
		</div>
		

	return (
		<div className="flex justify-center pb-16">
			<div className="w-full max-w-screen-xl px-12 grid grid-cols-4 gap-4">
				<div className="col-span-1 border-r">
					<FilterDropdown openFilter={true} title="Availability" content={availabilityFilterContent} />
					<FilterDropdown openFilter={false} title="Price" content={priceFilterContent} />
				</div>
				<div className="col-span-3">
					<div className="flex justify-end gap-4 items-center">
						<p className="text-sm text-neutral-500">Sort by:</p>
						<select defaultValue={'default'} className="text-sm pr-1 text-neutral-500 cursor-pointer focus:outline-none hover:text-black hover:underline">
							{sortOrder.map((order, index) => {
								if (order === "Recently Added") {
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
						<p className="text-sm text-neutral-500 pl-12">{allProducts.length} products</p>
					</div>
					<div className="col-span-3 grid grid-cols-3 gap-y-8">
						{
							products.map((prod, index) => (
								<Product product={prod} key={index} addToCart={addToCart} />
							))
						}
					</div>
				</div>
				
			</div>
		</div>
	)
}