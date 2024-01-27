import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SearchHeader from "../components/SearchHeader";
import SearchResults from "../components/SearchResults";

export default function Search() {

	const searchQuery = localStorage.getItem("searchQuery");
	console.log(searchQuery);

	return (
		<>
			<NavBar />
			<SearchHeader />
			<SearchResults />
			<Footer />
		</>
	);
}