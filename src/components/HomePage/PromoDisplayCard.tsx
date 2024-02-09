import React from "react";
import { PromoDisplayItem } from "../../data/promo_display_items";

export default function PromoDisplayCard({ item, localLang }: { item: PromoDisplayItem, localLang: { text: any, lang: "english" | "french" } }) {

	return (
		<div className="bg-neutral-100">
			<img src={item.img.toString()} className="w-[36.5rem]" />
			<div className="px-4 py-4 sm:px-8 sm:py-8 flex flex-col gap-4">
				<p className="">{item.header[localLang.lang]}</p>
				<div className="flex items-center group cursor-pointer w-fit">
					<a href="/shop" className="text-sm md:text-base uppercase pr-2 font-light group-hover:text-primary">{ localLang.text.promo_display_shop_button }</a>
					<svg stroke="currentColor" className="w-6 h-6 group-hover:translate-x-1 group-hover:fill-current group-hover:text-primary transition-transform duration-300">
						<use href="src/icons_sprite.svg#right-arrow" />
					</svg>					
				</div>
			</div>
		</div>
	)
}