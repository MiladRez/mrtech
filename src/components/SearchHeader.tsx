import React from "react";
import SearchBar from "./SearchBar";

export default function SearchHeader({ searchQuery } : { searchQuery: string }) {
	return (
		<section className="flex justify-center">
			<div className="flex flex-col items-center max-w-screen-xl px-12 pt-20 gap-8">
				<h1 className="text-2xl">Search results</h1>
				<SearchBar search={true} searchResults={false} query={searchQuery} />	
			</div>
		</section>
	);
}