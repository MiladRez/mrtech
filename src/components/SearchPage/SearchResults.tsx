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

		allProducts.map((prod: ProductItem) => {
			if (prod.name.toLowerCase().includes(searchQuery.toLowerCase())) {
				results = [...results, <ResultsProductCard product={prod} />];
				atLeastOneProduct = true;
			}
		});

		allBlogs.map((blog: Blog) => {
			const title = blog.title.toLowerCase();
			const desc = blog.desc.toLowerCase();
			const queryLC = searchQuery.toLowerCase();
			if (title.includes(queryLC) || desc.includes(queryLC)) {
				results = [...results, <ResultsBlogCard blog={blog}/>];
			}
		})

		sitePages.map((page: string) => {
			if (page.toLowerCase().includes(searchQuery.toLowerCase())) {
				results = [...results, <ResultsPageCard page={page} />];
			}
		});

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