import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SearchHeader from "../components/SearchPage/SearchHeader";
import SearchResults from "../components/SearchPage/SearchResults";
import { useParams } from "react-router-dom";

export default function Search() {

	const { search_query } = useParams();

	return (
		<>
			<NavBar />
			<SearchHeader searchQuery={search_query!} />
			<SearchResults searchQuery={search_query!} />
			<Footer />
		</>
	);
}