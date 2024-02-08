import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { Blog, allBlogs } from "../data/blogs";

export default function BlogPost({localLang, setLocale}: { localLang: {text: any, lang: "english" | "french"}, setLocale: Function }) {

	const { blog_title } = useParams();
	const [blog, setBlog] = useState({} as Blog);
	const [copyLinkVisible, setCopyLinkVisible] = useState(false);
	const [copiedToClipboardVisible, setCopiedToClipboardVisible] = useState(false);

	const { img } = blog;
	const title = blog.id ? blog.title[localLang.lang] : null;
	const date = blog.id ? blog.date[localLang.lang] : null;
	const content = blog.id ? blog.content[localLang.lang] : null;

	// handling of opening search bar when user clicks on "magnifying glass search" icon
	const handleShareButtonClick = () => {
		setCopiedToClipboardVisible(false);
		setCopyLinkVisible(true);
		document.addEventListener("mouseup", closeWhenClickedOutsideCopyLink);
	}

	// handling of closing search bar when user clicks outside of search bar
	const closeWhenClickedOutsideCopyLink = (event: any) => {
		if (!event.composedPath().includes(document.querySelector("#copyLink"))) {
			setCopyLinkVisible(false);
		}
	}

	// handling action when user clicks on copy link button
	const handleCopyLinkButtonClick = () => {
		setCopiedToClipboardVisible(true);
		navigator.clipboard.writeText(window.location.href)
	}

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	useEffect(() => {
		allBlogs.forEach((blog) => {
			if (blog.title["english"] === decodeURIComponent(blog_title!)) {
				setBlog(blog);
			}
		})
	}, [blog_title]);

	return (		  
		<>
			<NavBar localLang={localLang} setLocale={setLocale} />
			<section className="flex justify-center">
				<div className="flex flex-col max-w-screen-xl px-12 py-20">
					<div className="flex flex-col gap-12">
						<img src={ img ? img.toString() : "" } className="w-full h-[36rem] object-cover" />	
						<div className="flex flex-col items-center">
							<div className="w-2/3 flex flex-col gap-4">
								<div className="flex items-end justify-between">
									<h2 className="text-4xl">{title}</h2>
									<div className="relative">
										<div className="flex items-center gap-2 group cursor-pointer" onClick={ handleShareButtonClick }>
											<p className="group-hover:underline">{ localLang.text.blog_share }</p>
											<svg stroke="currentColor" strokeWidth={1.7} fill="none" className="w-5 h-5">
												<use href="src/icons_sprite.svg#share" />
											</svg>
										</div>	
										<div id="copyLink" className={`${ copyLinkVisible ? "max-h-32 ring-1" : "max-h-0 ring-0" } absolute right-0 top-8 w-80 ring-neutral-500 hover:ring-2 transition-all duration-200 overflow-hidden`}>
											<div className={`${ copiedToClipboardVisible ? "hidden" : "" } relative flex`}>
												<label className="absolute top-1 left-4 text-neutral-500 text-[10px] pointer-events-none">{ localLang.text.blog_link }</label>
												<p className="w-full pt-4 px-4 text-sm text-clip overflow-hidden whitespace-nowrap">{ window.location.href }</p>
												<button className="bg-white px-3 py-3" onClick={handleCopyLinkButtonClick}>
													<svg stroke="currentColor" strokeWidth={0.01} className="w-5 h-5 hover:scale-110 transition duration-100">
														<use href="src/icons_sprite.svg#copy" />
													</svg>
												</button>	
											</div>
											<div className={`${ copiedToClipboardVisible ? "flex justify-center" : "hidden" }`}>
												<p className="px-4 py-3 text-sm">{ localLang.text.blog_copied_to_clipboard }</p>	
											</div>
										</div>
									</div>
								</div>
								<p className="text-xs text-neutral-500 pt-4">{date}</p>
								<p className="text-neutral-800 pt-4 whitespace-pre-line leading-loose">{content}</p>	
							</div>
						</div>		
					</div>	
				</div>
			</section>
			<Footer localLang={localLang.text} />
		</>
	)
}