import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { localityText } from "../data/locality";

const LocaleContext = createContext({localLangText: {}, localLang: "english", localCurrency: "cad", updateLocalLangText: Function, updateLocalLang: Function, updateLocalCurrency: Function });

export function LocaleProvider({ children }: { children: ReactNode }) {
	
	const localLangTextFromLocalStorage = localStorage.locality
		? (localStorage.locality === "Canada (FR)"
			? localityText.french
			: localityText.english)
		: localityText.english;
	
	const localLangFromLocalStorage = localStorage.locality
		? (localStorage.locality === "Canada (FR)"
			? "french"
			: "english")
		: "english";
	
	const localCurrencyFromLocalStorage: string = localStorage.locality
		? (localStorage.locality === "USA (EN)"
			? "usd"
			: "cad")
		: "cad";

	const [localLangText, setLocalLangText] = useState(localLangTextFromLocalStorage);
	const [localLang, setLocalLang] = useState(localLangFromLocalStorage);
	const [localCurrency, setLocalCurrency] = useState(localCurrencyFromLocalStorage);

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

		const itemPrice = item.salePrice ? item.salePrice[locale] : item.price[locale];
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

		const itemPrice = item.salePrice ? item.salePrice[locale] : item.price[locale];
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
		setNumOfItemsInCart((numOfItemsInCart + quantityDiff) > 0 ? numOfItemsInCart + quantityDiff : 0);

		const itemPrice = item.salePrice ? item.salePrice[locale] : item.price[locale];
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