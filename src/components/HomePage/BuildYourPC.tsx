import React from "react";
import PCSetup from "../../images/build-your-next-pc.png";

export default function BuildYourPC() {
	return (
		<section className="flex justify-center">
			<div className="flex max-w-screen-xl px-12 pb-10 gap-16">
				<img src={PCSetup} className="w-2/3" />
				<div className="flex flex-col gap-8 pt-16">
					<h2 className="text-4xl leading-normal">Build Your Own<br></br>PC Setup</h2>
					<button className="w-1/2 border px-4 py-3 border-neutral-400 text-neutral-500 hover:bg-black hover:text-white transition duration-200">Build</button>
				</div>
			</div>	
		</section>
	)
}