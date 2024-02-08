import React from "react";
import {ProductItem, allProducts, sitePages} from "../../data/products";
import ResultsProductCard from "./ResultsProductCard";
import ResultsPageCard from "./ResultsPageCard";
import {Blog, allBlogs} from "../../data/blogs";
import ResultsBlogCard from "./ResultsBlogCard";

type SearchResultsProps = {
	searchQuery: string;
	locale: {
		localLang: {
			text: any;
			lang: "english" | "french";
		};
		localCurrency: "cad" | "usd";
	};
};

export default function SearchResults({searchQuery, locale}: SearchResultsProps) {
	const getAllResults = () => {
		let results = [] as React.JSX.Element[];
		let atLeastOneProduct = false;

		// if query input has space (" "), will treat each term as query, returns array of terms
		// else returns array with single element query
		let searchQueryArr = searchQuery.split(" ");

		// store query-matched products, blogs, and pages in their respective arrays
		let productsArr = [] as ProductItem[];
		let blogsArr = [] as Blog[];
		let pagesArr = [] as string[];

		searchQueryArr.forEach(queryTerm => {
			allProducts.map((prod: ProductItem) => {
				if (prod.name.toLowerCase().includes(queryTerm.toLowerCase()) && !productsArr.includes(prod)) {
					productsArr = [...productsArr, prod];
					atLeastOneProduct = true;
				}
			});

			allBlogs.map((blog: Blog) => {
				const title = blog.title[locale.localLang.lang].toLowerCase();
				const desc = blog.desc[locale.localLang.lang].toLowerCase();
				const queryLC = queryTerm.toLowerCase();
				if (title.includes(queryLC) || (desc.includes(queryLC) && !blogsArr.includes(blog))) {
					blogsArr = [...blogsArr, blog];
				}
			});

			sitePages.map((page: {english: string; french: string}) => {
				if (
					page[locale.localLang.lang].toLowerCase().includes(queryTerm.toLowerCase()) &&
					!pagesArr.includes(page[locale.localLang.lang])
				) {
					pagesArr = [...pagesArr, page[locale.localLang.lang]];
				}
			});
		});

		// populate results array with query-matched products, blogs and pages
		productsArr.map(prod => {
			results = [...results, <ResultsProductCard product={prod} locale={locale} />];
		});

		blogsArr.map(blog => {
			results = [...results, <ResultsBlogCard blog={blog} localLang={locale.localLang} />];
		});

		pagesArr.map(page => {
			results = [...results, <ResultsPageCard page={page} localLang={locale.localLang} />];
		});

		if (atLeastOneProduct && !pagesArr.includes("Shop") && !pagesArr.includes("Magasin")) {
			results = [...results, <ResultsPageCard page="Shop" localLang={locale.localLang} />];
		}

		return results;
	};

	return (
		<section className="flex justify-center">
			<div className="w-full max-w-screen-xl px-12 py-12">
				<div className="grid grid-cols-4 gap-2">
					{getAllResults().map((result, index) => (
						<div key={index} className="">
							{result}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
