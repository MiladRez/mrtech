import React from "react";

export default function ProductListHeader({ title, desc }: { title: string, desc: string }) {
	
	return (
		<section className="flex justify-center pt-10 sm:pt-20">
			<div className="w-full max-w-screen-xl px-12 flex flex-col gap-12">
				<div className="flex flex-col gap-6 pb-12">
					<h1 className="text-4xl">{title}</h1>
					<p>{desc}</p>		
				</div>
			</div>
		</section>
	)
}