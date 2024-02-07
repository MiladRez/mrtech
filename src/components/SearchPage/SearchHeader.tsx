import React from "react";
import SearchBar from "../SearchBar";

export default function SearchHeader({ searchQuery, localLang } : { searchQuery: string, localLang: { text: any, lang: "english" | "french" } }) {
	return (
		<section className="flex justify-center">
			<div className="flex flex-col items-center max-w-screen-xl px-12 pt-20 gap-8">
				<h1 className="text-2xl">{localLang.text.search_page_header}</h1>
				<SearchBar search={true} searchResults={false} query={searchQuery} localLang={localLang}  />	
			</div>
		</section>
	);
}