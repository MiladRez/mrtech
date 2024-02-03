import React, { useEffect, useReducer, useRef, useState } from "react";
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

export default function ProductList({ products, setProduct }: { products: ProductItem[]; setProduct: Function }) {
	const { addItemToCart } = useCart();

	const [, forceUpdate] = useReducer((x) => x + 1, 0);

	const [productsDisplay, setProductsDisplay] = useState(products);
	const [filteredProductsByStock, setFilteredProductsByStock] = useState([] as ProductItem[]);
	const [filteredProductsByPrice, setFilteredProductsByPrice] = useState([] as ProductItem[]);
	const [selectedSortOrder, setSelectedSortOrder] = useState("Recently Added");

	const addToCart = (item: ProductItem) => {
		addItemToCart(item);
		setProduct(item);
	};

	const handleSortSelection = (event: any) => {
		setSelectedSortOrder(event.target.value);
		sortByProductProperty(event.target.value);
	}

	const sortByProductProperty = (sortOrder: string) => {
		switch (sortOrder) {
			case "Recently Added":
				setProductsDisplay([...productsDisplay.sort((a, b) => parseInt(a.id) < parseInt(b.id) ? 1 : -1)]);
				break;
			case "Highest Rated":
				setProductsDisplay(productsDisplay.sort((a, b) => a.rating < b.rating ? 1 : -1));
				break;
			case "Best Selling":
				setProductsDisplay(productsDisplay.sort((a, b) => a.stock > b.stock ? 1 : -1));
				break;
			case "Name, A-Z":
				setProductsDisplay(productsDisplay.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
				break;
			case "Name, Z-A":
				setProductsDisplay(productsDisplay.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1));
				break;
			case "Price, Low-High":
				setProductsDisplay(productsDisplay.sort((a, b) => (a.salePrice ? a.salePrice : a.price) > (b.salePrice ? b.salePrice : b.price) ? 1 : -1));
				break;
			case "Price, High-Low":
				setProductsDisplay(productsDisplay.sort((a, b) => (a.salePrice ? a.salePrice : a.price) < (b.salePrice ? b.salePrice : b.price) ? 1 : -1));
				break;
		}
	}

	useEffect(() => {
		if (filteredProductsByStock.length > 0 || filteredProductsByPrice.length > 0) {
			if (filteredProductsByStock.length === 0) {
				console.log("I run")
				setProductsDisplay(filteredProductsByPrice);
			} else if (filteredProductsByPrice.length === 0) {
				setProductsDisplay(filteredProductsByStock);
			} else {
				setProductsDisplay(filteredProductsByStock.filter(prod => filteredProductsByPrice.includes(prod)));
			}
		} else {
			setProductsDisplay(products);
		}
		console.log("I also run")
		sortByProductProperty(selectedSortOrder);
	}, [filteredProductsByStock, filteredProductsByPrice]);

	type CheckboxProps = {
		id: string;
		name: string;
		disabled: boolean;
		toggleFilter: Function;
		checked: boolean;
	};

	const Checkbox = ({ id, name, disabled, toggleFilter, checked }: CheckboxProps) => {
		const handleCheckbox = () => {
			let checkbox = document.getElementById(id) as HTMLInputElement;
			toggleFilter();
			if (!checkbox.checked) {
				setProductsDisplay(products);
			}
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
					name={`In stock (${inStock.length})`}
					disabled={inStock.length === 0}
					toggleFilter={() => filterByStock(inStock, setInStockChecked, inStockChecked)}
					checked={inStockChecked}
				/>
				<Checkbox
					id="out-of-stock"
					name={`Out of stock (${outOfStock.length})`}
					disabled={outOfStock.length === 0}
					toggleFilter={() => filterByStock(outOfStock, setOutOfStockChecked, outOfStockChecked)}
					checked={outOfStockChecked}
				/>
			</ul>
		);
	};

	const priceFilterContent = () => {
		const [disabledApplyPriceRangeButton, setDisabledApplyPriceRangeButton] = useState(true);
		const minPriceInput = useRef(null);
		const maxPriceInput = useRef(null);

		const [isPR_lessThan200_Checked, setIsPR_lessThan200_Checked] = useState(false);
		const [isPR_200to300_Checked, setIsPR_200to300_Checked] = useState(false);
		const [isPR_300to400_Checked, setIsPR_300to400_Checked] = useState(false);
		const [isPR_400to600_Checked, setIsPR_400to600_Checked] = useState(false);
		const [isPR_600to800_Checked, setIsPR_600to800_Checked] = useState(false);
		const [isPR_800to1000_Checked, setIsPR_800to1000_Checked] = useState(false);
		const [isPR_1000to1200_Checked, setIsPR_1000to1200_Checked] = useState(false);
		const [isPR_1200andUp_Checked, setIsPR_1200andUp_Checked] = useState(false);

		const handlePriceInput = (event: { target: { value: string } }) => {
			if (event.target.value === "") {
				setDisabledApplyPriceRangeButton(true);
			} else {
				setDisabledApplyPriceRangeButton(false);
			}
		};

		const priceRangeFilter = (from: number, to?: number) => {
			if (from && to) {
				return products.filter(prod => {
					return prod.salePrice
						? prod.salePrice >= from && prod.salePrice < to
						: prod.price >= from && prod.price < to;
				});
			} else {
				return products.filter(prod => {
					return prod.salePrice ? prod.salePrice >= from : prod.price >= from;
				});
			}
		};

		const priceRanges = [
			{
				id: "pr-lt200",
				name: `Less than $200 (${priceRangeFilter(0.01, 200).length})`,
				disabled: priceRangeFilter(0.01, 200).length === 0,
				filterFunc: () => filterByPrice(priceRangeFilter(0.01, 200), setIsPR_lessThan200_Checked, isPR_lessThan200_Checked),
				isChecked: isPR_lessThan200_Checked
			},
			{
				id: "pr-200to300",
				name: `$200 - $299.99 (${priceRangeFilter(200, 300).length})`,
				disabled: priceRangeFilter(200, 300).length === 0,
				filterFunc: () => filterByPrice(priceRangeFilter(200, 300), setIsPR_200to300_Checked, isPR_200to300_Checked),
				isChecked: isPR_200to300_Checked
			},
			{
				id: "pr-300to400",
				name: `$300 - $399.99 (${priceRangeFilter(300, 400).length})`,
				disabled: priceRangeFilter(300, 400).length === 0,
				filterFunc: () => filterByPrice(priceRangeFilter(300, 400), setIsPR_300to400_Checked, isPR_300to400_Checked),
				isChecked: isPR_300to400_Checked
			},
			{
				id: "pr-400to600",
				name: `$400 - $599.99 (${priceRangeFilter(400, 600).length})`,
				disabled: priceRangeFilter(400, 600).length === 0,
				filterFunc: () => filterByPrice(priceRangeFilter(400, 600), setIsPR_400to600_Checked, isPR_400to600_Checked),
				isChecked: isPR_400to600_Checked
			},
			{
				id: "pr-600to800",
				name: `$600 - $799.99 (${priceRangeFilter(600, 800).length})`,
				disabled: priceRangeFilter(600, 800).length === 0,
				filterFunc: () => filterByPrice(priceRangeFilter(600, 800), setIsPR_600to800_Checked, isPR_600to800_Checked),
				isChecked: isPR_600to800_Checked
			},
			{
				id: "pr-800to1000",
				name: `$800 - $999.99 (${priceRangeFilter(800, 1000).length})`,
				disabled: priceRangeFilter(800, 1000).length === 0,
				filterFunc: () => filterByPrice(priceRangeFilter(800, 1000), setIsPR_800to1000_Checked, isPR_800to1000_Checked),
				isChecked: isPR_800to1000_Checked
			},
			{
				id: "pr-1000to1200",
				name: `$1000 - $1199.99 (${priceRangeFilter(1000, 1200).length})`,
				disabled: priceRangeFilter(1000, 1200).length === 0,
				filterFunc: () => filterByPrice(priceRangeFilter(1000, 1200), setIsPR_1000to1200_Checked, isPR_1000to1200_Checked),
				isChecked: isPR_1000to1200_Checked
			},
			{
				id: "pr-1200andUp",
				name: `$1200 and Up (${priceRangeFilter(1200).length})`,
				disabled: priceRangeFilter(1200).length === 0,
				filterFunc: () => filterByPrice(priceRangeFilter(1200), setIsPR_1200andUp_Checked, isPR_1200andUp_Checked),
				isChecked: isPR_1200andUp_Checked
			},
		]

		const filterByPrice = (prodsInPriceRange: ProductItem[], setChecked: Function, isChecked: boolean) => {
			if (isChecked) {
				setChecked(false);
				// return list of filtered products not in "prodsInPriceRange" array
				setFilteredProductsByPrice(filteredProductsByPrice.filter(prod => !prodsInPriceRange.includes(prod)));
			} else {
				setChecked(true);
				// return new list with previous value of filtered products and "prodsInPriceRange" array
				setFilteredProductsByPrice([...filteredProductsByPrice, ...prodsInPriceRange]);
			}
		}

		return (
			<div className="">
				<div className="flex justify-between items-center gap-2">
					<div className="flex flex-col gap-1 pl-1">
						<label htmlFor="min-price" className="text-sm text-neutral-500 select-none">
							Min
						</label>
						<div className="relative focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
							<input
								ref={minPriceInput}
								type="number"
								placeholder="$"
								onChange={handlePriceInput}
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
								ref={maxPriceInput}
								type="number"
								placeholder="$"
								onChange={handlePriceInput}
								id="max-price"
								className="w-28 px-2 py-2 border border-neutral-400 focus:outline-none peer"
							/>
							<div className="absolute top-0 w-full h-full pointer-events-none border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
						</div>
					</div>
				</div>
				<div className="flex flex-col py-4 border-b px-1">
					<button
						disabled={disabledApplyPriceRangeButton}
						className="w-full border px-12 py-4 bg-primary text-sm text-white font-semibold hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-black transition duration-200"
					>
						Apply Price Range
					</button>
					<button
						className={`${
							disabledApplyPriceRangeButton ? "hidden" : ""
						} text-sm text-primary pt-6 self-start hover:underline`}
					>
						Clear price range
					</button>
				</div>
				<ul className="flex flex-col gap-4 pt-6 px-1">
					{
						priceRanges.map((priceRange, index) => (
							<Checkbox
								key={index}
								id={priceRange.id}
								name={priceRange.name}
								disabled={priceRange.disabled}
								toggleFilter={priceRange.filterFunc}
								checked={priceRange.isChecked}
							/>	
						))
					}
				</ul>
			</div>
		);
	};

	return (
		<section className="flex justify-center pb-16">
			<div className="w-full max-w-screen-xl px-12 grid grid-cols-4 gap-4">
				<div className="col-span-1 border-r">
					<FilterDropdown openFilter={true} title="Availability" content={availabilityFilterContent()} />
					<FilterDropdown openFilter={false} title="Price" content={priceFilterContent()} />
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
						<p className="text-sm text-neutral-500 pl-12">{productsDisplay.length} products</p>
					</div>
					<div className="col-span-3 grid grid-cols-3 gap-y-8">
						{productsDisplay.map((prod, index) => (
							<Product product={prod} key={index} addToCart={addToCart} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
