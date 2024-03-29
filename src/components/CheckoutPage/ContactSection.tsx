import React from "react";

export default function ContactSection({ localLang }: { localLang: any }) {
	return (
		<section className="w-full flex flex-col gap-3">
			<h2 className="text-2xl font-bold">{localLang.checkout_contact_header}</h2>
			<div className="relative w-full focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
				<input
					type="text"
					placeholder={localLang.checkout_contact_input}
					className="w-full rounded border-neutral-300 text-sm py-4 shadow-sm focus:ring-0 peer"
				/>
				<div className="absolute top-0 w-full h-full pointer-events-none rounded border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
			</div>
			<div className="flex gap-2">
				<input
					id="contact"
					type="checkbox"
					className="rounded border-neutral-300 mb-1 focus:ring-0 focus:outline-none"
				/>
				<label htmlFor="contact" className="text-sm select-none">
					{localLang.checkout_contact_checkbox}
				</label>
			</div>
		</section>
	)
}