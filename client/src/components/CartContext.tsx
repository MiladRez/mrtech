import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { ProductItem } from "../data/products";

type CartContextType = {
	cart: Map<ProductItem, number>,
	numOfItemsInCart: number,
	addItemToCart: Function,
	removeItemFromCart: Function,
	updateItemQuantity: Function,
	clearCart: Function
}

const CartContext = createContext<CartContextType>({cart: new Map(), numOfItemsInCart: 0, addItemToCart: Function, removeItemFromCart: Function, updateItemQuantity: Function, clearCart: Function });

export function CartProvider({ children } : { children: ReactNode }) {
	const [cart, setCart] = useState(new Map<ProductItem, number>(localStorage.cart ? JSON.parse(localStorage.cart) : null));
	const [numOfItemsInCart, setNumOfItemsInCart] = useState(localStorage.numOfItemsInCart ? parseInt(localStorage.numOfItemsInCart) : 0);

	// determines the local currency
	const locale = localStorage.locality ? (localStorage.locality === "USA (EN)" ? "usd" : "cad") : "cad";

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify([...cart]));
	}, [cart]);

	useEffect(() => {
		localStorage.setItem("numOfItemsInCart", numOfItemsInCart.toString());
	}, [numOfItemsInCart]);

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
		setNumOfItemsInCart((numOfItemsInCart + quantityDiff) > 0 ? numOfItemsInCart + quantityDiff : 0);
	}

	const clearCart = () => {
		setCart(new Map());
		setNumOfItemsInCart(0);
		
		localStorage.removeItem("cart");
		localStorage.removeItem("numOfItemsInCart");
		localStorage.removeItem("totalCost");
	}

	return (
		<CartContext.Provider value={{ cart, numOfItemsInCart, addItemToCart, removeItemFromCart, updateItemQuantity, clearCart }}>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	return useContext(CartContext);
}