import React from "react";
import { ProductItem } from "../data/products";
import { Link } from "react-router-dom";

type ProductProps = {
	product: ProductItem,
	addToCart: Function,
	localLang: {
		text: any,
		lang: "english" | "french"
	},
	localCurrency: "cad" | "usd"
}

export default function Product({ product, addToCart, localLang, localCurrency }: ProductProps) {

	const {img, name, manufacturer, stock} = product;

	// always displays to two decimal places
	const price = localCurrency === "cad"
		? (localLang.lang === "english"
			? product.price[localCurrency].toLocaleString("en-CA", {style: "currency", currency: "CAD"})
			: product.price[localCurrency].toLocaleString("fr-CA", {style: "currency", currency: "CAD"}))
		: product.price[localCurrency].toLocaleString("en-US", { style: "currency", currency: "USD" });
	
	const salePrice = product.salePrice
		? localCurrency === "cad"
			? (localLang.lang === "english")
				? product.salePrice[localCurrency].toLocaleString("en-CA", {style: "currency", currency: "CAD"})
				: product.salePrice[localCurrency].toLocaleString("fr-CA", {style: "currency", currency: "CAD"})
			: product.salePrice[localCurrency].toLocaleString("en-US", { style: "currency", currency: "USD" })
		: null;

	const handleAddProductToCart = () => {
		if (stock > 0) {
			addToCart(product)	
		}
	}

	return (
		<div className="flex flex-col justify-between w-72 group">
			<Link to={`/product/${encodeURIComponent(name)}`}>
				<div className="flex flex-col h-full justify-between gap-4 pb-5">
					<div>
						<div className="relative">
							<img src={img.toString()} className={`w-72 px-6 py-6 group-hover:scale-105 transition duration-300 ${stock > 0 ? "" : "grayscale"}`} />
							<div className={`${salePrice ? "" : "hidden"} absolute bg-blue-800 text-sm text-white border px-4 py-1 rounded-2xl bottom-2 left-0`}>{ localLang.text.product_sale }</div>	
							<div className={`${stock > 0 ? "hidden" : ""} absolute bg-neutral-600 text-sm text-white border px-4 py-1 rounded-2xl bottom-2 right-0`}>{ localLang.text.product_out_of_stock }</div>	
						</div>
						<div className="pt-2">
							<p className="text-sm line-clamp-2 group-hover:underline">{name}</p>
							<p className="text-xs text-neutral-400 uppercase py-2">{manufacturer}</p>	
						</div>	
					</div>
					<div className="inline-flex items-center">
						<p className={`${salePrice ? "text-sm line-through text-neutral-500 pr-4" : ""}`}>{price} { localCurrency === "cad" ? "CAD" : "USD" }</p>		
						<p className={`${salePrice ? "" : "hidden"}`}>{salePrice} { localCurrency === "cad" ? "CAD" : "USD" }</p>					
					</div>
				</div>	
			</Link>
			<button onClick={handleAddProductToCart} className={`${stock > 0 ? "hover:bg-black hover:text-white transition duration-200" : "cursor-not-allowed"} w-full border border-black py-3`}>{ localLang.text.product_add_to_cart }</button>
		</div>
	)
}