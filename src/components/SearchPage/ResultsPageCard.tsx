import React from "react";
import { Link } from "react-router-dom";

export default function ResultsPageCard({ page }: { page: string }) {
	return (
		<Link to={`/${page.toLowerCase()}`}>
			<div className="flex flex-col h-full border px-4 py-4 group">
				<div className="flex justify-center items-center h-64 pb-6">
					<div className="flex justify-center items-center bg-neutral-400 w-full h-full">
						<svg fill="none" className="w-44 h-44 group-hover:scale-110 transition duration-200">
							<use href="src/icons_sprite.svg#page" />
						</svg>		
					</div>
				</div>
				<h3 className="text-2xl group-hover:underline">{ page }</h3>
			</div>
		</Link>
	)
}