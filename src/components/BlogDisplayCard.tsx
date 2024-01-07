import React from "react";
import { Blog } from "../data/blogs";

function BlogDisplayCard({blog}: {blog: Blog}) {
	return (
		<div className="w-1/3 group">
			<div className="overflow-hidden">
				<img src={blog.img.toString()} className="w-full h-56 object-cover group-hover:scale-105 transition duration-300" />
			</div>
			<div className="flex flex-col gap-2 pt-4 px-2">
				<h2 className="text-xl group-hover:underline">{blog.title}</h2>
				<p className="text-xs text-neutral-500">{blog.date}</p>
				<p className="text-neutral-500 pt-2">{blog.desc}</p>
			</div>
		</div>
	)
}

export default BlogDisplayCard;