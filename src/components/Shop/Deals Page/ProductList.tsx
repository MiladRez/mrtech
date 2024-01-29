import React, { ReactElement, useRef, useState } from "react";
import { ProductItem, allProducts } from "../../../data/products";
import Product from "../../Product";
import FilterDropdown from "./FilterDropdown";
import { useCart } from "../../CartContext";

const sortOrder: string[] = [
	"Highest Rated",
	"Best Selling",
	"Name, A-Z",
	"Name, Z-A",
	"Price, Low-High",
	"Price, High-Low",
	"Recently Added",
]

export default function ProductList({ products, setProduct }: { products: ProductItem[], setProduct: Function }) {

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
		addItemToCart(item);
		setProduct(item);
	}

	const checkbox = (id: string, name: string, disabled: boolean): ReactElement => {
		return (
			<li className="flex gap-2">
				<input id={ id } type="checkbox" disabled={ disabled } className="disabled:cursor-not-allowed peer focus:ring-0" />
				<label htmlFor={ id } className="w-full text-sm cursor-pointer select-none hover:underline peer-disabled:no-underline peer-disabled:cursor-not-allowed peer-disabled:text-black/50">{ name }</label>
			</li>	
		)
	}

	const availabilityFilterContent = 
		<ul className="flex flex-col gap-4 px-1">
			{ checkbox("in-stock", "In stock (10)", false) }
			{ checkbox("out-of-stock", "Out of stock (0)", true) }
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
			<ul className="flex flex-col gap-4 pt-6 px-1">
				{ checkbox("pr-lt200", "Less than $200 (5)", false) }
				{ checkbox("pr-200to300", "$200 - $299.99 (1)", false) }
				{ checkbox("pr-300to400", "$300 - $399.99 (0)", false) }
				{ checkbox("pr-400to600", "$400 - $599.99 (3)", false) }
				{ checkbox("pr-600to800", "$600 - $799.99 (0)", false) }
				{ checkbox("pr-800to1000", "$800 - $999.99 (0)", false) }
				{ checkbox("pr-1000to1200", "$1000 - $1199.99 (0)", false) }
				{ checkbox("pr-1200andUp", "$1200 and Up (1)", false) }
			</ul>
		</div>
		

	return (
		<section className="flex justify-center pb-16">
			<div className="w-full max-w-screen-xl px-12 grid grid-cols-4 gap-4">
				<div className="col-span-1 border-r">
					<FilterDropdown openFilter={true} title="Availability" content={availabilityFilterContent} />
					<FilterDropdown openFilter={false} title="Price" content={priceFilterContent} />
				</div>
				<div className="col-span-3">
					<div className="flex justify-end gap-4 items-center">
						<p className="text-sm text-neutral-500">Sort by:</p>
						<select name="sortOrder" defaultValue={'default'} className="text-sm pr-1 text-neutral-500 cursor-pointer focus:outline-none hover:text-black hover:underline">
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
						<p className="text-sm text-neutral-500 pl-12">{products.length} products</p>
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
		</section>
	)
}