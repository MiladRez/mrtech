import React from "react";

export default function PaymentSection({ localLang }: { localLang: any }) {
	return (
		<section className="flex flex-col gap-2">
			<h2 className="text-2xl font-bold">{localLang.checkout_payment_header}</h2>
			<p className="text-sm text-neutral-500 pb-2">{localLang.checkout_payment_subheader}</p>
			<div className="relative flex flex-col items-center rounded bg-stone-100 py-6">
				<svg fill="#a3a3a3" className="w-14 h-14 mt-4 mb-2">
					<use href="src/icons_sprite.svg#cash" />
				</svg>
				<svg fill="#f5f5f4" stroke="#a3a3a3" strokeWidth={1.5} className="absolute top-8 ml-14 w-8 h-8">
					<use href="src/icons_sprite.svg#warning" />
				</svg>
				<p className="text-sm text-neutral-500">{localLang.checkout_payment_store_closed}</p>
			</div>
			<button className="border bg-stone-100 text-neutral-500 font-semibold px-4 py-4 mt-4 rounded cursor-not-allowed">
				{localLang.checkout_pay_now_button}
			</button>
		</section>
	)
}