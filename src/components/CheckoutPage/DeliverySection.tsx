import React, {useState} from "react";
import {provincesAndStates} from "../../data/locality";

type DeliverySectionProps = {
	handleDeliverySelection: Function;
	locale: {
		localLang: {
			text: any;
			lang: "english" | "french";
		};
		localCurrency: "cad" | "usd";
	};
};

export default function DeliverySection({handleDeliverySelection, locale}: DeliverySectionProps) {
	const [shippingMethod, setShippingMethod] = useState<string>();

	const localLang = locale.localLang.text;

	const handleShippingMethodSelection = (fee: string) => {
		setShippingMethod(fee);
		if (fee === "Free") {
			handleDeliverySelection(0);
		} else {
			handleDeliverySelection(4.99);
		}
	};

	return (
		<section className="flex flex-col gap-3">
			<h2 className="text-2xl font-bold">{localLang.checkout_delivery_header}</h2>
			<div className="flex flex-col gap-3">
				<div className="relative w-full rounded ring-1 ring-neutral-300 py-2 shadow">
					<select id="country" defaultValue={"default"} className="w-full border-none pt-4 pb-0 text-sm focus:ring-0">
						<option value={locale.localCurrency === "cad" ? "default" : ""}>Canada</option>
						<option value={locale.localCurrency === "usd" ? "default" : ""}>{locale.localLang.lang === "english" ? "United States" : "États-Unis"}</option>
					</select>
					<label htmlFor="country" className="absolute top-2 left-3 text-neutral-500 text-[11px] pointer-events-none">
						{localLang.checkout_delivery_country}
					</label>
				</div>
				<div className="w-full flex gap-4">
					<div className="relative w-full rounded ring-1 ring-neutral-300 py-2 shadow focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
						<input id="firstName" type="text" className="w-full border-none pt-4 pb-0 text-sm focus:ring-0 peer" />
						<div className="absolute top-0 w-full h-full pointer-events-none rounded border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
						<label
							htmlFor="firstName"
							className="absolute top-2 left-3 text-neutral-500 text-[11px] pointer-events-none"
						>
							{localLang.checkout_delivery_firstname}
						</label>
					</div>
					<div className="relative w-full rounded ring-1 ring-neutral-300 py-2 shadow focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
						<input id="lastName" type="text" className="w-full border-none pt-4 pb-0 text-sm focus:ring-0 peer" />
						<div className="absolute top-0 w-full h-full pointer-events-none rounded border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
						<label
							htmlFor="lastName"
							className="absolute top-2 left-3 text-neutral-500 text-[11px] pointer-events-none"
						>
							{localLang.checkout_delivery_lastname}
						</label>
					</div>
				</div>
				<div className="flex flex-col gap-1.5">
					<div className="relative rounded ring-1 ring-neutral-300 py-2 shadow focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
						<input id="address" type="text" className="w-full border-none pt-4 pb-0 text-sm focus:ring-0 peer" />
						<div className="absolute top-0 w-full h-full pointer-events-none rounded border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
						<label
							htmlFor="address"
							className="absolute top-2 left-3 text-neutral-500 text-[10px] pointer-events-none"
						>
							{localLang.checkout_delivery_address}
						</label>
					</div>
					<div className="flex items-center gap-1">
						<svg fill="none" className="w-[1.1rem] h-[1.1rem]">
							<use href="src/icons_sprite.svg#info" />
						</svg>
						<p className="text-xs sm:text-sm">{localLang.checkout_delivery_address_note}</p>
					</div>
				</div>
				<div className="w-full flex gap-4 pt-2">
					<div className="relative w-full rounded ring-1 ring-neutral-300 py-2 shadow focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
						<input id="city" type="text" className="w-full border-none pt-4 pb-0 text-sm focus:ring-0 peer" />
						<div className="absolute top-0 w-full h-full pointer-events-none rounded border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
						<label htmlFor="city" className="absolute top-2 left-3 text-neutral-500 text-[11px] pointer-events-none">
							{localLang.checkout_delivery_city}
						</label>
					</div>
					<div className="relative w-full rounded ring-1 ring-neutral-300 py-2 shadow overflow-hidden">
						<select id="province" className="w-full border-none pt-4 pb-0 text-sm focus:ring-0">
							{provincesAndStates[locale.localCurrency].map((provState, index) => (
								<option key={index}>
									{provState}
								</option>
							))}
						</select>
						<label
							htmlFor="province"
							className="absolute top-2 left-3 text-neutral-500 text-[11px] pointer-events-none"
						>
							{locale.localCurrency === "cad" ? localLang.checkout_delivery_province : "State"}
						</label>
					</div>
					<div className="relative w-full rounded ring-1 ring-neutral-300 py-2 shadow focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
						<input id="postalCode" type="text" className="w-full border-none pt-4 pb-0 text-sm focus:ring-0 peer" />
						<div className="absolute top-0 w-full h-full pointer-events-none rounded border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
						<label
							htmlFor="postalCode"
							className="absolute top-2 left-3 text-neutral-500 text-[11px] pointer-events-none"
						>
							{locale.localCurrency === "cad" ? localLang.checkout_delivery_postalcode : "ZIP code"}
						</label>
					</div>
				</div>
				<div className="flex gap-2 pt-2">
					<input
						id="saveInfo"
						type="checkbox"
						className="rounded border-neutral-300 mb-1 focus:ring-0 focus:outline-none"
					/>
					<label htmlFor="saveInfo" className="text-sm select-none">
						{localLang.checkout_delivery_save_info}
					</label>
				</div>
			</div>
			<div className="w-full flex flex-col gap-3 pt-4">
				<h3 className="text-lg font-semibold">{localLang.checkout_shipping_header}</h3>
				<div
					onClick={() => handleShippingMethodSelection("Free")}
					className={`${
						shippingMethod === "Free" ? "bg-black/10" : ""
					} border rounded px-6 py-4 shadow hover:bg-black/10 transition duration-200 cursor-pointer`}
				>
					<div className="flex justify-between">
						<p className="text-sm sm:text-base">{localLang.checkout_shipping_method_1_name}</p>
						<p className="text-sm font-semibold">{localLang.checkout_shipping_method_1_fee}</p>
					</div>
					<p className="text-xs sm:text-sm text-neutral-500 pt-1">{localLang.checkout_shipping_method_1_eta}</p>
				</div>
				<div
					onClick={() => handleShippingMethodSelection("$4.99")}
					className={`${
						shippingMethod === "$4.99" ? "bg-black/10" : ""
					} border rounded px-6 py-4 shadow hover:bg-black/10 transition duration-200 cursor-pointer`}
				>
					<div className="flex justify-between">
						<p className="text-sm sm:text-base">{localLang.checkout_shipping_method_2_name}</p>
						<p className="text-sm font-semibold">{localLang.checkout_shipping_method_2_fee}</p>
					</div>
					<p className="text-xs sm:text-sm text-neutral-500 pt-1">{localLang.checkout_shipping_method_2_eta}</p>
				</div>
			</div>
		</section>
	);
}
