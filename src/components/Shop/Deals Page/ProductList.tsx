import React, { useEffect, useState } from "react";
import { ProductItem } from "../../../data/products";
import Product from "../../Product";
import FilterDropdown from "./FilterDropdown";
import { useCart } from "../../CartContext";
import AvailabilityFilter from "./AvailabilityFilter";
import PriceFilter from "./PriceFilter";

type ProductListProps = {
    products: ProductItem[];
    setProduct: Function;
    locale: {
        localLang: {
            text: any;
            lang: "english" | "french";
        };
        localCurrency: "cad" | "usd";
    };
};

export default function ProductList({ products, setProduct, locale }: ProductListProps) {
    const { addItemToCart } = useCart();

    const localLang = locale.localLang.text;

    const sortOrder: string[] = [localLang.sort_opt_1, localLang.sort_opt_2, localLang.sort_opt_3, localLang.sort_opt_4, localLang.sort_opt_5, localLang.sort_opt_6, localLang.sort_opt_7];

    const [productsDisplay, setProductsDisplay] = useState(products);

    // for mobile view filter button
    const [filterPopup, setFilterPopup] = useState(false);

    const [filteredProductsByStock, setFilteredProductsByStock] = useState([] as ProductItem[]);
    const [filteredProductsByPrice, setFilteredProductsByPrice] = useState([] as ProductItem[]);
    const [filteredProductsByInputtedPriceRange, setFilteredProductsByInputtedPriceRange] = useState([] as ProductItem[]);
    const [noMatchToInputtedPriceRange, setNoMatchToInputtedPriceRange] = useState(false);

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
                setProductsDisplay([...prods.sort((a, b) => ((a.salePrice ? a.salePrice[locale.localCurrency] : a.price[locale.localCurrency]) > (b.salePrice ? b.salePrice[locale.localCurrency] : b.price[locale.localCurrency]) ? 1 : -1))]);
                break;
            case localLang.sort_opt_7:
                setProductsDisplay([...prods.sort((a, b) => ((a.salePrice ? a.salePrice[locale.localCurrency] : a.price[locale.localCurrency]) < (b.salePrice ? b.salePrice[locale.localCurrency] : b.price[locale.localCurrency]) ? 1 : -1))]);
                break;
        }
    };

    // mobile view filter button click
    const handleFilterButtonClick = () => {
        setFilterPopup(true);
        document.addEventListener("mouseup", closeWhenClickedOutsideFilterPopup);
        document.body.style.overflow = "hidden";
    };

    const closeWhenClickedOutsideFilterPopup = (event: any) => {
        if (!event.composedPath().includes(document.querySelector("#filterPopup"))) {
            setFilterPopup(false);
            document.removeEventListener("mouseup", closeWhenClickedOutsideFilterPopup);
            document.body.style.overflow = "scroll";
        }
    };

    useEffect(() => {
        if (filteredProductsByStock.length > 0 || filteredProductsByPrice.length > 0 || filteredProductsByInputtedPriceRange.length > 0) {
            // if no availability filters have been checked but at least one price filter(including user inputted prince range) is checked
            if (filteredProductsByStock.length === 0) {
                return sortByProductProperty(selectedSortOrder, [...filteredProductsByPrice, ...filteredProductsByInputtedPriceRange.filter((prod) => !filteredProductsByPrice.includes(prod))]);
            }
            // if no price filters have been checked and at least one availability filter is checked
            if (filteredProductsByPrice.length === 0) {
                // if "Apply Price Range" button has been clicked and its been determined that there is no match to user inputted price range
                if (noMatchToInputtedPriceRange) {
                    return sortByProductProperty(selectedSortOrder, []);
                    // if user hasn't inputted manual price range
                } else if (filteredProductsByInputtedPriceRange.length === 0) {
                    return sortByProductProperty(selectedSortOrder, filteredProductsByStock);
                }
                // if user has inputted manual price range and it matches a result
                return sortByProductProperty(
                    selectedSortOrder,
                    filteredProductsByStock.filter((prod) => filteredProductsByInputtedPriceRange.includes(prod))
                );
            }
            // if both filters have been checked
            return sortByProductProperty(
                selectedSortOrder,
                filteredProductsByStock.filter((prod) => [...filteredProductsByPrice, ...filteredProductsByInputtedPriceRange.filter((prod) => !filteredProductsByPrice.includes(prod))].includes(prod))
            );
        } else {
            if (noMatchToInputtedPriceRange) {
                return sortByProductProperty(selectedSortOrder, []);
            }
            return sortByProductProperty(selectedSortOrder, products);
        }
    }, [filteredProductsByStock, filteredProductsByPrice, filteredProductsByInputtedPriceRange]);

    useEffect(() => {
        sortByProductProperty(selectedSortOrder, productsDisplay);
    }, [selectedSortOrder]);

    return (
        <section className="flex justify-center pb-16">
            <div className="w-full max-w-screen-xl px-12 grid xl:grid-cols-4 gap-4">
                <div className="xl:col-span-1 border-r hidden xl:flex xl:flex-col">
                    <FilterDropdown
                        openFilter={true}
                        title={localLang.filter_1_header}
                        content={
                            <AvailabilityFilter
                                products={products}
                                filteredProductsByStock={filteredProductsByStock}
                                setFilteredProductsByStock={setFilteredProductsByStock}
                                localLang={localLang}
                                filteredProductsByPrice={filteredProductsByPrice}
                                filteredProductsByInputtedPriceRange={filteredProductsByInputtedPriceRange}
                                noMatchToInputtedPriceRange={noMatchToInputtedPriceRange}
                            />
                        }
                    />
                    <FilterDropdown
                        openFilter={false}
                        title={localLang.filter_2_header}
                        content={
                            <PriceFilter
                                products={products}
                                filteredProductsByPrice={filteredProductsByPrice}
                                setFilteredProductsByPrice={setFilteredProductsByPrice}
                                localLang={localLang}
                                localCurrency={locale.localCurrency}
                                setNoMatchToInputtedPriceRange={setNoMatchToInputtedPriceRange}
                                setFilteredProductsByInputtedPriceRange={setFilteredProductsByInputtedPriceRange}
                                filteredProductsByStock={filteredProductsByStock}
                            />
                        }
                    />
                </div>
                <div className="xl:col-span-3">
                    <div className="xl:hidden w-full flex justify-end pb-8">
                        <button
                            onClick={handleFilterButtonClick}
                            className="w-full sm:w-1/3 px-4 py-3 border border-neutral-500"
                        >
                            <div className="flex justify-center pr-2 gap-2 group hover:text-primary">
                                <svg className="w-6 h-6 group-hover:fill-primary">
                                    <use href="src/icons_sprite.svg#filter" />
                                </svg>
                                {localLang.shop_filter}
                            </div>
                        </button>
                    </div>
                    <div className={`${filterPopup ? "" : "hidden"} fixed top-0 left-0 w-screen h-screen z-10 bg-black/50 flex flex-col items-center justify-center`}>
                        <div
                            id="filterPopup"
                            className="max-h-[26rem] no-scrollbar overflow-auto"
                        >
                            <FilterDropdown
                                openFilter={true}
                                title={localLang.filter_1_header}
                                content={
                                    <AvailabilityFilter
                                        products={products}
                                        filteredProductsByStock={filteredProductsByStock}
                                        setFilteredProductsByStock={setFilteredProductsByStock}
                                        localLang={localLang}
                                        filteredProductsByPrice={filteredProductsByPrice}
                                        filteredProductsByInputtedPriceRange={filteredProductsByInputtedPriceRange}
                                        noMatchToInputtedPriceRange={noMatchToInputtedPriceRange}
                                    />
                                }
                            />
                            <FilterDropdown
                                openFilter={false}
                                title={localLang.filter_2_header}
                                content={
                                    <PriceFilter
                                        products={products}
                                        filteredProductsByPrice={filteredProductsByPrice}
                                        setFilteredProductsByPrice={setFilteredProductsByPrice}
                                        localLang={localLang}
                                        localCurrency={locale.localCurrency}
                                        setNoMatchToInputtedPriceRange={setNoMatchToInputtedPriceRange}
                                        setFilteredProductsByInputtedPriceRange={setFilteredProductsByInputtedPriceRange}
                                        filteredProductsByStock={filteredProductsByStock}
                                    />
                                }
                            />
                        </div>
                        <button className="sm:hidden absolute mt-[32rem] px-4 py-4 bg-black text-white text-sm">{localLang.shop_apply_filters_button}</button>
                    </div>
                    <div className="flex justify-between sm:justify-end items-center">
                        <div className="flex items-center pr-2">
                            <p className="text-sm text-neutral-500">{localLang.sort_header}</p>
                            <select
                                name="sortOrder"
                                className="text-sm text-neutral-500 cursor-pointer focus:ring-0 border-none hover:text-black hover:underline"
                                onChange={handleSortSelection}
                            >
                                {sortOrder.map((order, index) => {
                                    return (
                                        <option
                                            value={order}
                                            key={index}
                                        >
                                            {order}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <p className="sm:w-32 text-end text-sm text-neutral-500 sm:pl-10">
                            {productsDisplay.length} {localLang.sort_products}
                        </p>
                    </div>
                    {productsDisplay.length > 0 ? (
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-8 justify-items-center">
                            {productsDisplay.map((prod, index) => (
                                <Product
                                    product={prod}
                                    key={index}
                                    addToCart={addToCart}
                                    localLang={locale.localLang}
                                    localCurrency={locale.localCurrency}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4 pt-16 sm:pt-32">
                            <h2 className="text-center">{localLang.sort_no_products_found}</h2>
                            <h2
                                onClick={clearFilters}
                                className="underline cursor-pointer hover:decoration-2 transition duration-200"
                            >
                                {localLang.sort_clear_filter}
                            </h2>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
