import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

function BlogPost() {

	const { blog } = useLocation().state;

	useEffect(() => {
		// window.scrollTo(0, 0)
	}, [])

	return (		  
		<>
			<NavBar />
			<div className="flex justify-center">
				<div className="flex flex-col max-w-screen-xl px-12 py-20">
					<div className="flex flex-col gap-12">
						<img src={blog.img.toString()} className="w-full h-[36rem] object-cover" />	
						<div className="flex flex-col items-center">
							<div className="w-2/3 flex flex-col gap-4">
								<div className="relative flex items-end justify-between">
									<h2 className="text-4xl">{blog.title}</h2>	
									<div className="flex items-center gap-2 group cursor-pointer">
										<p className="group-hover:underline">Share</p>
										<svg stroke="currentColor" strokeWidth={1.7} fill="none" className="w-5 h-5">
											<use href="src/icons_sprite.svg#share" />
										</svg>
									</div>
									<div className="absolute right-0 top-12 w-80">
										<div className="relative flex ring-1 ring-neutral-500 hover:ring-2 transition duration-200">
											<input className="w-[42rem] px-4 pt-2 outline-none peer" />
											<label className="absolute top-2 left-4 text-neutral-500 text-[10px] pointer-events-none">Link</label>
											<button className="bg-white px-3 py-4">
												<svg stroke="currentColor" strokeWidth={0.5} className="w-5 h-5 hover:scale-125 transition duration-200">
													<use href="src/icons_sprite.svg#copy" />
												</svg>
											</button>
										</div>
									</div>
								</div>
								<p className="text-xs text-neutral-500 pt-4">{blog.date}</p>
								<p className="text-neutral-800 pt-4 whitespace-pre-line leading-loose">{blog.content}</p>	
							</div>
						</div>		
					</div>	
				</div>
			</div>
			<Footer />
		</>
	)
}

export default BlogPost;