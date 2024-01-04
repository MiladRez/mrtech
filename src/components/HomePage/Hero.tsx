import React from "react";
import HeroBG from "../../images/hero_bg.jpeg";
import HeroComputerSetup from "../../images/hero_computer_setup.png";

function Hero() {
	return (
		<section className="flex justify-center h-screen mb-12">
			<img src={HeroBG} className="absolute -z-10 h-screen w-screen object-cover" />
			<div className="pt-28 h-full">
				<div className="flex max-w-screen-xl items-center h-full">
					<div className="text-white flex flex-col items-center gap-4">
						<p className="uppercase font-extralight">Discover the latest discounted tech products</p>
						<h1 className="text-6xl">Spring Sales Season</h1>
						<button className="uppercase font-light mt-4 w-fit border px-4 py-4 hover:bg-white hover:text-primary transition duration-300">Shop now</button>					
					</div>
					<img src={HeroComputerSetup} className="w-[38rem]" />
				</div>
			</div>
		</section>
	)
}

export default Hero;