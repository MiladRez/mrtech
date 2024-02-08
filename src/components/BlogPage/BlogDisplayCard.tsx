import React from "react";
import { Blog } from "../../data/blogs";
import { Link } from "react-router-dom";

export default function BlogDisplayCard({blog, localLang}: {blog: Blog, localLang: "english" | "french"}) {
	return (
		<Link to={`/blog/${encodeURIComponent(blog.title["english"])}`} >
			<div className="group">
				<div className="overflow-hidden">
					<img src={blog.img.toString()} className="w-full h-56 object-cover group-hover:scale-105 transition duration-300" />
				</div>
				<div className="flex flex-col gap-2 pt-4 px-2">
					<h2 className="text-xl group-hover:underline">{blog.title[localLang]}</h2>
					<div className="flex items-center gap-2">
						<p className="text-xs text-neutral-500">{blog.date[localLang]}</p>
						<p className="text-sm">~</p>
						<p className="text-xs">{blog.author}</p>
					</div>
					
					<p className="text-neutral-500 pt-2">{blog.desc[localLang]}</p>
				</div>
			</div>
		</Link>
	)
}