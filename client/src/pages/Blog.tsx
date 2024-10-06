import React, {useEffect, useState} from "react";
import { BlogItem, getAllBlogsFromDB } from "../data/blogs";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import BlogDisplayCard from "../components/BlogPage/BlogDisplayCard";
import {Link} from "react-router-dom";
import iconsSprite from "../icons_sprite.svg";

export default function Blog({localLang, setLocale}: { localLang: {text: any, lang: "english" | "french"}, setLocale: Function}) {
	const [blogList, setBlogList] = useState<BlogItem[]>([]);
	const [headerBlog, setHeaderBlog] = useState<BlogItem>(blogList[0]);

	useEffect(() => {
		const getBlogsList = async () => {
			const data = await getAllBlogsFromDB();
			setBlogList(data);
		}
		getBlogsList();
	}, [])

	useEffect(() => {
		setHeaderBlog(blogList[0]);
	}, [blogList]);

	return (
		<>
			<NavBar localLang={localLang} setLocale={setLocale} />
			<div className="flex justify-center">
				{ headerBlog ? (
					<div className="flex flex-col gap-12 max-w-screen-xl px-12 py-10 sm:py-20">
						<h1 className="text-4xl">{localLang.text.blog_header}</h1>
						<Link to={`/blog/${encodeURIComponent(headerBlog.title["english"])}`} >
							<div className="group border shadow-lg">
								<div className="mx-4 mt-4 overflow-hidden">
									<img src={headerBlog.img.toString()} className="w-full md:h-[36rem] object-cover group-hover:scale-105 transition duration-300" />	
								</div>
								<div className="flex flex-col items-center gap-2 px-2 py-12">
									<h2 className="text-xl group-hover:underline text-center">{headerBlog.title[localLang.lang]}</h2>
									<div className="flex items-center gap-2">
										<p className="text-xs text-neutral-500">{headerBlog.date[localLang.lang]}</p>
										<p className="text-sm">~</p>
										<p className="text-xs">{headerBlog.author}</p>
									</div>
									<p className="text-neutral-500 pt-2 sm:w-1/2 text-center text-sm md:text-base">{headerBlog.desc[localLang.lang]}</p>
								</div>		
							</div>	
						</Link>
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-4 xl:gap-2 justify-between">
							{blogList.slice(1).map((blog, index) => (
								<div key={index} className="border px-4 py-4 shadow-lg">
									<BlogDisplayCard blog={blog} localLang={localLang.lang} />
								</div>
							))}		
						</div>
					</div>
				) : 
					<div className="flex flex-col gap-12 max-w-screen-xl px-12 py-10 sm:py-20">
						{/* spinner */}
						<svg
							stroke="currentColor"
							className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
						>
                        	<use href={`${iconsSprite}#spinner`} />
                    	</svg>
					</div>
				}
			</div>
			<Footer localLang={localLang.text} />
		</>
	)
}