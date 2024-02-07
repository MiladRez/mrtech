import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SearchHeader from "../components/SearchPage/SearchHeader";
import SearchResults from "../components/SearchPage/SearchResults";
import {useParams} from "react-router-dom";

type SearchProps = {
	locale: {
		localLang: {
			text: any,
			lang: "english" | "french"
		},
		localCurrency: "cad" | "usd"
	},
	setLocale: Function
}

export default function Search({locale, setLocale}: SearchProps) {

	const { search_query } = useParams();

	return (
		<>
			<NavBar localLang={locale.localLang} setLocale={setLocale} />
			<SearchHeader searchQuery={search_query!} localLang={locale.localLang} />
			<SearchResults searchQuery={search_query!} locale={locale} />
			<Footer localLang={locale.localLang.text} />
		</>
	);
}