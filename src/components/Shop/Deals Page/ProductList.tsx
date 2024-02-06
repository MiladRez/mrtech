import React, { useEffect, useState } from "react";
import { ProductItem } from "../../../data/products";
import Product from "../../Product";
import FilterDropdown from "./FilterDropdown";
import { useCart } from "../../CartContext";

const sortOrder: string[] = [
	"Recently Added",
	"Highest Rated",
	"Best Selling",
	"Name, A-Z",
	"Name, Z-A",
	"Price, Low-High",
	"Price, High-Low"
];

type ProductListProps = {
	products: ProductItem[],
	setProduct: Function,
	locale: {
		localLang: {
			text: any,
			lang: "english" | "french"
		},
		localCurrency: "cad" | "usd"
	}
}

export default function ProductList({ products, setProduct, locale }: ProductListProps) {
	const { addItemToCart } = useCart();

	const localLang = locale.localLang.text;

	const [productsDisplay, setProductsDisplay] = useState(products);
	const [filteredProductsByStock, setFilteredProductsByStock] = useState([] as ProductItem[]);
	const [filteredProductsByPrice, setFilteredProductsByPrice] = useState([] as ProductItem[]);
	const [selectedSortOrder, setSelectedSortOrder] = useState(localLang.sort_opt_1);

	const addToCart = (item: ProductItem) => {
		addItemToCart(item);
		setProduct(item);
	};

	const clearFilters = () => {
		window.location.reload();
	};

	const handleSortSelection = (event: any) => {
		setSelectedSortOrder(event.target.value);
	};

	const sortByProductProperty = (sortOrder: string, prods: ProductItem[]) => {
		switch (sortOrder) {
			case localLang.sort_opt_1:
				setProductsDisplay([...prods.sort((a, b) => (parseInt(a.id) < parseInt(b.id) ? 1 : -1))]);
				break;
			case localLang.sort_opt_2:
				setProductsDisplay([...prods.sort((a, b) => (a.rating < b.rating ? 1 : -1))]);
				break;
			case localLang.sort_opt_3:
				setProductsDisplay([...prods.sort((a, b) => (a.stock > b.stock ? 1 : -1))]);
				break;
			case localLang.sort_opt_4:
				setProductsDisplay([...prods.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))]);
				break;
			case localLang.sort_opt_5:
				setProductsDisplay([...prods.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1))]);
				break;
			case localLang.sort_opt_6:
				setProductsDisplay([
					...prods.sort((a, b) =>
						(a.salePrice ? a.salePrice : a.price) > (b.salePrice ? b.salePrice : b.price) ? 1 : -1
					)
				]);
				break;
			case localLang.sort_opt_7:
				setProductsDisplay([
					...prods.sort((a, b) =>
						(a.salePrice ? a.salePrice : a.price) < (b.salePrice ? b.salePrice : b.price) ? 1 : -1
					)
				]);
				break;
		}
	};

	useEffect(() => {
		if (filteredProductsByStock.length > 0 || filteredProductsByPrice.length > 0) {
			if (filteredProductsByStock.length === 0) {
				return sortByProductProperty(selectedSortOrder, filteredProductsByPrice);
			}
			if (filteredProductsByPrice.length === 0) {
				return sortByProductProperty(selectedSortOrder, filteredProductsByStock);
			}
			return sortByProductProperty(
				selectedSortOrder,
				filteredProductsByStock.filter(prod => filteredProductsByPrice.includes(prod))
			);
		} else {
			return sortByProductProperty(selectedSortOrder, products);
		}
	}, [filteredProductsByStock, filteredProductsByPrice]);

	useEffect(() => {
		sortByProductProperty(selectedSortOrder, productsDisplay);
	}, [selectedSortOrder]);

	type CheckboxProps = {
		id: string;
		name: string;
		disabled: boolean;
		toggleFilter: Function;
		checked: boolean;
	};

	const Checkbox = ({ id, name, disabled, toggleFilter, checked }: CheckboxProps) => {
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
		);
	};

	const availabilityFilterContent = () => {
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
		);
	};

	const priceFilterContent = () => {
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
				setDisabledApplyPriceRangeButton(true);
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
				setDisabledApplyPriceRangeButton(true);
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
						? prod.salePrice[locale.localCurrency] >= from && prod.salePrice[locale.localCurrency] < to
						: prod.price[locale.localCurrency] >= from && prod.price[locale.localCurrency] < to;
				});
			} else {
				return products.filter(prod => {
					return prod.salePrice ? prod.salePrice[locale.localCurrency] >= from : prod.price[locale.localCurrency] >= from;
				});
			}
		};

		const priceRanges = [
			{
				id: "pr-lt200",
				name: `${localLang.filter_2_checkbox_pr1} (${priceRangeFilter(0, 200).length})`,
				disabled: priceRangeFilter(0, 200).length === 0,
				filterFunc: () =>
					filterByPrice(priceRangeFilter(0, 200), setIsPR_lessThan200_Checked, isPR_lessThan200_Checked),
				isChecked: isPR_lessThan200_Checked
			},
			{
				id: "pr-200to300",
				name: `${localLang.filter_2_checkbox_pr2} (${priceRangeFilter(200, 300).length})`,
				disabled: priceRangeFilter(200, 300).length === 0,
				filterFunc: () =>
					filterByPrice(priceRangeFilter(200, 300), setIsPR_200to300_Checked, isPR_200to300_Checked),
				isChecked: isPR_200to300_Checked
			},
			{
				id: "pr-300to400",
				name: `${localLang.filter_2_checkbox_pr3} (${priceRangeFilter(300, 400).length})`,
				disabled: priceRangeFilter(300, 400).length === 0,
				filterFunc: () =>
					filterByPrice(priceRangeFilter(300, 400), setIsPR_300to400_Checked, isPR_300to400_Checked),
				isChecked: isPR_300to400_Checked
			},
			{
				id: "pr-400to600",
				name: `${localLang.filter_2_checkbox_pr4} (${priceRangeFilter(400, 600).length})`,
				disabled: priceRangeFilter(400, 600).length === 0,
				filterFunc: () =>
					filterByPrice(priceRangeFilter(400, 600), setIsPR_400to600_Checked, isPR_400to600_Checked),
				isChecked: isPR_400to600_Checked
			},
			{
				id: "pr-600to800",
				name: `${localLang.filter_2_checkbox_pr5} (${priceRangeFilter(600, 800).length})`,
				disabled: priceRangeFilter(600, 800).length === 0,
				filterFunc: () =>
					filterByPrice(priceRangeFilter(600, 800), setIsPR_600to800_Checked, isPR_600to800_Checked),
				isChecked: isPR_600to800_Checked
			},
			{
				id: "pr-800to1000",
				name: `${localLang.filter_2_checkbox_pr6} (${priceRangeFilter(800, 1000).length})`,
				disabled: priceRangeFilter(800, 1000).length === 0,
				filterFunc: () =>
					filterByPrice(priceRangeFilter(800, 1000), setIsPR_800to1000_Checked, isPR_800to1000_Checked),
				isChecked: isPR_800to1000_Checked
			},
			{
				id: "pr-1000to1200",
				name: `${localLang.filter_2_checkbox_pr7} (${priceRangeFilter(1000, 1200).length})`,
				disabled: priceRangeFilter(1000, 1200).length === 0,
				filterFunc: () =>
					filterByPrice(priceRangeFilter(1000, 1200), setIsPR_1000to1200_Checked, isPR_1000to1200_Checked),
				isChecked: isPR_1000to1200_Checked
			},
			{
				id: "pr-1200andUp",
				name: `${localLang.filter_2_checkbox_pr8} (${priceRangeFilter(1200).length})`,
				disabled: priceRangeFilter(1200).length === 0,
				filterFunc: () =>
					filterByPrice(priceRangeFilter(1200), setIsPR_1200andUp_Checked, isPR_1200andUp_Checked),
				isChecked: isPR_1200andUp_Checked
			}
		];

		const filterByPrice = (prodsInPriceRange: ProductItem[], setChecked: Function, isChecked: boolean) => {
			if (isChecked) {
				setChecked(false);
				// add back the manually inputted price range if price range has been applied
				if (minPriceInput.value != "" || maxPriceInput.value != "") {
					let removedFilterList = filteredProductsByPrice.filter(prod => !prodsInPriceRange.includes(prod));
					setFilteredProductsByPrice([
						...removedFilterList,
						...priceRangeFilter(minPrice, maxPrice).filter(prod => !removedFilterList.includes(prod))
					]);
				} else {
					// return list of filtered products not in "prodsInPriceRange" array
					setFilteredProductsByPrice(
						filteredProductsByPrice.filter(prod => !prodsInPriceRange.includes(prod))
					);
				}
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
			setFilteredProductsByPrice([
				...filteredProductsByPrice,
				...priceRangeFilter(minPrice, maxPrice).filter(prod => !filteredProductsByPrice.includes(prod))
			]);
		};

		const handleClearPriceRangeButton = () => {
			setFilteredProductsByPrice(
				filteredProductsByPrice.filter(prod => !priceRangeFilter(minPrice, maxPrice).includes(prod))
			);
			setMinPrice(0);
			setMaxPrice(10000);
			minPriceInput.value = "";
			maxPriceInput.value = "";
		};

		return (
			<div className="">
				<div className="flex justify-between items-center gap-2">
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
	};

	return (
		<section className="flex justify-center pb-16">
			<div className="w-full max-w-screen-xl px-12 grid grid-cols-4 gap-4">
				<div className="col-span-1 border-r">
					<FilterDropdown openFilter={true} title={localLang.filter_1_header} content={availabilityFilterContent()} />
					<FilterDropdown openFilter={false} title={localLang.filter_2_header} content={priceFilterContent()} />
				</div>
				<div className="col-span-3">
					<div className="flex justify-end gap-4 items-center">
						<p className="text-sm text-neutral-500">Sort by:</p>
						<select
							name="sortOrder"
							className="text-sm pr-1 text-neutral-500 cursor-pointer focus:outline-none hover:text-black hover:underline"
							onChange={handleSortSelection}
						>
							{sortOrder.map((order, index) => {
								return (
									<option value={order} key={index}>
										{order}
									</option>
								);
							})}
						</select>
						<p className="w-32 text-sm text-neutral-500 pl-12">{productsDisplay.length} products</p>
					</div>
					{productsDisplay.length > 0 ? (
						<div className="col-span-3 grid grid-cols-3 gap-y-8">
							{productsDisplay.map((prod, index) => (
								<Product product={prod} key={index} addToCart={addToCart} localLang={locale.localLang.text} localCurrency={locale.localCurrency} />
							))}
						</div>
					) : (
						<div className="flex flex-col items-center pt-32">
							<h2>No products found matching the selected filters</h2>
							<h2 onClick={clearFilters} className="underline cursor-pointer hover:decoration-2 transition duration-200">
								Clear filters
							</h2>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
