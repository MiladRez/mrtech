import React from "react";
import Product from "../Product";
import { ProductItem } from "../../data/products";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";

type FeaturedProductsProps = {
	header: string,
	subheader: string,
	products: ProductItem[],
	viewAllPage: string,
	setProduct: Function,
	locale: {
		localLang: {
			text: any,
			lang: "english" | "french"
		},
		localCurrency: "cad" | "usd"
	}
}

export default function FeaturedProducts({ header, subheader, products, viewAllPage, setProduct, locale }: FeaturedProductsProps) {

	const { addItemToCart } = useCart();

	const localLang = locale.localLang.text;

	const addToCart = (item: ProductItem) => {
		addItemToCart(item)
		setProduct(item);
	}

	return (
		<section className="flex justify-center">
			<div className="w-full max-w-screen-xl px-12 py-10">
				<div className="flex flex-col gap-4 items-center py-8">
					<h1 className="text-4xl">{header}</h1>
					<p>{subheader}</p>
				</div>
				<div className="flex gap-2 justify-between">
					{
						products.slice(0, 4).map((prod, index) => (
							<Product product={prod} key={index} addToCart={addToCart} localLang={locale.localLang} localCurrency={locale.localCurrency} />
						))
					}
				</div>
				<div className="flex justify-center py-8">
					<Link to={viewAllPage}>
						<button className="w-fit border px-10 py-3 bg-black border-black text-white hover:bg-primary hover:border-primary hover:text-white transition duration-200">{ localLang.featured_products_view_all }</button>
					</Link>
				</div>
			</div>
		</section>
	)
}