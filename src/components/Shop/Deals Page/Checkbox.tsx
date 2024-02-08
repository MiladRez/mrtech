import React from "react";

type CheckboxProps = {
	id: string;
	name: string;
	disabled: boolean;
	toggleFilter: Function;
	checked: boolean;
};

export default function Checkbox({id, name, disabled, toggleFilter, checked}: CheckboxProps) {
	
	const handleCheckbox = () => {
		toggleFilter();
	};

	return (
		<li className="flex gap-2">
			<input
				id={id}
				type="checkbox"
				checked={checked}
				disabled={disabled}
				onChange={handleCheckbox}
				className="disabled:cursor-not-allowed peer focus:ring-0"
			/>
			<label
				htmlFor={id}
				className="w-full text-sm cursor-pointer select-none hover:underline peer-disabled:no-underline peer-disabled:cursor-not-allowed peer-disabled:text-black/50"
			>
				{name}
			</label>
		</li>
	)
}