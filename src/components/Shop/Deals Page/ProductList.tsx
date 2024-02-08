import React, { useEffect, useState } from "react";
import { ProductItem } from "../../../data/products";
import Product from "../../Product";
import FilterDropdown from "./FilterDropdown";
import { useCart } from "../../CartContext";
import AvailabilityFilter from "./AvailabilityFilter";
import PriceFilter from "./PriceFilter";

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

	const sortOrder: string[] = [
		localLang.sort_opt_1,
		localLang.sort_opt_2,
		localLang.sort_opt_3,
		localLang.sort_opt_4,
		localLang.sort_opt_5,
		localLang.sort_opt_6,
		localLang.sort_opt_7
	];

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
						( a.salePrice
							? a.salePrice[locale.localCurrency]
							: a.price[locale.localCurrency]
						)
						>
						( b.salePrice
							? b.salePrice[locale.localCurrency]
							: b.price[locale.localCurrency]
						) 
						? 1
						: -1
					)
				]);
				break;
			case localLang.sort_opt_7:
				setProductsDisplay([
					...prods.sort((a, b) =>
						( a.salePrice
							? a.salePrice[locale.localCurrency]
							: a.price[locale.localCurrency]
						)
						< 
						( b.salePrice 
							? b.salePrice[locale.localCurrency]
							: b.price[locale.localCurrency]
						) 
						? 1 
						: -1
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

	return (
		<section className="flex justify-center pb-16">
			<div className="w-full max-w-screen-xl px-12 grid grid-cols-4 gap-4">
				<div className="col-span-1 border-r">
					<FilterDropdown openFilter={true} title={localLang.filter_1_header} content={<AvailabilityFilter products={products} filteredProductsByStock={filteredProductsByStock} setFilteredProductsByStock={setFilteredProductsByStock} localLang={localLang} />} />
					<FilterDropdown openFilter={false} title={localLang.filter_2_header} content={<PriceFilter products={products} filteredProductsByPrice={filteredProductsByPrice} setFilteredProductsByPrice={setFilteredProductsByPrice} localLang={localLang} localCurrency={locale.localCurrency} />} />
				</div>
				<div className="col-span-3">
					<div className="flex justify-end gap-4 items-center">
						<p className="text-sm text-neutral-500">{ localLang.sort_header }</p>
						<select
							name="sortOrder"
							className="text-sm pr-1 text-neutral-500 cursor-pointer focus:ring-0 border-none hover:text-black hover:underline"
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
						<p className="w-32 text-sm text-neutral-500 pl-10">{productsDisplay.length} {localLang.sort_products}</p>
					</div>
					{productsDisplay.length > 0 ? (
						<div className="col-span-3 grid grid-cols-3 gap-y-8">
							{productsDisplay.map((prod, index) => (
								<Product product={prod} key={index} addToCart={addToCart} localLang={locale.localLang} localCurrency={locale.localCurrency} />
							))}
						</div>
					) : (
						<div className="flex flex-col items-center pt-32">
							<h2>{localLang.sort_no_products_found}</h2>
							<h2 onClick={clearFilters} className="underline cursor-pointer hover:decoration-2 transition duration-200">
								{localLang.sort_clear_filter}
							</h2>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
