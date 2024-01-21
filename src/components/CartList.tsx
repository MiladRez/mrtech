import React, { useEffect, useState } from "react";
import ProductCartDisplay from "./ProductCartDisplay";
import { useCart } from "./CartContext";
import { ProductItem } from "../data/products";

export default function CartList() {

	const { totalCost, removeItemFromCart, updateItemQuantity } = useCart();

	const [cart, setCart] = useState(JSON.parse(localStorage.cart));

	const removeFromCart = async (item: ProductItem) => {
		await removeItemFromCart(item);
		setCart(JSON.parse(localStorage.cart));
	}

	const updateQuantity = async (item: ProductItem, quantity: number) => {
		await updateItemQuantity(item, quantity);
		setCart(JSON.parse(localStorage.cart));
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
					<div className="grid grid-cols-5 py-4">
						<p className="col-span-3 text-xs uppercase text-neutral-500">Product</p>
						<p className="text-xs uppercase text-neutral-500">Quantity</p>
						<p className="text-right text-xs uppercase text-neutral-500">Total</p>
					</div>
					<div className="border-y flex flex-col gap-12 py-12">
						{
							cart.map((prod: Array<string>, index: number) => (
								<ProductCartDisplay product={prod} key={index} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
							))
						}
					</div>
				</div>
				<div className="flex justify-end pt-16 pb-8">
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