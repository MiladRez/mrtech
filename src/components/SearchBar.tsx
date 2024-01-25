import React, { LegacyRef, useEffect, useState } from "react";
import { ProductItem, allProducts } from "../data/products";

type SearchBarProps = {
	searchBarInput: LegacyRef<HTMLInputElement>,
	search: boolean,
	query: string,
	setQuery: Function
}

export default function SearchBar({ searchBarInput, search, query, setQuery }: SearchBarProps) {

	const [suggestions, setSuggestions] = useState([] as string[]);
	const [products, setProducts] = useState([] as ProductItem[]);
	const [pages, setPages] = useState([] as string[]);
	
	const getSuggestions = (query: string) => {
		//
	}

	const getProducts = (event: any) => {
		const query = event.target.value;
		setQuery(query);
		if (query != "") {
			if (products.length < 5) {
				let productsArr = [] as ProductItem[];
				allProducts.map((prod: ProductItem) => {
					if (prod.name.toLowerCase().includes(query.toLowerCase()) && !products.includes(prod)) {
						productsArr = [...productsArr, prod];
					}
				})	
				setProducts(productsArr.slice(0,5));
			} else {
				return;
			}
		} else {
			setProducts([] as ProductItem[]);
		}
	}

	const getPages = (query: string) => {
		//
	}

	return (
		<div id="searchBar" className="w-[42rem] pointer-events-auto">
			{/* search bar */}
			<div className={`relative ${search ? "ring-1" : "ring-0"} w-full flex ring-neutral-500 hover:ring-2 transition duration-200`}>
				<input id="searchBarInput" ref={searchBarInput} value={query} className="w-full px-6 pt-2 outline-none peer" onChange={getProducts} />
				<label htmlFor="searchBarInput" className={`absolute left-6 ${ query != "" ? "top-1 text-[10px] duration-0" : "top-4 peer-focus:top-1 peer-focus:text-[10px]"} text-neutral-500 pointer-events-none transition-all duration-200`}>Search</label>
				<button className="bg-white px-6 py-4">
					<svg stroke="currentColor" strokeWidth={1} className="w-5 h-5 hover:scale-125 transition duration-200">
						<use href="src/icons_sprite.svg#search" />
					</svg>
				</button>
			</div>
			{/* search results */}
			<div className={`${query != "" ? "max-h-screen" : "max-h-0" } w-full bg-white border-x border-b transition-[max-height] duration-200 overflow-hidden`}>
				<div className="flex flex-col py-2">
					<div className="flex gap-8 px-6">
						<div className="flex flex-col w-2/5">
							<div className="flex flex-col">
								<p className="text-xs uppercase text-neutral-500 py-2">Suggestions</p>
								<div className="flex flex-col border-t py-2">
									suggestions
								</div>
							</div>
							<div className="flex flex-col">
								<p className="text-xs uppercase text-neutral-500 py-2">Pages</p>
								<div className="border-t py-2">
									pages
								</div>
							</div>
						</div>
						<div className="flex flex-col w-3/5">
							<p className="text-xs uppercase text-neutral-500 py-2">Products</p>
							<div className="border-t py-2">
								{
									products.map((prod, index) => (
										<div key={index} className="flex items-center gap-6 py-2">
											<img src={ prod.img.toString() } className="w-12" />
											<p className="text-xs line-clamp-2">{ prod.name }</p>
										</div>
									))
								}
							</div>
						</div>
					</div>
					<div className="flex border-t justify-between items-center px-6 pt-2 pb-1">
						<p className="text-sm">Search for ""</p>
						<svg stroke="currentColor" className="w-8 h-8 hover:translate-x-1 transition duration-200">
							<use href="src/icons_sprite.svg#right-arrow" />
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
}