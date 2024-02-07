import React from "react";

export default function Page404({localLang}: { localLang: any }) {
	return (
		<section className="w-screen h-screen flex flex-col justify-center items-center gap-4">
			<h1 className="text-4xl">404</h1>
			<p>{ localLang.page_404 }</p>
		</section>
	)
}