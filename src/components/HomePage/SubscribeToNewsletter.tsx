import React from "react";

export default function SubscribeToNewsletter() {
	const customerServices = (icon: string, title: string, desc: string) => {
		return (
			<div className="flex items-center">
				<svg className="w-8 h-8 mx-4 mt-2 fill-primary">
					<use href={`src/icons_sprite.svg#${icon}`} />
				</svg>
				<div className="flex flex-col gap-2">
					<h3 className="uppercase font-bold">{title}</h3>
					<p className="text-sm text-neutral-500">{desc}</p>
				</div>
			</div>
		)
	}

	return (
		<section>
			<div className="flex justify-center py-16">
				<div className="flex flex-col items-center w-full max-w-screen-xl px-12">
					<div className="flex flex-col items-center gap-6">
						<h2 className="text-4xl">Subscribe to our Newsletter</h2>
						<p className="text-neutral-500 pt-2">Subscribe now and get 10% off your first purchase</p>
						<div className="relative flex justify-center w-3/4 group ring-1 ring-neutral-500 hover:ring-2 transition duration-200">
							<input id="newsletterEmail" className="w-full px-4 pt-2 outline-none peer" />
							<label htmlFor="newsletterEmail" className="absolute top-3 left-4 text-neutral-400 pointer-events-none peer-focus:text-[10px] peer-focus:top-1 transition-all duration-200">Email</label>
							<button className="px-2 py-3">
								<svg stroke="currentColor" className="w-6 h-6 hover:scale-125 transition duration-200">
									<use href="src/icons_sprite.svg#right-arrow" />
								</svg>
							</button>	
						</div>
					</div>
					<div className="flex pt-24 gap-12">
						{customerServices("free-delivery", "Free Delivery", "For all orders over $70")}
						{customerServices("money-back2", "30 Days Return", "Money-back guarantee")}
						{customerServices("secure-payment", "Secure Payment", "Top-class security")}
						{customerServices("customer-service", "24/7 Support", "Operators ready on-call")}
					</div>
				</div>	
			</div>
		</section>
	)
}