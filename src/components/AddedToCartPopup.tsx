import React from "react";
import {ProductItem} from "../data/products";

type AddedToCartPopupProps = {
	product: ProductItem | null | undefined,
	visible: boolean,
	closeItemAddedPopup: Function,
	localLang: any
}

export default function AddedToCartPopup({product, visible, closeItemAddedPopup, localLang }: AddedToCartPopupProps) {
	
	let img, name, manufacturer;

	if (product) {
		img = product.img;
		name = product.name;
		manufacturer = product.manufacturer;
	}

	return (
		<div className="absolute left-0 top-0 w-full h-full px-12 py-4 flex justify-end pointer-events-none">
			<div
				id="cartPopup"
				className={`fixed ${product ? "" : "hidden"} ${
					visible ? "top-24" : "top-0"
				} border-x border-b shadow-xl w-96 bg-white transition-[top] duration-300 pointer-events-auto`}
			>
				<div className="relative flex flex-col gap-2 px-12 py-8">
					<svg
						onClick={() => closeItemAddedPopup()}
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
							<p className="text-sm line-clamp-2">{name}</p>
							<p className="text-xs text-neutral-500">{manufacturer}</p>
						</div>
					</div>
					<div className="flex flex-col items-center gap-2">
						<a href="/cart" className="w-full">
							<button className="w-full py-3 text-sm ring-1 ring-neutral-500 hover:ring-2 transition-all duration-200">
								{localLang.nav_prod_popup_view_my_cart}
							</button>
						</a>
						<a href="/checkout" className="w-full">
							<button className="w-full py-3 bg-black text-white text-sm ring-1 ring-black hover:bg-primary hover:ring-2 hover:ring-primary hover:text-white transition duration-200">
								{localLang.nav_prod_popup_checkout}
							</button>
						</a>
						<p onClick={() => closeItemAddedPopup()} className="cursor-pointer pt-2 hover:underline">
							{ localLang.nav_prod_popup_continue_shopping }
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}