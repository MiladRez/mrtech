import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

export default function BlogPost() {

	const { blog } = useLocation().state;
	const [copyLinkVisible, setCopyLinkVisible] = useState(false);
	const [copiedToClipboardVisible, setCopiedToClipboardVisible] = useState(false);

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

	return (		  
		<>
			<NavBar />
			<div className="flex justify-center">
				<div className="flex flex-col max-w-screen-xl px-12 py-20">
					<div className="flex flex-col gap-12">
						<img src={ blog.img.toString() } className="w-full h-[36rem] object-cover" />	
						<div className="flex flex-col items-center">
							<div className="w-2/3 flex flex-col gap-4">
								<div className="relative flex items-end justify-between">
									<h2 className="text-4xl">{blog.title}</h2>	
									<div className="flex items-center gap-2 group cursor-pointer" onClick={ handleShareButtonClick }>
										<p className="group-hover:underline">Share</p>
										<svg stroke="currentColor" strokeWidth={1.7} fill="none" className="w-5 h-5">
											<use href="src/icons_sprite.svg#share" />
										</svg>
									</div>
									<div id="copyLink" className={`${ copyLinkVisible ? "max-h-32" : "max-h-0 ring-0" } absolute right-0 top-14 w-80 ring-1 ring-neutral-500 hover:ring-2 transition-all duration-200 overflow-hidden`}>
										<div className={`${ copiedToClipboardVisible ? "hidden" : "" } relative flex`}>
											<label className="absolute top-1 left-4 text-neutral-500 text-[10px] pointer-events-none">Link</label>
											<p className="w-full pt-4 px-4 text-sm text-clip overflow-hidden">{ window.location.href }</p>
											<button className="bg-white px-3 py-3" onClick={handleCopyLinkButtonClick}>
												<svg stroke="currentColor" strokeWidth={0.01} className="w-5 h-5 hover:scale-110 transition duration-100">
													<use href="src/icons_sprite.svg#copy" />
												</svg>
											</button>	
										</div>
										<div className={`${ copiedToClipboardVisible ? "flex justify-center" : "hidden" }`}>
											<p className="px-4 py-3 text-sm">Copied to clipboard</p>	
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