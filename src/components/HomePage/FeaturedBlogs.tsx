import React from "react";
import BlogDisplayCard from "../BlogDisplayCard";
import { allBlogs } from "../../data/blogs";

function FeaturedBlogs() {
	return (
		<section className="py-12">
			<div className="flex justify-center">
				<div className="flex flex-col items-center gap-12 max-w-screen-xl px-12">
					<div className="flex flex-col gap-8 items-center">
						<h2 className="text-4xl">Our Latest Blogs</h2>
						<p className="text-neutral-500">Trending Tech Talks</p>	
					</div>
					<div className="grid grid-cols-3 gap-2 justify-between">
						{allBlogs.slice(0,3).map((blog, index) => (
							<BlogDisplayCard blog={blog} key={index} />
						))}		
					</div>
				</div>				
			</div>
		</section>
	)
}

export default FeaturedBlogs;