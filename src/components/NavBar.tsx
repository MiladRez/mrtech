import React, { useEffect, useRef, useState } from "react";
import mrtechLogo from "../images/mrtech-logo.png";

const langs: string[] = ["French", "Spanish"];

function NavBar() {

	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true);
	const [search, setSearch] = useState(false);

	const searchBarInput = useRef<HTMLInputElement>(null);

	const handleScroll = () => {
		const currentScrollPos = window.scrollY;

		if (currentScrollPos > prevScrollPos && currentScrollPos > 500) {
			setVisible(false);
		} else {
			setVisible(true)
		}

		setPrevScrollPos(currentScrollPos)
	}

	const handleSearchButtonClick = () => {
		setSearch(!search);
		setVisible(!visible);
		// focus on search bar
		if (searchBarInput.current) {
			searchBarInput.current.focus()
		}
		document.addEventListener("mouseup", closeWhenClickedOutsideSearchBar);
	}

	const closeWhenClickedOutsideSearchBar = (e: any) => {
		if (!e.composedPath().includes(document.querySelector("#searchBar"))) {
			setSearch(false);
			setVisible(true);
			document.removeEventListener("mouseup", closeWhenClickedOutsideSearchBar);
		}
	}

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll)
	});

	return (
		<>
			<nav className={`fixed ${visible ? "max-h-24" : "max-h-0"} w-screen flex justify-center bg-neutral-50 z-10 transition-[max-height] duration-300 overflow-hidden`}>
				<div className="flex w-full max-w-screen-xl justify-between px-12 py-4">
					<div className="flex items-center">
						<a href="/">
							<img src={mrtechLogo} className="w-20" />
						</a>
						<div className="pl-8">
							<div className="flex gap-8 text-sm">
								<a href="/shop" className="hover:text-primary cursor-pointer">Shop</a>
								<a href="/discounts" className="hover:text-primary cursor-pointer">Discounts</a>
								<a href="/blog" className="hover:text-primary cursor-pointer">Blog</a>
								<a href="contact" className="hover:text-primary cursor-pointer">Contact</a>
								<select defaultValue={'default'} className="cursor-pointer bg-neutral-50 focus:outline-none hover:text-primary">
									<option value="default">
										English
									</option>
									{langs.map((lang, index) => (
										<option value={lang} key={index}>
											{lang}
										</option>
									))}
								</select>
								<a className="uppercase cursor-pointer hover:text-primary">Register / Sign in</a>
							</div>
						</div>					
					</div>
					<div className="flex items-center gap-6">
						<svg stroke="currentColor" className="w-[1.4rem] h-[1.4rem] cursor-pointer hover:fill-current hover:text-primary" onClick={handleSearchButtonClick}>
							<use href="src/icons_sprite.svg#search" />
						</svg>
						<a href="/cart">
							<svg stroke="currentColor" className="w-6 h-6 cursor-pointer hover:fill-current hover:text-primary">
								<use href="src/icons_sprite.svg#cart" />
							</svg>	
						</a>
					</div>
				</div>
			</nav>
			{/* search bar */}
			<div id="searchBar" className={`fixed ${search ? "max-h-24" : "max-h-0"} w-screen h-24 flex justify-center items-center bg-neutral-50 z-10 transition-[max-height] duration-200 overflow-hidden`}>
				<div className="w-full flex justify-center max-w-screen-xl px-12">
					<div className="relative flex ring-1 ring-neutral-500 hover:ring-2 transition duration-200">
						<input ref={searchBarInput} className="w-[42rem] px-4 pt-2 outline-none peer" />
						<label className="absolute top-2 left-4 text-neutral-500 pointer-events-none peer-focus:text-[10px] peer-focus:top-1 transition-all duration-200">Search</label>
						<button className="bg-white px-3 py-4">
							<svg stroke="currentColor" strokeWidth={1} className="w-5 h-5 hover:scale-125 transition duration-200">
								<use href="src/icons_sprite.svg#search" />
							</svg>
						</button>
					</div>
					<button onClick={handleSearchButtonClick} className="px-3">
						<svg stroke="currentColor" className="w-6 h-6 hover:scale-125 hover:text-primary transition duration-200">
							<use href="src/icons_sprite.svg#cross" />
						</svg>
					</button>
				</div>
			</div>
			<div className={`invisible h-24`}></div>
		</>
	)
}

export default NavBar;