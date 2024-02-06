import React from "react";
import PromoDisplayCard from "./PromoDisplayCard";
import { item1, item2 } from "../../data/promo_display_items";

export default function PromoDisplay({ localLang }: { localLang: { text: any, lang: "english" | "french" } }) {
	return (
		<section className="flex justify-center">
			<div className="w-full max-w-screen-xl px-12 py-10">
				<div className="flex gap-2">
					<PromoDisplayCard item={item1} localLang={localLang} />
					<PromoDisplayCard item={item2} localLang={localLang} />
				</div>				
			</div>
		</section>
	)
}