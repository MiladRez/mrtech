import React from "react";
import { Link } from "react-router-dom";
import { Blog } from "../../data/blogs";

export default function ResultsBlogCard({ blog, localLang }: { blog: Blog, localLang: { text: any, lang: "english" | "french" } }) {
	const { title, img, date, author } = blog;

	return (
		<>
			<Link to={`/blog/${encodeURIComponent(title["english"])}`} >
				<div className="group border sm:h-96 px-4 py-4">
					<div className="relative overflow-hidden">
						<img src={img.toString()} className="w-full h-64 pb-6 object-cover group-hover:scale-105 transition duration-300" />
						<div className="absolute bg-neutral-500 text-sm text-white px-4 py-1 rounded-2xl bottom-8 left-2">{localLang.text.search_page_blog}</div>
					</div>
					<div className="flex flex-col gap-2 px-2">
						<h2 className="text-lg group-hover:underline line-clamp-2">{title[localLang.lang]}</h2>
						<div className="flex items-center gap-2">
							<p className="text-xs text-neutral-500">{date[localLang.lang]}</p>	
							<p className="text-sm">~</p>
							<p className="text-xs">{author}</p>
						</div>
					</div>
				</div>
			</Link>
		</>
	)
}