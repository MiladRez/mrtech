import React, { useEffect, useRef, useState } from "react";
import mrtechLogo from "../images/mrtech-logo.png";
import { Dropdown } from "flowbite-react";
import CanadaFlagIcon from "../images/canada-flag.png";
import USAFlagIcon from "../images/usa-flag.png";

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
			if (!search) {
				setVisible(true)
			}
		}

		setPrevScrollPos(currentScrollPos)
	}

	const handleSearchButtonClick = () => {
		setSearch(true);
		setVisible(false);
		// focus on search bar
		if (searchBarInput.current) {
			searchBarInput.current.focus()
		}
		document.addEventListener("mouseup", closeWhenClickedOutsideSearchBar);
		document.body.style.overflow = "hidden";
	}

	const handleCloseSearchButtonClick = () => {
		setSearch(false);
		setVisible(true);
		document.removeEventListener("mouseup", closeWhenClickedOutsideSearchBar);
		document.body.style.overflow = "scroll";
	}

	const closeWhenClickedOutsideSearchBar = (event: any) => {
		if (!event.composedPath().includes(document.querySelector("#searchBar"))) {
			setSearch(false);
			setVisible(true);
			document.removeEventListener("mouseup", closeWhenClickedOutsideSearchBar);
			document.body.style.overflow = "scroll";
		}
	}

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll)
	});

	return (
		<>
			<nav className={`fixed ${visible ? "max-h-24" : "max-h-0 overflow-hidden"} w-screen flex justify-center bg-stone-50 border-b z-20 transition-[max-height] duration-300`}>
				<div className="flex w-full max-w-screen-xl justify-between px-12 py-4">
					<div className="flex items-center">
						<a href="/">
							<img src={mrtechLogo} className="w-20" />
						</a>
						<div className="pl-8">
							<div className="flex items-center gap-8 text-sm">
								<a href="/shop" className="hover:text-primary cursor-pointer">Shop</a>
								<a href="/deals" className="hover:text-primary cursor-pointer">Deals</a>
								<a href="/blog" className="hover:text-primary cursor-pointer">Blog</a>
								<a href="/contact" className="hover:text-primary cursor-pointer">Contact</a>
								<div>
									<Dropdown
										label={
											<div className="flex items-center gap-2">
												<img src={CanadaFlagIcon} className="w-6 h-6" />
												<p>Canada (EN)</p>
											</div>
										}
										inline
										className="!-left-4"
									>
										<Dropdown.Item className="pr-5">
											<div className="flex items-center gap-2">
												<img src={CanadaFlagIcon} className="w-6 h-6" />
												<p>Canada (FR)</p>
											</div>
										</Dropdown.Item>
										<Dropdown.Item className="pr-5">
											<div className="flex items-center gap-2">
												<img src={USAFlagIcon} className="w-6 h-6" />
												<p>USA (EN)</p>
											</div>
										</Dropdown.Item>
									</Dropdown>
								</div>
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
					<button onClick={handleCloseSearchButtonClick} className="px-3">
						<svg stroke="currentColor" className="w-6 h-6 hover:scale-125 hover:text-primary transition duration-200">
							<use href="src/icons_sprite.svg#cross" />
						</svg>
					</button>
				</div>
			</div>
			<div className={`invisible h-24`}></div>
			<div className={`${search ? "bg-black pointer-events-auto" : ""} w-screen h-screen fixed opacity-50 z-10 pointer-events-none`}></div>
		</>
	)
}

export default NavBar;