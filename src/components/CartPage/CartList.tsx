import React, { useState } from "react";
import { useCart } from "../CartContext";
import { ProductItem } from "../../data/products";
import CartProductDisplay from "./CartProductDisplay";

export default function CartList() {

	const { cart, totalCost, removeItemFromCart, updateItemQuantity } = useCart();

	const removeFromCart = (item: ProductItem) => {
		removeItemFromCart(item);
	}

	const updateQuantity = (item: ProductItem, quantity: number) => {
		updateItemQuantity(item, quantity);
	}

	return (
		<section className="flex justify-center">
			<div className="w-full max-w-screen-xl px-12 py-12">
				<div className="flex justify-between items-end py-6">
					<h1 className="text-4xl">Your cart</h1>
					<a href="/shop">
						<p className="text-sm hover:underline">Continue shopping</p>	
					</a>
				</div>
				<div className="">
					<div className={`${cart.size > 0 ? "" : "hidden"} grid grid-cols-5 py-4`}>
						<p className="col-span-3 text-xs uppercase text-neutral-500">Product</p>
						<p className="text-xs uppercase text-neutral-500">Quantity</p>
						<p className="text-right text-xs uppercase text-neutral-500">Total</p>
					</div>
					<div className="border-y flex flex-col items-center justify-center gap-12 py-12">
						{	
							cart.size > 0 ?
								Array.from(cart.keys()).map((prod, index) => (
									<CartProductDisplay product={prod} key={index} quantityAmount={cart.get(prod)!} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />	
								))
								:
								<div className="flex items-center gap-6">
									<div className="pt-1">
										<p className="text-lg">Your cart is empty</p>
										<p className="text-neutral-500">Why not add something?</p>
									</div>
									<svg className="w-16 h-16">
										<use href="src/icons_sprite.svg#addToCart" />
									</svg>
								</div>
						}
					</div>
				</div>
				<div className={`${cart.size > 0 ? "" : "hidden"} flex justify-end pt-16 pb-8`}>
					<div className="flex flex-col gap-8 text-right w-1/4">
						<div className="flex justify-end">
							<p className="px-8">Subtotal</p>	
							<p>{ totalCost.toLocaleString("en-CA", { style: "currency", currency: "CAD" }) } CAD</p>
						</div>
						
						<p className="text-xs text-neutral-500">Taxes and shipping calculated at checkout</p>
						<button className="border px-4 py-4 bg-black border border-black text-white text-sm hover:bg-primary hover:border-primary hover:text-white transition duration-200">Check out</button>
					</div>
				</div>
			</div>
		</section>
	)
}