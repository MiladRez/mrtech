import React, { ReactElement, useState } from "react";

type FilterDropdownProps = {
	openFilter: boolean,
	title: string,
	content: ReactElement
}

function FilterDropdown({openFilter, title, content}: FilterDropdownProps) {

	const [filterOpen, setFilterOpen] = useState(openFilter)

	return (
		<div className="border-b py-3">
			<div onClick={() => setFilterOpen(!filterOpen)} className="flex justify-between items-center pr-4 group cursor-pointer select-none">
				<h3 className="font-medium group-hover:text-primary">{title}</h3>
				<svg stroke="currentColor" strokeWidth={1.6} className={`w-7 h-7 group-hover:text-primary ${filterOpen ? "rotate-180" : ""}`}>
					<use href="src/icons_sprite.svg#chevron-down" />
				</svg>
			</div>
			<div className={`${filterOpen ? "max-h-[50rem]" : "max-h-0"} overflow-hidden transition-[max-height] duration-200`}>
				<div className="py-4 pr-6">
					{content}
				</div>
			</div>
		</div>
	)
}

export default FilterDropdown;