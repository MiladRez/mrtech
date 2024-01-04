import React from "react";
import { PromoDisplayItem } from "../data/promo_display_items";

function PromoDisplayCard({ item }: { item: PromoDisplayItem }) {
	return (
		<div className="bg-neutral-100">
			<img src={item.img.toString()} className="w-[36.5rem]" />
			<div className="px-8 py-8 flex flex-col gap-4">
				<p className="">{item.header}</p>
				<div className="flex items-center group cursor-pointer w-fit">
					<a className="uppercase pr-2 font-light group-hover:text-primary">Shop now</a>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:w-6 transition-all duration-300">
						<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
					</svg>					
				</div>
			</div>
		</div>
	)
}

export default PromoDisplayCard;