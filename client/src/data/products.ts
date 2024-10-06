// All products on sale
import RazerTomahawkCase from "../images/razer-tomahawk-case.jpeg";
import AMDRyzen7 from "../images/amd-ryzen-7.jpeg";
import NVIDIA_RTX_4090 from "../images/nvidia-rtx-4090.jpeg";
// Out of stock
import MSI_MicroATX_Motherboard from "../images/msi-micro-atx-motherboard.jpeg";

// All products NOT on sale
import IntelCoreI9 from "../images/intel-core-i9.jpeg";
import CorsairVengeanceRAM from "../images/corsair-vengeance-ram.jpeg";
import AsusThorPowerSupply from "../images/asus-thor-power-supply.jpeg";
import ThermaltakeFan from "../images/thermaltake-fan.jpeg";
import Samsung990proSSD from "../images/samsung-990-pro-ssd.jpeg";
import AsusMotherboard from "../images/asus-motherboard.jpeg";

export type ProductItem = {
	id: string,
	img: File,
	name: string,
	manufacturer: string,
	price: {
		cad: number,
		usd: number
	},
	salePrice?: {
		cad: number,
		usd: number
	},
	stock: number,
	rating: number,
	numOfReviews: number,
	features: {
		english: Array<string>,
		french: Array<string>
	}
}

const products_IDtoImgMap = new Map<number, File>([
	[1, RazerTomahawkCase],
	[2, CorsairVengeanceRAM],
	[3, NVIDIA_RTX_4090],
	[4, AsusThorPowerSupply],
	[5, AMDRyzen7],
	[6, IntelCoreI9],
	[7, ThermaltakeFan],
	[8, Samsung990proSSD],
	[9, MSI_MicroATX_Motherboard],
	[10, AsusMotherboard],
]);

export const getAllProductsFromDB = async (): Promise<ProductItem[]> => {
	const response = await fetch("http://127.0.0.1:5000/products");
	const data = await response.json()

	// iterate through each product in list and add a new field "img" with the corresponding image file saved locally
	data.forEach((product: any) => {
		product["img"] = products_IDtoImgMap.get(parseInt(product.id))
	});

	// console.log("response:", data)
	return data
}

export const getProductsOnSaleFromDB = async (): Promise<ProductItem[]> => {
	const allProducts = await getAllProductsFromDB();
	return allProducts.filter(prod => prod.salePrice);
}

export const getPopularProductsFromDB = async (): Promise<ProductItem[]> => {
	const allProducts = await getAllProductsFromDB();
	return allProducts.filter(prod => !prod.salePrice);
}

export const searchQuerySuggestions: string[] = [
	"razer case",
	"ddr4 ram",
	"ddr5",
	"rtx 4090",
	"rtx 4080",
	"rtx 4070 ti",
	"asus rog power supply",
	"ryzen 7",
	"ryzen 5",
	"intel core i9",
	"intel core i9 14900k",
	"intel core i7",
	"thermaltake cpu cooler",
	"samsung 990 pro",
	"samsung 980 pro",
	"samsung 970 evo plus",
	"msi motherboard",
	"asus rog motherboard"
]

export const sitePages: {english: string, french: string}[] = [
	{
		english: "Home",
		french: "Accueil"
	},
	{
		english: "Shop",
		french: "Magasin"
	},
	{
		english: "Deals",
		french: "Offres"
	},
	{
		english: "Blog",
		french: "Blogue"
	},
	{
		english: "Contact",
		french: "Contact"
	}
]

export function getInLocalLangAndCurrency(localCurrency: string, localLang: string, price: number) {
	return (
		localCurrency === "cad"
			? localLang === "english"
				? price.toLocaleString("en-CA", {style: "currency", currency: "CAD"})
				: price.toLocaleString("fr-CA", {style: "currency", currency: "CAD"})
			: price.toLocaleString("en-US", {style: "currency", currency: "USD"})
	)
}