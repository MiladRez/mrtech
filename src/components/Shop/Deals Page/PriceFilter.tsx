import React, {useEffect, useState} from "react";
import {ProductItem} from "../../../data/products";
import Checkbox from "./Checkbox";

type PriceFilterProps = {
	products: ProductItem[],
	filteredProductsByPrice: ProductItem[],
	setFilteredProductsByPrice: Function,
	localLang: any,
	localCurrency: "cad" | "usd",
	setNoMatchToInputtedPriceRange: Function,
	setFilteredProductsByInputtedPriceRange: Function,
	filteredProductsByStock: ProductItem[],
	setFilterPopup?: Function
}

export default function PriceFilter({ products, filteredProductsByPrice, setFilteredProductsByPrice, localLang, localCurrency, setNoMatchToInputtedPriceRange, setFilteredProductsByInputtedPriceRange, filteredProductsByStock, setFilterPopup }: PriceFilterProps) {
	const [disabledApplyPriceRangeButton, setDisabledApplyPriceRangeButton] = useState(true);
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(10000);
	let minPriceInput = document.getElementById("min-price") as HTMLInputElement;
	let maxPriceInput = document.getElementById("max-price") as HTMLInputElement;

	const [isPR_lessThan200_Checked, setIsPR_lessThan200_Checked] = useState(false);
	const [isPR_200to300_Checked, setIsPR_200to300_Checked] = useState(false);
	const [isPR_300to400_Checked, setIsPR_300to400_Checked] = useState(false);
	const [isPR_400to600_Checked, setIsPR_400to600_Checked] = useState(false);
	const [isPR_600to800_Checked, setIsPR_600to800_Checked] = useState(false);
	const [isPR_800to1000_Checked, setIsPR_800to1000_Checked] = useState(false);
	const [isPR_1000to1200_Checked, setIsPR_1000to1200_Checked] = useState(false);
	const [isPR_1200andUp_Checked, setIsPR_1200andUp_Checked] = useState(false);

	const handleMinPriceInput = (event: any) => {
		if (event.target.value === "") {
			if (maxPriceInput.value === "") {
				handleClearPriceRangeButton();
				setDisabledApplyPriceRangeButton(true);
			}
		} else {
			setDisabledApplyPriceRangeButton(false);
		}

		if (parseInt(event.target.value) < 0) {
			setMinPrice(0);
		} else {
			setMinPrice(event.target.value);
		}
	};

	const handleMaxPriceInput = (event: any) => {
		if (event.target.value === "") {
			if (minPriceInput.value === "") {
				handleClearPriceRangeButton();
				setDisabledApplyPriceRangeButton(true);
			}
		} else {
			setDisabledApplyPriceRangeButton(false);
		}

		if (parseInt(event.target.value) < 0) {
			setMaxPrice(0);
		} else {
			setMaxPrice(event.target.value);
		}
	};

	const priceRangeFilter = (from: number, to?: number) => {
		if (to) {
			return products.filter(prod => {
				return prod.salePrice
					? prod.salePrice[localCurrency] >= from && prod.salePrice[localCurrency] < to
					: prod.price[localCurrency] >= from && prod.price[localCurrency] < to;
			});
		} else {
			return products.filter(prod => {
				return prod.salePrice ? prod.salePrice[localCurrency] >= from : prod.price[localCurrency] >= from;
			});
		}
	};

	const numOfProductsByFilter = (filter: ProductItem[]) => {
		return filteredProductsByStock.length > 0
			? (filteredProductsByStock.filter(prod => filter.includes(prod))).length
			: (products.filter(prod => filter.includes(prod))).length;
	}

	const priceRanges = [
		{
			id: "pr-lt200",
			name: `${localLang.filter_2_checkbox_pr1} (${numOfProductsByFilter(priceRangeFilter(0, 200))})`,
			disabled: numOfProductsByFilter(priceRangeFilter(0, 200)) === 0,
			filterFunc: () =>
				filterByPrice(priceRangeFilter(0, 200), setIsPR_lessThan200_Checked, isPR_lessThan200_Checked),
			isChecked: isPR_lessThan200_Checked
		},
		{
			id: "pr-200to300",
			name: `${localLang.filter_2_checkbox_pr2} (${numOfProductsByFilter(priceRangeFilter(200, 300))})`,
			disabled: numOfProductsByFilter(priceRangeFilter(200, 300)) === 0,
			filterFunc: () =>
				filterByPrice(priceRangeFilter(200, 300), setIsPR_200to300_Checked, isPR_200to300_Checked),
			isChecked: isPR_200to300_Checked
		},
		{
			id: "pr-300to400",
			name: `${localLang.filter_2_checkbox_pr3} (${numOfProductsByFilter(priceRangeFilter(300, 400))})`,
			disabled: numOfProductsByFilter(priceRangeFilter(300, 400)) === 0,
			filterFunc: () =>
				filterByPrice(priceRangeFilter(300, 400), setIsPR_300to400_Checked, isPR_300to400_Checked),
			isChecked: isPR_300to400_Checked
		},
		{
			id: "pr-400to600",
			name: `${localLang.filter_2_checkbox_pr4} (${numOfProductsByFilter(priceRangeFilter(400, 600))})`,
			disabled: numOfProductsByFilter(priceRangeFilter(400, 600)) === 0,
			filterFunc: () =>
				filterByPrice(priceRangeFilter(400, 600), setIsPR_400to600_Checked, isPR_400to600_Checked),
			isChecked: isPR_400to600_Checked
		},
		{
			id: "pr-600to800",
			name: `${localLang.filter_2_checkbox_pr5} (${numOfProductsByFilter(priceRangeFilter(600, 800))})`,
			disabled: numOfProductsByFilter(priceRangeFilter(600, 800)) === 0,
			filterFunc: () =>
				filterByPrice(priceRangeFilter(600, 800), setIsPR_600to800_Checked, isPR_600to800_Checked),
			isChecked: isPR_600to800_Checked
		},
		{
			id: "pr-800to1000",
			name: `${localLang.filter_2_checkbox_pr6} (${numOfProductsByFilter(priceRangeFilter(800, 1000))})`,
			disabled: numOfProductsByFilter(priceRangeFilter(800, 1000)) === 0,
			filterFunc: () =>
				filterByPrice(priceRangeFilter(800, 1000), setIsPR_800to1000_Checked, isPR_800to1000_Checked),
			isChecked: isPR_800to1000_Checked
		},
		{
			id: "pr-1000to1200",
			name: `${localLang.filter_2_checkbox_pr7} (${numOfProductsByFilter(priceRangeFilter(1000, 1200))})`,
			disabled: numOfProductsByFilter(priceRangeFilter(1000, 1200)) === 0,
			filterFunc: () =>
				filterByPrice(priceRangeFilter(1000, 1200), setIsPR_1000to1200_Checked, isPR_1000to1200_Checked),
			isChecked: isPR_1000to1200_Checked
		},
		{
			id: "pr-1200andUp",
			name: `${localLang.filter_2_checkbox_pr8} (${numOfProductsByFilter(priceRangeFilter(1200))})`,
			disabled: numOfProductsByFilter(priceRangeFilter(1200)) === 0,
			filterFunc: () =>
				filterByPrice(priceRangeFilter(1200), setIsPR_1200andUp_Checked, isPR_1200andUp_Checked),
			isChecked: isPR_1200andUp_Checked
		}
	];

	const filterByPrice = (prodsInPriceRange: ProductItem[], setChecked: Function, isChecked: boolean) => {
		if (isChecked) {
			setChecked(false);
			// return list of filtered products not in "prodsInPriceRange" array
			setFilteredProductsByPrice(
				filteredProductsByPrice.filter(prod => !prodsInPriceRange.includes(prod))
			);
		} else {
			setChecked(true);
			// return new list with previous value of filtered products and "prodsInPriceRange" array
			setFilteredProductsByPrice([
				...filteredProductsByPrice,
				...prodsInPriceRange.filter(prod => !filteredProductsByPrice.includes(prod))
			]);
		}
	};

	const handleApplyPriceRangeButton = () => {
		if (filteredProductsByPrice.length === 0 && priceRangeFilter(minPrice, maxPrice).length === 0) {
			setNoMatchToInputtedPriceRange(true);
		} else {
			setNoMatchToInputtedPriceRange(false);
		}
		setFilteredProductsByInputtedPriceRange(priceRangeFilter(minPrice, maxPrice));
		if (setFilterPopup) {
			setFilterPopup(false);
		}
	};

	const handleClearPriceRangeButton = () => {
		setNoMatchToInputtedPriceRange(false);
		setFilteredProductsByInputtedPriceRange([]);
		setMinPrice(0);
		setMaxPrice(10000);
		minPriceInput.value = "";
		maxPriceInput.value = "";
		setDisabledApplyPriceRangeButton(true);
	};

	return (
		<div className="">
			<div className="flex xl:justify-between items-center gap-2">
				<div className="flex flex-col gap-1 pl-1">
					<label htmlFor="min-price" className="text-sm text-neutral-500 select-none">
						Min
					</label>
					<div className="relative focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
						<input
							type="number"
							placeholder="$"
							onChange={handleMinPriceInput}
							id="min-price"
							className="w-28 px-2 py-2 border border-neutral-400 focus:outline-none peer"
						/>
						<div className="absolute top-0 w-full h-full pointer-events-none border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
					</div>
				</div>
				<p className="pt-6">-</p>
				<div className="flex flex-col gap-1 pr-1">
					<label htmlFor="max-price" className="text-sm text-neutral-500 select-none">
						Max
					</label>
					<div className="relative focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
						<input
							type="number"
							placeholder="$"
							onChange={handleMaxPriceInput}
							id="max-price"
							className="w-28 px-2 py-2 border border-neutral-400 focus:outline-none peer"
						/>
						<div className="absolute top-0 w-full h-full pointer-events-none border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
					</div>
				</div>
			</div>
			<div className="flex flex-col py-4 border-b px-1">
				<button
					onClick={handleApplyPriceRangeButton}
					disabled={disabledApplyPriceRangeButton}
					className="w-full border px-12 py-4 bg-primary text-sm text-white font-semibold hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-black transition duration-200"
				>
					{localLang.filter_2_apply_price_range}
				</button>
				<button
					onClick={handleClearPriceRangeButton}
					className={`${
						disabledApplyPriceRangeButton ? "hidden" : ""
					} text-sm text-primary pt-6 self-start hover:underline`}
				>
					{localLang.filter_2_clear_price_range}
				</button>
			</div>
			<ul className="flex flex-col gap-4 pt-6 px-1">
				{priceRanges.map((priceRange, index) => (
					<Checkbox
						key={index}
						id={priceRange.id}
						name={priceRange.name}
						disabled={priceRange.disabled}
						toggleFilter={priceRange.filterFunc}
						checked={priceRange.isChecked}
					/>
				))}
			</ul>
		</div>
	);
}