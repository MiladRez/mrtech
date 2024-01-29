import React from "react";
import { PromoDisplayItem } from "../../data/promo_display_items";

export default function PromoDisplayCard({ item }: { item: PromoDisplayItem }) {
	return (
		<div className="bg-neutral-100">
			<img src={item.img.toString()} className="w-[36.5rem]" />
			<div className="px-8 py-8 flex flex-col gap-4">
				<p className="">{item.header}</p>
				<div className="flex items-center group cursor-pointer w-fit">
					<a className="uppercase pr-2 font-light group-hover:text-primary">Shop now</a>
					<svg stroke="currentColor" className="w-6 h-6 group-hover:translate-x-1 group-hover:fill-current group-hover:text-primary transition-transform duration-300">
						<use href="src/icons_sprite.svg#right-arrow" />
					</svg>					
				</div>
			</div>
		</div>
	)
}