import React from "react";
import PromoDisplayCard from "../PromoDisplayCard";
import { item1, item2 } from "../../data/promo_display_items";

export default function PromoDisplay() {
	return (
		<section className="flex justify-center">
			<div className="w-full max-w-screen-xl px-12 py-10">
				<div className="flex gap-2">
					<PromoDisplayCard item={item1} />
					<PromoDisplayCard item={item2} />
				</div>				
			</div>
		</section>
	)
}