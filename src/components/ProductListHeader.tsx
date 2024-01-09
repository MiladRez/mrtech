import React, { useState } from "react";
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

function ProductListHeader({ title, desc }: { title: string, desc: string }) {
	
	const [availabilityFilter, setAvailabilityFilter] = useState(false);
	const [priceFilter, setPriceFilter] = useState(false);

	const handleAvailabilityDropdown = () => {
		console.log("I run")
		setAvailabilityFilter(true)
		document.addEventListener("mouseup", closeWhenClickedOutsideFilter)
	}

	const handlePriceFilter = () => {
		setPriceFilter(true)
		document.addEventListener("mouseup", closeWhenClickedOutsideFilter)
	}

	const closeWhenClickedOutsideFilter = (event: any) => {
		if (!event.composedPath().includes(document.querySelector("#availabilityFilter") || document.querySelector("#priceFilter"))) {
			setAvailabilityFilter(false);
			setPriceFilter(false);
			document.removeEventListener("mouseup", closeWhenClickedOutsideFilter);
		}
	}

	return (
		<div className="flex justify-center pt-12">
			<div className="w-full max-w-screen-xl px-12 flex flex-col gap-12">
				<div className="flex flex-col gap-6 py-4">
					<h1 className="text-4xl">{title}</h1>
					<p>{desc}</p>		
				</div>
				<div className="flex justify-between">
					<div className="flex gap-8 items-center">
						<p className="text-sm text-neutral-500">Filter:</p>
						<div id="availabilityFilter" className="relative">
							<div onClick={handleAvailabilityDropdown} className="group cursor-pointer">
								<select disabled defaultValue={'default'} className="text-sm disabled:opacity-100 pr-1 text-neutral-500 select-none pointer-events-none group-hover:text-black group-hover:underline">
									<option value="default">
										Availability
									</option>
								</select>		
							</div>
							<div className={`${availabilityFilter ? "max-h-36 ring-1 ring-neutral-300" : "max-h-0"} absolute top-12 left-0 w-72 overflow-hidden z-10 bg-white transition-[max-height] duration-200`}>
								<div className="flex justify-between border-b px-4 py-4">
									<p className="text-sm text-neutral-500">0 selected</p>
									<p className="text-sm text-neutral-500 underline underline-offset-2 cursor-pointer hover:decoration-2">Reset</p>
								</div>
								<div className="px-4 py-4">
									<ul className="flex flex-col gap-4">
										<li className="flex gap-2">
											<input id="in-stock" type="checkbox" className="disabled:cursor-not-allowed peer" />
											<label htmlFor="in-stock" className="text-sm text-neutral-500 cursor-pointer select-none peer-disabled:cursor-not-allowed peer-disabled:text-neutral-500/50">In stock (10)</label>
										</li>
										<li className="flex gap-2">
											<input id="out-of-stock" disabled type="checkbox" className="disabled:cursor-not-allowed peer" />
											<label htmlFor="out-of-stock" className="text-sm text-neutral-500 cursor-pointer select-none peer-disabled:cursor-not-allowed peer-disabled:text-neutral-500/50">Out of stock (0)</label>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div id="priceFilter" className="relative">
							<div onClick={handlePriceFilter} className="group cursor-pointer">
								<select disabled defaultValue={'default'} className="text-sm disabled:opacity-100 pr-1 text-neutral-500 select-none pointer-events-none group-hover:text-black group-hover:underline">
									<option value="default">
										Price
									</option>
								</select>	
							</div>
							<div className={`${priceFilter ? "max-h-36 ring-1 ring-neutral-300" : "max-h-0"} absolute top-12 left-0 w-96 overflow-hidden z-10 bg-white transition-[max-height] duration-200`}>
								<div className="flex justify-between border-b px-4 py-4">
									<p className="text-sm text-neutral-500">0 products</p>
									<p className="text-sm text-neutral-500 underline underline-offset-2 cursor-pointer hover:decoration-2">Reset</p>
								</div>
								<div className="flex justify-between px-4 py-4 gap-4">
									<div className="flex items-center gap-1">
										<label htmlFor="min-price" className="text-neutral-500 select-none">From: $</label>
										<input id="min-price" type="number" className="w-24 h-fit border border-neutral-400" />
									</div>
									<div className="flex items-center gap-1">
										<label htmlFor="max-price" className="text-neutral-500 select-none">To: $</label>
										<input id="max-price" type="number" className="w-24 h-fit border border-neutral-400" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex gap-8 items-center">
						<p className="text-sm text-neutral-500">Sort by:</p>
						<select defaultValue={'default'} className="text-sm pr-1 text-neutral-500 cursor-pointer focus:outline-none hover:text-black hover:underline">
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