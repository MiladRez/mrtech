import React, { useEffect, useRef, useState } from "react";
import mrtechLogo from "../images/mrtech-logo.png";
import { Dropdown } from "flowbite-react";
import CanadaFlagIcon from "../images/canada-flag.png";
import USAFlagIcon from "../images/usa-flag.png";
import { useCart } from "./CartContext";
import { ProductItem } from "../data/products";
import SearchBar from "./SearchBar";
import { localityText } from "../data/locality";

const siteLocality = new Map([
	["Canada (EN)", CanadaFlagIcon],
	["Canada (FR)", CanadaFlagIcon],
	["USA (EN)", USAFlagIcon]
]);

export default function NavBar({ product, setProduct }: { product?: ProductItem | null; setProduct?: Function }) {
	const { numOfItemsInCart } = useCart();

	const searchBarInput = useRef<HTMLInputElement>(null);

	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true);
	const [search, setSearch] = useState(false);
	const [locality, setLocality] = useState(
		localStorage.locality
			? { name: localStorage.locality, img: siteLocality.get(localStorage.locality) }
			: { name: "Canada (EN)", img: CanadaFlagIcon }
	);

	const localLang: any = localStorage.locality
		? localStorage.locality === "Canada (FR)"
			? localityText.french
			: localityText.english
		: localityText.english;

	let img, name, manufacturer;

	if (product) {
		img = product.img;
		name = product.name;
		manufacturer = product.manufacturer;
	}

	const handleScroll = () => {
		const currentScrollPos = window.scrollY;

		if (currentScrollPos > prevScrollPos && currentScrollPos > 500) {
			setVisible(false);
		} else {
			if (!search) {
				setVisible(true);
			}
		}

		setPrevScrollPos(currentScrollPos);
	};

	// handling of opening search bar when user clicks on "magnifying glass search" icon
	const handleSearchButtonClick = () => {
		setSearch(true);
		setVisible(false);
		// focus on search bar
		if (searchBarInput.current) {
			searchBarInput.current.focus();
		}
		document.addEventListener("mouseup", closeWhenClickedOutsideSearchBar);
		document.body.style.overflow = "hidden";
	};

	// handling of closing search bar when user clicks outside search bar
	const handleCloseSearchButtonClick = () => {
		setSearch(false);
		setVisible(true);
		document.removeEventListener("mouseup", closeWhenClickedOutsideSearchBar);
		document.body.style.overflow = "scroll";
	};

	// handling of closing search bar when user clicks outside of search bar
	const closeWhenClickedOutsideSearchBar = (event: any) => {
		if (!event.composedPath().includes(document.querySelector("#searchBar"))) {
			handleCloseSearchButtonClick();
		}
	};

	const closeWhenClickedOutsideCartPopup = (event: any) => {
		if (!event.composedPath().includes(document.querySelector("#cartPopup"))) {
			closeItemAddedPopup();
		}
	};

	// handling of closing new item added to cart popup
	const closeItemAddedPopup = () => {
		setProduct!(null);
		document.removeEventListener("mouseup", closeWhenClickedOutsideCartPopup);
	};

	useEffect(() => {
		product ? document.addEventListener("mouseup", closeWhenClickedOutsideCartPopup) : null;

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	});

	useEffect(() => {
		localStorage.setItem("locality", locality.name!);
	}, [locality]);

	return (
		<>
			<nav
				className={`fixed ${visible ? "max-h-24" : "max-h-0 overflow-hidden"} w-screen flex justify-center bg-stone-50 border-b z-20 transition-[max-height] duration-300`}
			>
				<div className="relative flex w-full max-w-screen-xl justify-between px-12 py-4">
					{/* cart added popup */}
					<div className="absolute left-0 top-0 w-full h-full px-12 py-4 flex justify-end pointer-events-none">
						<div
							id="cartPopup"
							className={`fixed ${product ? "" : "hidden"} ${
								visible ? "top-24" : "top-0"
							} border-x border-b shadow-xl w-96 bg-white transition-[top] duration-300 pointer-events-auto`}
						>
							<div className="relative flex flex-col gap-2 px-12 py-8">
								<svg
									onClick={closeItemAddedPopup}
									stroke="currentColor"
									className="absolute top-0 right-0 mx-8 my-8 w-5 h-5 cursor-pointer hover:scale-125 transition duration-200"
								>
									<use href="src/icons_sprite.svg#cross" />
								</svg>
								<div className="flex items-center gap-2">
									<svg className="w-3.5 h-3.5">
										<use href="src/icons_sprite.svg#checkmark" />
									</svg>
									<p className="text-xs">{localLang.nav_prod_popup_noti}</p>
								</div>
								<div className="flex items-center">
									<img src={img ? img.toString() : ""} className="w-28 px-4 py-4" />
									<div className="flex flex-col gap-1">
										<p className="text-sm">{name}</p>
										<p className="text-xs text-neutral-500">{manufacturer}</p>
									</div>
								</div>
								<div className="flex flex-col items-center gap-2">
									<a href="/cart" className="w-full">
										<button className="w-full py-3 text-sm ring-1 ring-neutral-500 hover:ring-2 transition-all duration-200">
											{localLang.nav_prod_popup_view_my_cart}
										</button>
									</a>
									<button className="w-full py-3 bg-black text-white text-sm ring-1 ring-black hover:bg-primary hover:ring-2 hover:ring-primary hover:text-white transition duration-200">
										{localLang.nav_prod_popup_checkout}
									</button>
									<p onClick={closeItemAddedPopup} className="cursor-pointer pt-2 hover:underline">
										{ localLang.nav_prod_popup_continue_shopping }
									</p>
								</div>
							</div>
						</div>
					</div>
					{/* navbar pages */}
					<div className="flex items-center">
						<a href="/home">
							<img src={mrtechLogo} className="w-20" />
						</a>
						<div className="pl-8">
							<div className="flex items-center gap-8 text-sm">
								<a href="/shop" className="hover:text-primary cursor-pointer">
									{ localLang.nav_shop }
								</a>
								<a href="/deals" className="hover:text-primary cursor-pointer">
									{ localLang.nav_deals }
								</a>
								<a href="/blog" className="hover:text-primary cursor-pointer">
									{ localLang.nav_blog }
								</a>
								<a href="/contact" className="hover:text-primary cursor-pointer">
									{ localLang.nav_contact }
								</a>
								<div>
									<Dropdown
										label={
											<div className="flex items-center gap-2">
												<img src={locality.img} className="w-6 h-6" />
												<p>{locality.name}</p>
											</div>
										}
										inline
										className="!-left-4"
									>
										{Array.from(siteLocality.keys())
											.filter(localeName => localeName != locality.name)
											.map((locale, index) => (
												<Dropdown.Item
													onClick={() =>
														setLocality({ name: locale, img: siteLocality.get(locale) })
													}
													key={index}
													className="pr-5"
												>
													<div className="flex items-center gap-2">
														<img src={siteLocality.get(locale)} className="w-6 h-6" />
														<p>{locale}</p>
													</div>
												</Dropdown.Item>
											))}
									</Dropdown>
								</div>
								<a href="/login" className="uppercase cursor-pointer hover:text-primary">
									{ localLang.nav_register_signin }
								</a>
							</div>
						</div>
					</div>
					{/* search and cart */}
					<div className="flex items-center gap-6">
						<svg
							stroke="currentColor"
							className="w-[1.4rem] h-[1.4rem] cursor-pointer hover:fill-current hover:text-primary"
							onClick={handleSearchButtonClick}
						>
							<use href="src/icons_sprite.svg#search" />
						</svg>
						<a href="/cart" className="relative hover:text-primary group">
							<svg stroke="currentColor" className="w-6 h-6 cursor-pointer hover:fill-current">
								<use href="src/icons_sprite.svg#cart" />
							</svg>
							<div
								className={`${numOfItemsInCart > 0 ? "" : "hidden"} ${
									numOfItemsInCart >= 10 ? "w-5" : "w-4"
								} absolute -top-1.5 left-3.5 h-4 rounded-xl bg-white border border-black flex justify-center items-center group-hover:border-primary`}
							>
								<p className="text-xs pl-px">{numOfItemsInCart}</p>
							</div>
						</a>
					</div>
				</div>
			</nav>
			{/* search bar */}
			<section
				className={`fixed ${
					search ? "bg-black/50 pointer-events-auto" : ""
				} w-screen h-screen flex justify-center z-20 pointer-events-none`}
			>
				<div
					className={`${
						search ? "max-h-min" : "max-h-0"
					} pt-40 transition-[max-height] duration-200 overflow-hidden`}
				>
					<div className="max-w-screen-xl px-12">
						<SearchBar searchBarInput={searchBarInput} search={search} searchResults={true} query="" />
					</div>
				</div>
			</section>
			{/* nav is fixed but still want it to take up space */}
			<section className={`invisible h-24`}></section>
		</>
	);
}
