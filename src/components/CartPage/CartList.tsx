import React from "react";
import {useCart} from "../CartContext";
import {ProductItem} from "../../data/products";
import CartProductDisplay from "./CartProductDisplay";
import {getInLocalLangAndCurrency} from "../../data/products";
import {Link} from "react-router-dom";

type CartListProps = {
	locale: {
		localLang: {
			text: any;
			lang: "english" | "french";
		};
		localCurrency: "cad" | "usd";
	};
};

export default function CartList({locale}: CartListProps) {
	const {cart, totalCost, removeItemFromCart, updateItemQuantity} = useCart();

	const localLang = locale.localLang.text;

	const subtotal = getInLocalLangAndCurrency(locale.localCurrency, locale.localLang.lang, totalCost);

	const removeFromCart = (item: ProductItem) => {
		removeItemFromCart(item);
	};

	const updateQuantity = (item: ProductItem, quantity: number) => {
		updateItemQuantity(item, quantity);
	};

	return (
		<section className="flex justify-center">
			<div className="w-full max-w-screen-xl px-12 py-6 md:py-12">
				<div className="flex justify-between items-end py-4 md:py-8">
					<h1 className="text-4xl sm:w-auto">{localLang.cart_header}</h1>
					<a href="/shop">
						<p className="text-sm hover:underline">{localLang.cart_continue_shopping}</p>
					</a>
				</div>
				<div className="">
					<div className={`${cart.size > 0 ? "md:grid" : "hidden"} hidden grid-cols-5 py-4`}>
						<p className="col-span-3 text-xs uppercase text-neutral-500">{localLang.cart_product}</p>
						<p className="text-xs uppercase text-neutral-500">{localLang.cart_quantity}</p>
						<p className="text-right text-xs uppercase text-neutral-500">{localLang.cart_total}</p>
					</div>
					<div className={`border-y flex flex-col ${cart.size > 0 ? "py-6" : "py-32 items-center"} justify-center gap-6 md:gap-12 md:py-12`}>
						{cart.size > 0 ? (
							Array.from(cart.keys()).map((prod, index) => (
								<CartProductDisplay
									product={prod}
									key={index}
									quantityAmount={cart.get(prod)!}
									removeFromCart={removeFromCart}
									updateQuantity={updateQuantity}
									locale={locale}
								/>
							))
						) : (
							<div className="flex items-center gap-6">
								<div className="pt-1">
									<p className="text-lg">{localLang.cart_empty_header}</p>
									<p className="text-neutral-500">{localLang.cart_empty_subheader}</p>
								</div>
								<a href="/shop">
									<svg className="w-16 h-16">
										<use href="src/icons_sprite.svg#addToCart" />
									</svg>
								</a>
							</div>
						)}
					</div>
				</div>
				<div className={`${cart.size > 0 ? "" : "hidden"} flex justify-end pt-16 pb-8`}>
					<div className="flex flex-col gap-8 text-right md:w-1/4 select-none">
						<div className="flex justify-end">
							<p className="px-8">{localLang.cart_subtotal}</p>
							<p>
								<span className="pr-2">{locale.localCurrency === "cad" ? "CAD" : "USD"}</span>
								{subtotal}
							</p>
						</div>
						<p className="text-xs text-neutral-500">{localLang.cart_taxes_and_shipping}</p>
						<Link to="/checkout">
							<button className="w-full border px-4 py-4 bg-black border border-black text-white text-sm hover:bg-primary hover:border-primary hover:text-white transition duration-200">
								{localLang.cart_checkout}
							</button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
