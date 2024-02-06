import React from "react";

export default function Page404({localLang, localCurrency}: { localLang: {text: any, lang: string}, localCurrency: string }) {
	return (
		<section className="w-screen h-screen flex flex-col justify-center items-center gap-4">
			<h1 className="text-4xl">404</h1>
			<p>Page Not Found</p>
		</section>
	)
}