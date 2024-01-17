import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

function BlogPost() {
	
	const { blog } = useLocation().state

	useEffect(() => {
		window.scrollTo(0, 0)
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
								<h2 className="text-4xl">{blog.title}</h2>
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