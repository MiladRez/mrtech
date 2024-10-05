import React from "react";
import iconsSprite from "../../icons_sprite.svg";

export default function SubscribeToNewsletter({ localLang }: { localLang: any }) {
	const customerServices = (icon: string, title: string, desc: string) => {
		return (
			<div className="flex items-center">
				<svg className="w-12 h-12 sm:w-8 sm:h-8 mr-4 sm:mx-4 mt-2 fill-primary">
					<use href={`${iconsSprite}#${icon}`} />
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
						<h2 className="text-3xl md:text-4xl text-center">{ localLang.newsletter_header }</h2>
						<p className="text-neutral-500 text-center pt-2">{ localLang.newsletter_subheader }</p>
						<div className="relative flex justify-center w-full sm:w-3/4 group ring-1 ring-neutral-500 hover:ring-2 transition duration-200">
							<input id="newsletterEmail" className="w-full px-4 pt-2 outline-none peer" />
							<label htmlFor="newsletterEmail" className="absolute top-3 left-4 text-neutral-400 pointer-events-none peer-focus:text-[10px] peer-focus:top-1 transition-all duration-200">{ localLang.newsletter_email }</label>
							<button className="px-2 py-3">
								<svg stroke="currentColor" className="w-6 h-6 hover:scale-125 transition duration-200">
									<use href={`${iconsSprite}#right-arrow`} />
								</svg>
							</button>	
						</div>
					</div>
					<div className="w-full grid sm:grid-cols-2 lg:grid-cols-4 justify-center sm:justify-between pt-20 sm:pt-24 gap-10">
						{customerServices("free-delivery", localLang.newsletter_customer_service_1_header, localLang.newsletter_customer_service_1_subheader)}
						{customerServices("money-back2", localLang.newsletter_customer_service_2_header, localLang.newsletter_customer_service_2_subheader)}
						{customerServices("secure-payment", localLang.newsletter_customer_service_3_header, localLang.newsletter_customer_service_3_subheader)}
						{customerServices("customer-service", localLang.newsletter_customer_service_4_header, localLang.newsletter_customer_service_4_subheader)}
					</div>
				</div>	
			</div>
		</section>
	)
}