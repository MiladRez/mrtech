import React from "react";
import HeroBG from "../../images/hero_bg.jpeg";
import HeroComputerSetup from "../../images/hero_computer_setup.png";

export default function Hero({ localLang }: { localLang: any }) {

	return (
		<section className="-mt-24 flex justify-center h-screen mb-10">
			<img src={HeroBG} className="absolute -z-10 h-screen w-screen object-cover" />
			<div className="pt-28 h-full">
				<div className="flex max-w-screen-xl items-center h-full px-12">
					<div className="text-white flex flex-col items-center gap-4">
						<p className="uppercase font-extralight text-center">{ localLang.hero_subheader }</p>
						<h1 className="text-6xl text-center">{localLang.hero_header}</h1>
						<a href="/shop">
							<button className="uppercase font-light mt-4 w-fit border px-4 py-4 hover:bg-white hover:text-primary transition duration-300">{ localLang.hero_shop_button }</button>						
						</a>
					</div>
					<img src={HeroComputerSetup} className="hidden big:flex big:w-1/2 lg:w-[38rem]" />
				</div>
			</div>
		</section>
	)
}