import React, { useEffect, useState } from "react";
import { ProductItem, allProducts } from "../../data/products";
import { Link } from "react-router-dom";
import { getInLocalLangAndCurrency } from "../../data/products";

type CartProductDisplayProps = {
    product: ProductItem;
    quantityAmount: number;
    removeFromCart: Function;
    updateQuantity: Function;
    locale: {
        localLang: {
            text: any;
            lang: "english" | "french";
        };
        localCurrency: "cad" | "usd";
    };
};

export default function CartProductDisplay({ product, quantityAmount, removeFromCart, updateQuantity, locale }: CartProductDisplayProps) {
    const productPrice = product.salePrice ? product.salePrice[locale.localCurrency] : product.price[locale.localCurrency];

    const [quantity, setQuantity] = useState(quantityAmount);
    const [productCost, setProductCost] = useState(productPrice * quantityAmount);
    const [disabled, setDisabled] = useState(quantityAmount === 1);

    const localLang = locale.localLang.text;

    const handleQuantityDecreaseClick = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            updateQuantity(product, newQuantity);
        }
    };

    const handleQuantityOnChange = (event: any) => {
        if (event.target.value === "") {
            setQuantity(event.target.value);
        } else {
            const newQuantity = parseInt(event.target.value);
            setQuantity(newQuantity);
            updateQuantity(product, newQuantity);
        }
    };

    const handleQuantityOnBlur = (event: any) => {
        if (event.target.value === "" || event.target.value === "0") {
            const newQuantity = 1;
            setQuantity(newQuantity);
            updateQuantity(product, newQuantity);
        }
    };

    const handleQuantityIncreaseClick = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateQuantity(product, newQuantity);
    };

    const handleRemoveProductButtonClick = () => {
        removeFromCart(product);
    };

    useEffect(() => {
        setQuantity(quantityAmount);
        setProductCost(productPrice * quantityAmount);
    }, [quantityAmount]);

    useEffect(() => {
        setQuantity(quantityAmount);
        setProductCost(productPrice * quantityAmount);
    }, [product]);

    useEffect(() => {
        quantity < 2 ? setDisabled(true) : setDisabled(false);
    }, [quantity]);

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 items-center gap-y-2 sm:gap-y-6 md:gap-y-0 border md:border-none px-4 py-4 md:px-0 md:py-0">
            <div className="col-span-2 md:col-span-3">
                <Link
                    to={`/product/${encodeURIComponent(product.name)}`}
                    className="flex w-full lg:w-3/4 group"
                >
                    <img
                        src={product.img.toString()}
                        className="w-32 h-32"
                    />
                    <div className="flex flex-col gap-2 justify-center pl-4 md:pl-10">
                        <p className="group-hover:underline line-clamp-2 text-sm md:text-base">{product.name}</p>
                        <p className="text-xs md:text-sm text-neutral-500">{product.manufacturer}</p>
                        <div className="select-none">
                            <div className="flex items-center">
                                <svg
                                    fill="#16a34a"
                                    className="w-3.5 h-3.5"
                                >
                                    <use href="src/icons_sprite.svg#checkmark" />
                                </svg>
                                <p className="text-[10px] md:text-xs px-1">{localLang.cart_available_to_ship}</p>
                            </div>
                            <div className="flex items-center">
                                <svg
                                    fill="#16a34a"
                                    className="w-3.5 h-3.5"
                                >
                                    <use href="src/icons_sprite.svg#checkmark" />
                                </svg>
                                <p className="text-[10px] md:text-xs px-1">{localLang.cart_available_at_nearby_stores}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="flex items-center">
                <div className="w-40 flex items-center justify-between ring-1 ring-neutral-500 hover:ring-2 transition duration-200">
                    <div
                        onClick={handleQuantityDecreaseClick}
                        className={`${disabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-black/10"} px-4 py-4`}
                    >
                        <svg className="w-4 h-4">
                            <use href="src/icons_sprite.svg#minus" />
                        </svg>
                    </div>
                    <input
                        name="quantity"
                        type="number"
                        value={quantity}
                        onChange={handleQuantityOnChange}
                        onBlur={handleQuantityOnBlur}
                        className="px-0 py-0 text-center text-sm w-8 border-none focus:ring-0"
                    />
                    <div
                        onClick={handleQuantityIncreaseClick}
                        className="px-4 py-4 cursor-pointer hover:bg-black/10"
                    >
                        <svg className="w-3.5 h-4">
                            <use href="src/icons_sprite.svg#plus" />
                        </svg>
                    </div>
                </div>
                <div className="px-3 md:px-4">
                    <svg
                        onClick={handleRemoveProductButtonClick}
                        className="w-5 h-5 cursor-pointer hover:scale-110 hover:fill-rose-700"
                    >
                        <use href="src/icons_sprite.svg#trash" />
                    </svg>
                </div>
            </div>
            <p className="text-sm text-right select-none">
                {getInLocalLangAndCurrency(locale.localCurrency, locale.localLang.lang, productCost)}
                {locale.localCurrency === "cad" ? " CAD" : " USD"}
            </p>
        </div>
    );
}
