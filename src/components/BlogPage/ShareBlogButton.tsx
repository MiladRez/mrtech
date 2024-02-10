import React, {useState} from "react";

type ShareBlogButtonProps = {
	id: number,
	copyLinkVisible: boolean,
	setCopyLinkVisible: Function,
	localLang: any
}

export default function ShareBlogButton({id, copyLinkVisible, setCopyLinkVisible, localLang}: ShareBlogButtonProps) {

    const [copiedToClipboardVisible, setCopiedToClipboardVisible] = useState(false);

	// handling of opening search bar when user clicks on "magnifying glass search" icon
	const handleShareButtonClick = () => {
        setCopiedToClipboardVisible(false);
		setCopyLinkVisible(true);
		document.addEventListener("mouseup", closeWhenClickedOutsideCopyLink);
	};

    // handling of closing search bar when user clicks outside of search bar
	const closeWhenClickedOutsideCopyLink = (event: any) => {
		if (!event.composedPath().includes(document.querySelector(`#copyLink${id}`))) {
			setCopyLinkVisible(false);
			document.removeEventListener("mouseup", closeWhenClickedOutsideCopyLink);
		}
    };

    // handling action when user clicks on copy link button
	const handleCopyLinkButtonClick = () => {
        setCopiedToClipboardVisible(true);
        navigator.clipboard.writeText(window.location.href);
    };

	return (
		<div className="relative">
			<div className="flex items-center gap-2 group cursor-pointer" onClick={handleShareButtonClick}>
				<p className="text-sm md:text-base group-hover:underline">{localLang.blog_share}</p>
				<svg stroke="currentColor" strokeWidth={1.7} fill="none" className="w-4 h-4 mb-1 md:mb-0 md:w-5 md:h-5">
					<use href="src/icons_sprite.svg#share" />
				</svg>
			</div>
			<div id={`copyLink${id}`} className={`${copyLinkVisible ? "max-h-32 ring-1" : "max-h-0 ring-0"} absolute right-0 top-8 w-80 bg-white ring-neutral-500 hover:ring-2 transition-all duration-200 overflow-hidden`}>
				<div className={`${copiedToClipboardVisible ? "hidden" : ""} relative flex`}>
					<label className="absolute top-1 left-4 text-neutral-500 text-[10px] pointer-events-none">{localLang.blog_link}</label>
					<p className="w-full pt-4 px-4 text-xs md:text-sm text-clip overflow-hidden whitespace-nowrap">{window.location.href}</p>
					<button className="bg-white px-3 py-3" onClick={handleCopyLinkButtonClick}>
						<svg stroke="currentColor" strokeWidth={0.01} className="w-4 h-4 md:w-5 md:h-5 hover:scale-110 transition duration-100">
							<use href="src/icons_sprite.svg#copy" />
						</svg>
					</button>
				</div>
				<div className={`${copiedToClipboardVisible ? "flex justify-center" : "hidden"}`}>
					<p className="px-4 py-3 text-sm">{localLang.blog_copied_to_clipboard}</p>
				</div>
			</div>
		</div>
	);
}