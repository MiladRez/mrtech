import React from "react";
import FooterColumn from "./FooterColumn";

function Footer() {
	return (
		<footer className="bg-neutral-100">
			<div className="flex justify-center border">
				<div className="w-full max-w-screen-xl grid grid-cols-3 px-12">
					<div className="grid grid-cols-3 col-span-2 gap-8 py-12">
						<FooterColumn header="Customer Support" items={["Contact Us", "Help Centre", "Returns and Exchanges", "Gift Cards"]} />
						<FooterColumn header="Account" items={["Order Status", "Manage Account", "Preference Centre", "Personal Information Request"]} />
						<FooterColumn header="Services" items={["Membership", "Monthly Subscription", "Financing", "Trade-In Program"]} />
						<FooterColumn header="About Us" items={["Careers", "Corporate Information", "Our Commitment to the Environment", "MRtech US"]} />
						<FooterColumn header="Partner With Us" items={["Advertise with MRtech", "Become a MRtech affiliate", "Sell on MRtech Marketplace"]} />
						<FooterColumn header="Mobile Apps" items={["Android App", "iOS App"]} />			
					</div>
					<div className="flex flex-col gap-4 col-span-1 border-l px-8 py-12">
						<h3 className="text-sm font-bold">Be the first to know</h3>
						<p className="text-xs">Sign up to stay in the loop about the hottest deals, coolest new products, and exclusive sales events.</p>
						<div className="flex">
							<div className="w-full focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
								<input className="w-full px-2 py-3 border-2 border-transparent text-sm focus:outline-none focus:border-blue-800 transition-[border-color] duration-[400ms]" placeholder="Email Address" />
							</div>
							<button className="w-32 border border-primary px-4 py-3 text-white text-sm bg-primary font-bold hover:bg-blue-800 hover:border-blue-800 transition duration-300">Sign Up</button>
						</div>
						<div className="flex justify-between pt-4">
							<svg stroke="currentColor" strokeWidth={0.5} className="w-6 h-6 hover:fill-primary hover:text-primary cursor-pointer" >
								<use href="src/icons_sprite.svg#facebook" />
							</svg>
							<svg stroke="currentColor" strokeWidth={0.1} className="w-6 h-6 hover:fill-primary hover:text-primary cursor-pointer" >
								<use href="src/icons_sprite.svg#instagram" />
							</svg>
							<svg stroke="currentColor" strokeWidth={0.5} className="w-6 h-6 hover:fill-primary hover:text-primary cursor-pointer" >
								<use href="src/icons_sprite.svg#linkedin" />
							</svg>
							<svg stroke="currentColor" strokeWidth={0.5} className="w-6 h-6 hover:fill-primary hover:text-primary cursor-pointer" >
								<use href="src/icons_sprite.svg#pinterest" />
							</svg>
							<svg stroke="currentColor" strokeWidth={0.5} className="w-4 h-4 mt-1 hover:fill-primary hover:text-primary cursor-pointer" >
								<use href="src/icons_sprite.svg#twitterx" />
							</svg>
							<svg stroke="currentColor" strokeWidth={0.5} className="w-6 h-6 hover:fill-primary hover:text-primary cursor-pointer" >
								<use href="src/icons_sprite.svg#youtube" />
							</svg>
						</div>
					</div>
				</div>				
			</div>
			<div className="flex justify-center">
				<div className="w-full max-w-screen-xl px-12">
					<p className="text-xs text-neutral-500 py-12">All rights reserved © 2023 | MRtech</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer;