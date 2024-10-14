import {ProductItem} from "../data/products";
import httpClient from "./httpClient";
import api from "./flaskEndpoint";

export const getTotalCost = async (cart: Map<ProductItem, number>) => {
	let totalCost = 0.00

	const getPrices = () => {
		return Promise.all(
			Array.from(cart.keys()).map(async (prod) => {
				let id = prod.id
				let local_currency = localStorage.locality === "USA (EN)" ? "usd" : "cad"
				let quantity = cart.get(prod)!

				const response = await httpClient.post(`${api}/getPrice`, {id, local_currency})
				return parseFloat(response.data) * quantity;
			})
		)
	}
	const prices = await getPrices();
	
	// add list of all prices
	for (let i = 0; i < prices.length; i++) {
		totalCost += prices[i]
	}

	return totalCost
}