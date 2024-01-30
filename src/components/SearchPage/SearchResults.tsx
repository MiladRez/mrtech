import React from "react";
import { ProductItem, allProducts, sitePages } from "../../data/products";
import ResultsProductCard from "./ResultsProductCard";
import ResultsPageCard from "./ResultsPageCard";
import { Blog, allBlogs } from "../../data/blogs";
import ResultsBlogCard from "./ResultsBlogCard";

export default function SearchResults({ searchQuery }: { searchQuery: string }) {
	const getAllResults = () => {
		let results = [] as React.JSX.Element[]
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
				const title = blog.title.toLowerCase();
				const desc = blog.desc.toLowerCase();
				const queryLC = queryTerm.toLowerCase();
				if (title.includes(queryLC) || desc.includes(queryLC) && !blogsArr.includes(blog)) {
					blogsArr = [...blogsArr, blog];
				}
			});

			sitePages.map((page: string) => {
				if (page.toLowerCase().includes(queryTerm.toLowerCase()) && !pagesArr.includes(page)) {
					pagesArr = [...pagesArr, page];
				}
			});
		});

		// populate results array with query-matched products, blogs and pages
		productsArr.map((prod) => {
			results = [...results, <ResultsProductCard product={prod} />]
		});

		blogsArr.map((blog) => {
			results = [...results, <ResultsBlogCard blog={blog} />]
		});

		pagesArr.map((page) => {
			results = [...results, <ResultsPageCard page={page} />]
		})

		if (atLeastOneProduct) {
			results = [...results, <ResultsPageCard page="Shop" />]
		}

		return results;
	}

	return (
		<section className="flex justify-center">
			<div className="max-w-screen-xl px-12 py-12">
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