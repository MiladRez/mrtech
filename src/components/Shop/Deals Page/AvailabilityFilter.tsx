import React, {useState} from "react";
import Checkbox from "./Checkbox";
import {ProductItem} from "../../../data/products";

type AvailabilityFilterProps = {
	products: ProductItem[],
	filteredProductsByStock: ProductItem[],
	setFilteredProductsByStock: Function,
	localLang: any
}

export default function AvailabilityFilter({ products, filteredProductsByStock, setFilteredProductsByStock, localLang }: AvailabilityFilterProps) {
	const [inStockChecked, setInStockChecked] = useState(false);
	const [outOfStockChecked, setOutOfStockChecked] = useState(false);

	const inStock = products.filter(prod => prod.stock > 0);
	const outOfStock = products.filter(prod => prod.stock === 0);

	const filterByStock = (stock: ProductItem[], setChecked: Function, isChecked: boolean) => {
		if (isChecked) {
			setChecked(false);
			// return list of filtered products that are not in "stock" array
			setFilteredProductsByStock(filteredProductsByStock.filter(prod => !stock.includes(prod)));
		} else {
			setChecked(true);
			// return new list with previous value of filtered products and "stock" array
			setFilteredProductsByStock([...filteredProductsByStock, ...stock]);
		}
	};

	return (
		<ul className="flex flex-col gap-4 px-1">
			<Checkbox
				id="in-stock"
				name={`${localLang.filter_1_checkbox_1} (${inStock.length})`}
				disabled={inStock.length === 0}
				toggleFilter={() => filterByStock(inStock, setInStockChecked, inStockChecked)}
				checked={inStockChecked}
			/>
			<Checkbox
				id="out-of-stock"
				name={`${localLang.filter_1_checkbox_2} (${outOfStock.length})`}
				disabled={outOfStock.length === 0}
				toggleFilter={() => filterByStock(outOfStock, setOutOfStockChecked, outOfStockChecked)}
				checked={outOfStockChecked}
			/>
		</ul>
	)
}