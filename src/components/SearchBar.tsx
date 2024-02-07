import React, {LegacyRef, useEffect, useState} from "react";
import {ProductItem, allProducts, searchQuerySuggestions, sitePages} from "../data/products";
import {Blog, allBlogs} from "../data/blogs";
import {localityText} from "../data/locality";

type SearchBarProps = {
	searchBarInput?: LegacyRef<HTMLInputElement>;
	search: boolean;
	searchResults: boolean;
	query: string;
	localLang: {
		text: any;
		lang: "english" | "french";
	};
};

export default function SearchBar({searchBarInput, search, searchResults, query, localLang}: SearchBarProps) {
	type PageWithLink = {
		name: {
			english: string;
			french: string;
		};
		link: string;
	};

	const [queryDisplay, setQueryDisplay] = useState(query);
	const [searchResultsDisplay, setSearchResultsDisplay] = useState(searchResults);
	const [suggestions, setSuggestions] = useState([] as string[]);
	const [products, setProducts] = useState([] as ProductItem[]);
	const [pages, setPages] = useState([] as PageWithLink[]);

	// handling of closing search results when user clicks outside of search results area
	const closeWhenClickedOutsideSearchResults = (event: any) => {
		if (!event.composedPath().includes(document.querySelector("#searchBar"))) {
			setSearchResultsDisplay(false);
			document.removeEventListener("mouseup", closeWhenClickedOutsideSearchResults);
		}
	};

	const searchAlgo = (queryInput: string) => {
		setSearchResultsDisplay(true);
		document.addEventListener("mouseup", closeWhenClickedOutsideSearchResults);
		setQueryDisplay(queryInput);
		if (queryInput != "") {
			// if query input has space (" "), will treat each term as query, returns array of terms
			// else returns array with single element query
			let queryInputArr = queryInput.split(" ");

			// search algo for suggestions
			let suggestionsArr = [] as string[];
			queryInputArr.forEach(queryTerm => {
				searchQuerySuggestions.map((suggestion: string) => {
					if (suggestion.toLowerCase().includes(queryTerm.toLowerCase()) && !suggestionsArr.includes(suggestion)) {
						suggestionsArr = [...suggestionsArr, suggestion];
					}
				});
			});
			setSuggestions(suggestionsArr.slice(0, 5));

			// search algo for products
			let productsArr = [] as ProductItem[];
			queryInputArr.forEach(queryTerm => {
				allProducts.map((prod: ProductItem) => {
					if (prod.name.toLowerCase().includes(queryTerm.toLowerCase()) && !productsArr.includes(prod)) {
						productsArr = [...productsArr, prod];
					}
				});
			});
			setProducts(productsArr.slice(0, 5));

			// search algo for pages
			let pagesArr = [] as PageWithLink[];
			queryInputArr.forEach(queryTerm => {
				sitePages.map((page: {english: string; french: string}) => {
					if (
						page[localLang.lang].toLowerCase().includes(queryTerm.toLowerCase()) &&
						!pagesArr.includes({name: page, link: page["english"].toLowerCase()})
					) {
						pagesArr = [...pagesArr, {name: page, link: page["english"].toLowerCase()}];
					}
				});
			});

			if (productsArr.length > 0) {
				pagesArr = [...pagesArr, {name: {english: "Shop", french: "Magasin"}, link: "shop"}];
			}

			queryInputArr.forEach(queryTerm => {
				allBlogs.map((blog: Blog) => {
					const title = blog.title[localLang.lang].toLowerCase();
					const desc = blog.desc[localLang.lang].toLowerCase();
					const queryLC = queryTerm.toLowerCase();
					if (
						title.includes(queryLC) ||
						(desc.includes(queryLC) &&
							!pagesArr.includes({name: blog.title, link: `blog/${encodeURIComponent(blog.title["english"])}`}))
					) {
						pagesArr = [...pagesArr, {name: blog.title, link: `blog/${encodeURIComponent(blog.title["english"])}`}];
					}
				});
			});
			setPages(pagesArr.slice(0, 5));
		} else {
			// if query is empty, set all to empty
			setSuggestions([] as string[]);
			setPages([] as PageWithLink[]);
			setProducts([] as ProductItem[]);
		}
	};

	const boldQueryInSearchResult = (resultTerm: string) => {
		let queryLC = queryDisplay.toLowerCase();

		if (resultTerm.toLowerCase().includes(queryLC)) {
			const queryIndex = resultTerm.toLowerCase().indexOf(queryLC);
			const queryLength = queryDisplay.length;

			return (
				<>
					{resultTerm.slice(0, queryIndex)}
					<b>{resultTerm.slice(queryIndex, queryIndex + queryLength)}</b>
					{resultTerm.slice(queryIndex + queryLength)}
				</>
			);
		} else {
			return resultTerm;
		}
	};

	useEffect(() => {
		setQueryDisplay(query);
	}, [search]);

	return (
		<div id="searchBar" className="relative w-[42rem] pointer-events-auto group/searchbarAndResults">
			{/* search bar */}
			<form
				action={`/search/${queryDisplay}`}
				className={`relative ${search ? "ring-1 ring-neutral-500 group-hover/searchbarAndResults:ring-2 transition duration-200" : "ring-0"} w-full flex`}
			>
				<input
					id="searchBarInput"
					ref={searchBarInput}
					value={queryDisplay}
					className="w-full px-6 pt-2 outline-none peer"
					onChange={event => searchAlgo(event.target.value)}
				/>
				<label
					htmlFor="searchBarInput"
					className={`absolute left-6 ${queryDisplay != "" ? "top-1 text-[10px] duration-0" : "top-3.5 peer-focus:top-1 peer-focus:text-[10px]"} text-neutral-500 pointer-events-none transition-all duration-200`}
				>
					{localLang.text.nav_search}
				</label>
				<button type="submit" className="bg-white px-6 py-4 group/magnifyingGlassButton">
					<svg
						stroke="currentColor"
						strokeWidth={1}
						className="w-5 h-5 group-hover/magnifyingGlassButton:scale-125 transition duration-200"
					>
						<use href="src/icons_sprite.svg#search" />
					</svg>
				</button>
			</form>
			{/* search results */}
			<div className={`absolute ${queryDisplay != "" && searchResultsDisplay ? "ring-1 ring-neutral-500 group-hover/searchbarAndResults:ring-2 transition duration-200" : "hidden"} top-13 z-10 w-full h-auto bg-white overflow-hidden`}>
				<div className="flex gap-4">
					<div className={`flex flex-col w-2/5 ${suggestions.length > 0 || pages.length > 0 ? "py-2" : ""}`}>
						<div className={`flex flex-col ${suggestions.length > 0 ? "" : "hidden"}`}>
							<p className="text-[11px] uppercase text-primary py-2 mx-6 border-b border-primary/50 tracking-wider">
								{localLang.text.search_suggestions}
							</p>
							<div className="">
								{
									/* list all suggestions with query bolded */
									suggestions.map((suggestion, index) => (
										<a href={`/search/${suggestion}`} key={index}>
											<p className="text-sm px-6 py-2 hover:bg-black/10 transition duration-100">
												{boldQueryInSearchResult(suggestion)}
											</p>
										</a>
									))
								}
							</div>
						</div>
						<div className={`flex flex-col ${pages.length > 0 ? "" : "hidden"}`}>
							<p className="text-[11px] uppercase text-primary py-2 mx-6 border-b border-primary/50 tracking-wider">
								{localLang.text.search_pages}
							</p>
							<div className="">
								{
									/* list all pages with query bolded */
									pages.map((page, index) => (
										<a href={`/${page.link}`} key={index}>
											<p className="text-sm px-6 py-2 hover:bg-black/10 transition duration-100">
												{boldQueryInSearchResult(page.name[localLang.lang])}
											</p>
										</a>
									))
								}
							</div>
						</div>
					</div>
					<div className={`flex flex-col w-3/5 ${products.length > 0 ? "py-2" : "hidden"}`}>
						<p className="text-[11px] uppercase text-primary py-2 mx-6 border-b border-primary/50 tracking-wider">
							{localLang.text.search_products}
						</p>
						<div className="">
							{products.map((prod, index) => (
								<a
									href={`/product/${prod.name}`}
									key={index}
									className="flex items-center gap-6 px-6 py-2 hover:bg-black/10 transition duration-100"
								>
									<img src={prod.img.toString()} className="w-12" />
									<p className="text-xs line-clamp-2">{prod.name}</p>
								</a>
							))}
						</div>
					</div>
				</div>
				<div className={`${queryDisplay != "" && searchResultsDisplay ? "" : "hidden"}`}>
					<a
						href={`/search/${queryDisplay}`}
						className="flex border-t justify-between items-center px-6 py-2 group/toSearchPage hover:bg-black/10"
					>
						<p className="text-sm">
							{localLang.text.search_search_for} "{queryDisplay}"
						</p>
						<svg
							stroke="currentColor"
							className="w-8 h-8 group-hover/toSearchPage:translate-x-1 transition duration-200"
						>
							<use href="src/icons_sprite.svg#right-arrow" />
						</svg>
					</a>
				</div>
			</div>
		</div>
	);
}
