import React from "react";
import PCSetup from "../../images/build-your-next-pc.png";

export default function BuildYourPC({ localLang }: { localLang: any }) {
	return (
		<section className="flex justify-center">
			<div className="flex flex-col lg:flex-row items-center lg:items-start max-w-screen-xl px-12 pb-10 gap-8 lg:gap-16">
				<img src={PCSetup} className="lg:w-2/3" />
				<div className="flex flex-col items-center lg:items-start gap-8 lg:pt-16">
					<h2 className="text-4xl leading-normal text-center lg:text-start">{localLang.build_your_own_pc_header_p1}<br></br>{ localLang.build_your_own_pc_header_p2 }</h2>
					<button className="w-1/2 border px-4 py-3 border-neutral-400 text-neutral-500 hover:bg-black hover:text-white transition duration-200">{ localLang.build_your_own_pc_button }</button>
				</div>
			</div>	
		</section>
	)
}