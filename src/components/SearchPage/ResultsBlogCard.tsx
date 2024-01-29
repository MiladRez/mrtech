import React from "react";
import { Link } from "react-router-dom";
import { Blog } from "../../data/blogs";

export default function ResultsBlogCard({ blog }: { blog: Blog }) {
	const { title, img, date } = blog;

	return (
		<>
			<Link to={`/blog/${encodeURIComponent(title)}`} >
				<div className="group border h-[26rem] px-4 py-4">
					<div className="overflow-hidden">
						<img src={img.toString()} className="w-full h-64 pb-6 object-cover group-hover:scale-105 transition duration-300" />
					</div>
					<div className="flex flex-col gap-2 px-2">
						<h2 className="text-xl group-hover:underline">{title}</h2>
						<p className="text-xs text-neutral-500">{date}</p>
					</div>
				</div>
			</Link>
		</>
	)
}