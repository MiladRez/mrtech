import React, {useEffect, useState} from "react";
import {ProductItem} from "../data/products";
import iconsSprite from "../icons_sprite.svg";
import {Link} from "react-router-dom";
import httpClient from "../utils/httpClient";
import api from "../utils/flaskEndpoint";

type AddedToCartPopupProps = {
	product: ProductItem | null | undefined,
	visible: boolean,
	closeItemAddedPopup: Function,
	localLang: any
}

export default function AddedToCartPopup({product, visible, closeItemAddedPopup, localLang}: AddedToCartPopupProps) {
	
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	
	let img, name, manufacturer;

	if (product) {
		img = product.img;
		name = product.name;
		manufacturer = product.manufacturer;
	}

	useEffect(() => {
		const checkUserToken = async () => {
			const response = await httpClient.get(`${api}/authorized`);
			if (response.data.authorized) {
				// console.log("User is authorized via Google")
				setIsLoggedIn(true);
			} else {
				// console.log("User is not authorized")
				setIsLoggedIn(false);
			}
		}
		checkUserToken();
	}, []);

	return (
		<div className="absolute left-0 top-0 w-full h-full sm:px-12 py-4 flex justify-end pointer-events-none">
			<div
				id="cartPopup"
				className={`fixed ${product ? "" : "hidden"} ${
					visible ? "top-24" : "top-0"
				} border-x border-b border-t-0 shadow-xl w-60 sm:w-96 bg-white transition-[top] duration-300 pointer-events-auto`}
			>
				<div className="relative flex flex-col sm:gap-2 px-4 sm:px-8 py-4 sm:py-6">
					<svg
						onClick={() => closeItemAddedPopup()}
						stroke="currentColor"
						className="absolute top-0 right-0 mx-4 my-3 sm:mx-6 sm:my-6 w-5 h-5 cursor-pointer hover:scale-125 transition duration-200"
					>
						<use href={`${iconsSprite}#cross`} />
					</svg>
					<div className="flex items-center gap-2">
						<svg className="w-3 h-3 pb-px sm:w-3.5 sm:h-3.5">
							<use href={`${iconsSprite}#checkmark`} />
						</svg>
						<p className="text-[10px] sm:text-xs max-w-40 sm:max-w-64">{localLang.nav_prod_popup_noti}</p>
					</div>
					<div className="flex items-center">
						<img src={img ? img.toString() : ""} className="w-28 px-4 py-4" />
						<div className="flex flex-col gap-1">
							<p className="text-xs sm:text-sm line-clamp-2">{name}</p>
							<p className="text-[10px] sm:text-xs text-neutral-500">{manufacturer}</p>
						</div>
					</div>
					<div className="flex flex-col items-center gap-2">
						<a href="/cart" className="w-full">
							<button className="w-full py-3 text-xs sm:text-sm ring-1 ring-neutral-500 hover:ring-2 transition-all duration-200">
								{localLang.nav_prod_popup_view_my_cart}
							</button>
						</a>
						<Link
							to={isLoggedIn ? "/checkout" : "/login"}
							state={"/checkout"}
							className="w-full">
							<button className="w-full py-3 bg-black text-white text-xs sm:text-sm ring-1 ring-black hover:bg-primary hover:ring-2 hover:ring-primary hover:text-white transition duration-200">
								{localLang.nav_prod_popup_checkout}
							</button>
						</Link>
						<p onClick={() => closeItemAddedPopup()} className="cursor-pointer pt-2 hover:underline text-sm sm:text-base">
							{ localLang.nav_prod_popup_continue_shopping }
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}