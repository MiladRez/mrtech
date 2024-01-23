import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { ProductItem } from "../data/products";

type CartContextType = {
	cart: Map<ProductItem, number>,
	numOfItemsInCart: number,
	totalCost: number,
	addItemToCart: Function,
	removeItemFromCart: Function,
	updateItemQuantity: Function
}

const CartContext = createContext<CartContextType>({cart: new Map(), numOfItemsInCart: 0, totalCost: 0, addItemToCart: Function, removeItemFromCart: Function, updateItemQuantity: Function });

export function CartProvider({ children } : { children: ReactNode }) {
	const [cart, setCart] = useState(new Map<ProductItem, number>(localStorage.cart ? JSON.parse(localStorage.cart) : null));
	const [numOfItemsInCart, setNumOfItemsInCart] = useState(localStorage.numOfItemsInCart ? parseInt(localStorage.numOfItemsInCart) : 0);
	const [totalCost, setTotalCost] = useState(localStorage.totalCost ? parseFloat(parseFloat(localStorage.totalCost).toFixed(2)) : 0.00);

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify([...cart]));
	}, [cart]);

	useEffect(() => {
		localStorage.setItem("numOfItemsInCart", numOfItemsInCart.toString());
	}, [numOfItemsInCart]);

	useEffect(() => {
		localStorage.setItem("totalCost", totalCost.toFixed(2));
	}, [totalCost]);

	const addItemToCart = (item: ProductItem) => {
		// check if item exists in cart
		// if it does, increment quantity by 1
		let itemExists = false;
		Array.from(cart.keys()).map(k => {
			if (k.id === item.id) {
				setCart(new Map(cart.set(k, cart.get(k)! + 1)))
				itemExists = true
			}
		});

		// if item is not already in cart, add item as new addition
		if (!itemExists) {
			setCart(new Map(cart.set(item, 1)))
		}

		setNumOfItemsInCart(numOfItemsInCart + 1);

		let itemPrice = item.sale ? item.salePrice! : item.price;
		setTotalCost(totalCost + itemPrice);
	}

	const removeItemFromCart = (item: ProductItem) => {
		let removedItemCount = 0;
		Array.from(cart.keys()).map(k => {
			if (k.id === item.id) {
				removedItemCount = cart.get(k)!;
				cart.delete(k);
			}
		})
		setCart(new Map(cart))
		setNumOfItemsInCart((numOfItemsInCart - removedItemCount) > 0 ? numOfItemsInCart - removedItemCount : 0);

		let itemPrice = item.sale ? item.salePrice! : item.price;
		setTotalCost(totalCost - (itemPrice * removedItemCount));

	}

	const updateItemQuantity = (item: ProductItem, quantity: number) => {
		let origQuantity = 0;
		Array.from(cart.keys()).map(k => {
			if (k.id === item.id) {
				origQuantity = cart.get(k)!;
				setCart(new Map(cart.set(k, quantity)))
			}
		})
		const quantityDiff = quantity - origQuantity;
		console.log(`quantity: ${quantity} - origQuantity: ${origQuantity}`);
		setNumOfItemsInCart((numOfItemsInCart + quantityDiff) > 0 ? numOfItemsInCart + quantityDiff : 0);

		let itemPrice = item.sale ? item.salePrice! : item.price;
		setTotalCost(totalCost + (itemPrice * quantityDiff));
	}

	return (
		<CartContext.Provider value={{ cart, numOfItemsInCart, totalCost, addItemToCart, removeItemFromCart, updateItemQuantity }}>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	return useContext(CartContext);
}