import React, { LegacyRef, useEffect, useState } from "react";
import { ProductItem, allProducts, searchQuerySuggestions, sitePages } from "../data/products";
import { Blog, allBlogs } from "../data/blogs";

type SearchBarProps = {
	searchBarInput?: LegacyRef<HTMLInputElement>,
	search: boolean,
	searchResults: boolean,
	query: string
}

export default function SearchBar({ searchBarInput, search, searchResults, query }: SearchBarProps) {

	type PageWithLink = {
		name: string,
		link: string
	}

	const [queryDisplay, setQueryDisplay] = useState(query);
	const [searchResultsDisplay, setSearchResultsDisplay] = useState(searchResults);
	const [suggestions, setSuggestions] = useState([] as string[]);
	const [products, setProducts] = useState([] as ProductItem[]);
	const [pages, setPages] = useState([] as PageWithLink[]);

	const searchAlgo = (query: string) => {
		setSearchResultsDisplay(true);
		setQueryDisplay(query)
		if (query != "") {
			// search algo for suggestions
			let suggestionsArr = [] as string[];
			searchQuerySuggestions.map((suggestion: string) => {
				if (suggestion.toLowerCase().includes(query.toLowerCase()) && !suggestionsArr.includes(suggestion)) {
					suggestionsArr = [...suggestionsArr, suggestion];
				}
			});
			setSuggestions(suggestionsArr.slice(0, 5));

			// search algo for products
			let productsArr = [] as ProductItem[];
			allProducts.map((prod: ProductItem) => {
				if (prod.name.toLowerCase().includes(query.toLowerCase()) && !productsArr.includes(prod)) {
					productsArr = [...productsArr, prod];
				}
			});
			setProducts(productsArr.slice(0, 5));

			// search algo for pages
			let pagesArr = [] as PageWithLink[];
			sitePages.map((page: string) => {
				if (page.toLowerCase().includes(query.toLowerCase()) && !pagesArr.includes({name: page, link: page.toLowerCase()})) {
					pagesArr = [...pagesArr, {name: page, link: page.toLowerCase()}];
				}
			});
			
			if (productsArr.length > 0) {
				pagesArr = [...pagesArr, {name: "Shop", link: "shop"}];
			}

			allBlogs.map((blog: Blog) => {
				const title = blog.title.toLowerCase();
				const desc = blog.desc.toLowerCase();
				const queryLC = query.toLowerCase();
				if (title.includes(queryLC) || desc.includes(queryLC) && !pagesArr.includes({name: blog.title, link: `blog/${encodeURIComponent(blog.title)}`})) {
					pagesArr = [...pagesArr, {name: blog.title, link: `blog/${encodeURIComponent(blog.title)}`}];
				}
			})
			setPages(pagesArr.slice(0, 5));

		} else {
			// if query is empty, set all to empty
			setSuggestions([] as string[]);
			setPages([] as PageWithLink[]);
			setProducts([] as ProductItem[]);
		}
	}

	const boldQueryInSearchResult = (resultTerm: string) => {
		let queryLC = query.toLowerCase();

		if (resultTerm.toLowerCase().includes(queryLC)) {
			const queryIndex = resultTerm.toLowerCase().indexOf(queryLC);
			const queryLength = query.length;

			return (
				<>
					{resultTerm.slice(0, queryIndex)}
					<b>{ resultTerm.slice(queryIndex, queryIndex + queryLength) }</b>
					{ resultTerm.slice(queryIndex + queryLength) }
				</>
			)	
		} else {
			return (
				resultTerm
			)
		}
	}

	useEffect(() => {
		setQueryDisplay(query)
	}, [search])

	return (
		<div id="searchBar" className="w-[42rem] pointer-events-auto">
			{/* search bar */}
			<div className={`relative ${search ? "ring-1 ring-neutral-500 hover:ring-2 transition duration-200" : "ring-0"} w-full flex`}>
				<input id="searchBarInput" ref={searchBarInput} value={queryDisplay} className="w-full px-6 pt-2 outline-none peer" onChange={(event) => searchAlgo(event.target.value)} />
				<label htmlFor="searchBarInput" className={`absolute left-6 ${ queryDisplay != "" ? "top-1 text-[10px] duration-0" : "top-3.5 peer-focus:top-1 peer-focus:text-[10px]"} text-neutral-500 pointer-events-none transition-all duration-200`}>Search</label>
				<a href={`/search/${queryDisplay}`} className="bg-white px-6 py-4">
					<svg stroke="currentColor" strokeWidth={1} className="w-5 h-5 hover:scale-125 transition duration-200">
						<use href="src/icons_sprite.svg#search" />
					</svg>
				</a>
			</div>
			{/* search results */}
			<div className={`${(queryDisplay != "" && searchResultsDisplay) ? "max-h-screen" : "max-h-0" } w-full bg-white border-x border-b transition-[max-height] duration-200 overflow-hidden`}>
				<div className="flex gap-4">
					<div className="flex flex-col w-2/5">
						<div className={`flex flex-col ${suggestions.length > 0 ? "" : "hidden"}`}>
							<p className="text-[11px] uppercase text-primary py-2 mx-6 border-b border-primary/50 tracking-wider">Suggestions</p>
							<div className="">
								{   /* list all suggestions with query bolded */
									suggestions.map((suggestion, index) => (
										<a href="" key={index}>
											<p className="text-sm px-6 py-2 hover:bg-black/10">
												{boldQueryInSearchResult(suggestion)}	
											</p>
										</a>
									))
								}
							</div>
						</div>
						<div className={`flex flex-col ${pages.length > 0 ? "" : "hidden"}`}>
							<p className="text-[11px] uppercase text-primary py-2 mx-6 border-b border-primary/50 tracking-wider">Pages</p>
							<div className="">
								{   /* list all pages with query bolded */
									pages.map((page, index) => (
										<a href={`/${page.link}`} key={index}>
											<p className="text-sm px-6 py-2 hover:bg-black/10">
												{boldQueryInSearchResult(page.name)}	
											</p>
										</a>
									))
								}
							</div>
						</div>
					</div>
					<div className={`flex flex-col w-3/5 ${products.length > 0 ? "py-2" : "hidden"}`}>
						<p className="text-[11px] uppercase text-primary py-2 mx-6 border-b border-primary/50 tracking-wider">Products</p>
						<div className="">
							{
								products.map((prod, index) => (
									<a href={`/product/${prod.name}`} key={index} className="flex items-center gap-6 px-6 py-2 hover:bg-black/10">
										<img src={ prod.img.toString() } className="w-12" />
										<p className="text-xs line-clamp-2">{ prod.name }</p>	
									</a>
								))
							}
						</div>
					</div>
				</div>
				<a href={`/search/${queryDisplay}`} className="flex border-t justify-between items-center px-6 py-2 group hover:bg-black/10">
					<p className="text-sm">Search for "{queryDisplay}"</p>
					<svg stroke="currentColor" className="w-8 h-8 group-hover:translate-x-1 transition duration-200">
						<use href="src/icons_sprite.svg#right-arrow" />
					</svg>
				</a>
			</div>
		</div>
	);
}