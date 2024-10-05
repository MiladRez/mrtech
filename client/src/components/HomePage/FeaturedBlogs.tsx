import React from "react";
import BlogDisplayCard from "../BlogPage/BlogDisplayCard";
import { allBlogs } from "../../data/blogs";

export default function FeaturedBlogs({ localLang }: { localLang: { text: any, lang: "english" | "french" } }) {
	return (
		<section className="flex justify-center">
			<div className="flex flex-col items-center gap-12 max-w-screen-xl px-12 py-10">
				<div className="flex flex-col gap-8 items-center">
					<h2 className="text-3xl md:text-4xl text-center">{ localLang.text.featured_blogs_header }</h2>
					<p className="text-neutral-500 text-center">{ localLang.text.featured_blogs_subheader }</p>	
				</div>
				<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-12 md:gap-4 xl:gap-2 justify-between">
					{allBlogs.slice(0,3).map((blog, index) => (
						<BlogDisplayCard blog={blog} key={index} localLang={localLang.lang} />
					))}		
				</div>
			</div>				
		</section>
	)
}