import React, {useState} from "react";
import Checkbox from "./Checkbox";
import {ProductItem} from "../../../data/products";

type AvailabilityFilterProps = {
	products: ProductItem[],
	filteredProductsByStock: ProductItem[],
	setFilteredProductsByStock: Function,
	localLang: any,
	filteredProductsByPrice: ProductItem[],
	filteredProductsByInputtedPriceRange: ProductItem[],
	noMatchToInputtedPriceRange: boolean
}

export default function AvailabilityFilter({ products, filteredProductsByStock, setFilteredProductsByStock, localLang, filteredProductsByPrice, filteredProductsByInputtedPriceRange, noMatchToInputtedPriceRange }: AvailabilityFilterProps) {
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

	const numOfProductsByFilter = (filter: ProductItem[]) => {
		// if at least one price filter has been checked
		if (filteredProductsByPrice.length > 0) {
			return [
				...filteredProductsByPrice,
				...filteredProductsByInputtedPriceRange.filter(prod => !filteredProductsByPrice.includes(prod))
			].filter(prod => filter.includes(prod)).length;
		}
		// if user inputted price range matches at least one result
		if (filteredProductsByInputtedPriceRange.length > 0) {
			return filteredProductsByInputtedPriceRange.filter(prod => filter.includes(prod)).length;
		}
		// if user inputted price range does not match a result
		if (noMatchToInputtedPriceRange) {
			return 0;
		}
		// if no price filters (including user inputted price range) has been checked
		return products.filter(prod => filter.includes(prod)).length;
	}

	return (
		<ul className="flex flex-col gap-4 px-1">
			<Checkbox
				id="in-stock"
				name={`${localLang.filter_1_checkbox_1} (${numOfProductsByFilter(inStock)})`}
				disabled={numOfProductsByFilter(inStock) === 0 && noMatchToInputtedPriceRange}
				toggleFilter={() => filterByStock(inStock, setInStockChecked, inStockChecked)}
				checked={inStockChecked}
			/>
			<Checkbox
				id="out-of-stock"
				name={`${localLang.filter_1_checkbox_2} (${numOfProductsByFilter(outOfStock)})`}
				disabled={numOfProductsByFilter(outOfStock) === 0 && noMatchToInputtedPriceRange}
				toggleFilter={() => filterByStock(outOfStock, setOutOfStockChecked, outOfStockChecked)}
				checked={outOfStockChecked}
			/>
		</ul>
	)
}