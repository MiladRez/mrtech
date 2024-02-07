import React from "react";
import { Link } from "react-router-dom";

export default function ResultsPageCard({ page, localLang }: { page: string, localLang: { text: any, lang: "english" | "french" } }) {
	return (
		<Link to={`/${page.toLowerCase()}`}>
			<div className="flex flex-col h-96 border px-4 py-4 group">
				<div className="relative flex justify-center items-center h-64 pb-6">
					<div className="absolute bg-neutral-800 text-sm text-white px-4 py-1 rounded-2xl bottom-8 left-2">{localLang.text.search_page_page}</div>
					<div className="flex justify-center items-center bg-neutral-400 w-full h-full">
						<svg fill="none" className="w-44 h-44 group-hover:scale-110 transition duration-200">
							<use href="src/icons_sprite.svg#page" />
						</svg>		
					</div>
				</div>
				<h3 className="text-xl group-hover:underline">
					{
						page === "Shop"
							? (localLang.lang === "english"
								? "Shop"
								: "Magasin")
							: page
					}
				</h3>
			</div>
		</Link>
	)
}