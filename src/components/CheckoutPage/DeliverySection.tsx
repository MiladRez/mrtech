import React from "react";

export default function DeliverySection() {
	return (
		<section className="flex flex-col gap-3">
			<h2 className="text-2xl font-bold">Delivery</h2>
			<div className="flex flex-col gap-3">
				<div className="relative w-full rounded border border-neutral-300 py-2">
					<select id="country" className="w-full border-none pt-4 pb-0 text-sm focus:ring-0">
						<option>Canada</option>
					</select>
					<label
						htmlFor="country"
						className="absolute top-2 left-3 text-neutral-500 text-[11px] pointer-events-none"
					>
						Country/Region
					</label>
				</div>
				<div className="w-full flex gap-4">
					<div className="relative w-full rounded ring-1 ring-neutral-300 py-2 focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
						<input
							id="firstName"
							type="text"
							className="w-full border-none pt-4 pb-0 text-sm focus:ring-0 peer"
						/>
						<div className="absolute top-0 w-full h-full pointer-events-none rounded border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
						<label htmlFor="firstName" className="absolute top-2 left-3 text-neutral-500 text-[11px] pointer-events-none">
							First name
						</label>
					</div>
					<div className="relative w-full rounded ring-1 ring-neutral-300 py-2 focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
						<input
							id="lastName"
							type="text"
							className="w-full border-none pt-4 pb-0 text-sm focus:ring-0 peer"
						/>
						<div className="absolute top-0 w-full h-full pointer-events-none rounded border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
						<label htmlFor="lastName" className="absolute top-2 left-3 text-neutral-500 text-[11px] pointer-events-none">
							Last name
						</label>
					</div>
				</div>
				<div className="flex flex-col gap-1.5">
					<div className="relative rounded ring-1 ring-neutral-300 py-2 focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
						<input
							id="address"
							type="text"
							className="w-full border-none pt-4 pb-0 text-sm focus:ring-0 peer"
						/>
						<div className="absolute top-0 w-full h-full pointer-events-none rounded border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
						<label
							htmlFor="address"
							className="absolute top-2 left-3 text-neutral-500 text-[10px] pointer-events-none"
						>
							Address
						</label>
					</div>
					<div className="flex items-center gap-1">
						<svg fill="none" className="w-[1.1rem] h-[1.1rem]">
							<use href="src/icons_sprite.svg#info" />
						</svg>
						<p className="text-sm">Add a house number if you have one</p>
					</div>
				</div>
				<div className="w-full flex gap-4">
					<div className="relative w-full rounded ring-1 ring-neutral-300 py-2 focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
						<input
							id="city"
							type="text"
							className="w-full border-none pt-4 pb-0 text-sm focus:ring-0 peer"
						/>
						<div className="absolute top-0 w-full h-full pointer-events-none rounded border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
						<label
							htmlFor="city"
							className="absolute top-2 left-3 text-neutral-500 text-[11px] pointer-events-none"
						>
							City
						</label>
					</div>
					<div className="relative w-full rounded border border-neutral-300 py-2">
						<select id="province" className="w-full border-none pt-4 pb-0 text-sm focus:ring-0">
							<option>Ontario</option>
						</select>
						<label
							htmlFor="province"
							className="absolute top-2 left-3 text-neutral-500 text-[11px] pointer-events-none"
						>
							Province/Territory
						</label>
					</div>
					<div className="relative w-full rounded ring-1 ring-neutral-300 py-2 focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
						<input
							id="postalCode"
							type="text"
							className="w-full border-none pt-4 pb-0 text-sm focus:ring-0 peer"
						/>
						<div className="absolute top-0 w-full h-full pointer-events-none rounded border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
						<label
							htmlFor="postalCode"
							className="absolute top-2 left-3 text-neutral-500 text-[11px] pointer-events-none"
						>
							Postal code
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
						Save this information for next time
					</label>
				</div>
			</div>
			<div className="w-full flex flex-col gap-3 pt-4">
				<h3 className="text-lg font-semibold">Shipping method</h3>
				<div className="border rounded px-6 py-4 hover:bg-black/10 transition duration-200 cursor-pointer">
					<div className="flex justify-between">
						<p className="">Economy</p>
						<p className="text-sm font-semibold">Free</p>
					</div>
					<p className="text-sm text-neutral-500 pt-1">3 to 5 business days</p>
				</div>
				<div className="border rounded px-6 py-4 hover:bg-black/10 transition duration-200 cursor-pointer">
					<div className="flex justify-between">
						<p className="">Express</p>
						<p className="text-sm font-semibold">$4.99</p>
					</div>
					<p className="text-sm text-neutral-500 pt-1">1 to 2 business days</p>
				</div>
			</div>
		</section>
	)
}