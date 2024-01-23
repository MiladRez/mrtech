import React from "react";
import { allBlogs } from "../data/blogs";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import BlogDisplayCard from "../components/BlogDisplayCard";
import { Link } from "react-router-dom";

export default function Blog() {
	const headerBlog = allBlogs[0]

	return (
		<>
			<NavBar />
			<div className="flex justify-center">
				<div className="flex flex-col gap-12 max-w-screen-xl px-12 py-20">
					<h1 className="text-4xl">Trending</h1>
					<Link to={`/blog/${encodeURIComponent(headerBlog.title)}`} state={{ blog: headerBlog }}>
						<div className="group">
							<div className="overflow-hidden">
								<img src={headerBlog.img.toString()} className="w-full h-[36rem] object-cover group-hover:scale-105 transition duration-300" />	
							</div>
							<div className="flex flex-col items-center gap-2 px-2 pt-4">
								<h2 className="text-xl group-hover:underline">{headerBlog.title}</h2>
								<p className="text-xs text-neutral-500">{headerBlog.date}</p>
								<p className="text-neutral-500 pt-2">{headerBlog.desc}</p>
							</div>		
						</div>	
					</Link>
					<div className="grid grid-cols-3 gap-2 justify-between">
						{allBlogs.slice(1).map((blog, index) => (
							<BlogDisplayCard blog={blog} key={index} />
						))}		
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}