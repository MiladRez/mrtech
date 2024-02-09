import React from "react";

type FooterColumnProps = {
	header: string,
	items: string[]
}

export default function FooterColumn({header, items}: FooterColumnProps) {
	return (
		<div className="flex flex-col gap-4">
			<h3 className="text-sm text-start font-bold">{header}</h3>
			{items.map((item, id) => (
				<p className="text-xs w-fit cursor-pointer hover:text-primary" key={id}>{item}</p>
			))}
		</div>
	)
}