import RazerTomahawkCase from "../images/razer-tomahawk-case.jpeg";
import AMDRyzen7 from "../images/amd-ryzen-7.jpeg";
import NVIDIA_RTX_4090 from "../images/nvidia-rtx-4090.jpeg";
import MSI_MicroATX_Motherboard from "../images/msi-micro-atx-motherboard.jpeg";

import CorsairVengeanceRAM from "../images/corsair-vengeance-ram.jpeg";
import AsusThorPowerSupply from "../images/asus-thor-power-supply.jpeg";
import ThermaltakeFan from "../images/thermaltake-fan.jpeg";
import Samsung990proSSD from "../images/samsung-990-pro-ssd.jpeg";

export type ProductItem = {
	img: File,
	sale: boolean,
	name: string,
	manufacturer: string,
	price: string,
	salePrice?: string,
}

export const productsOnSale: ProductItem[] = [
	{
		img: RazerTomahawkCase,
		sale: true,
		name: "Razer Tomahawk Mid Tower ATX Computer Case",
		manufacturer: "Razer",
		price: "$279.99 CAD",
		salePrice: "$199.99 CAD"
	},
	{
		img: AMDRyzen7,
		sale: true,
		name: "AMD Ryzen 7 5800X Octa-Core 3.8GHz AM4 Desktop Processor",
		manufacturer: "AMD",
		price: "$599.99 CAD",
		salePrice: "$499.99 CAD"
	},
	{
		img: NVIDIA_RTX_4090,
		sale: true,
		name: "NVIDIA GeForce RTX 4090 24GB GDDR6 Video Card",
		manufacturer: "NVIDIA",
		price: "$2,099.99 CAD",
		salePrice: "$1,949.99 CAD"
	},
	{
		img: MSI_MicroATX_Motherboard,
		sale: true,
		name: "MSI X470 GAMING PLUS MAX ATX AM4 Motherboard",
		manufacturer: "MSI",
		price: "$199.99 CAD",
		salePrice: "$150.00 CAD"
	}
]

export const popularProducts: ProductItem[] = [
	{
		img: CorsairVengeanceRAM,
		sale: false,
		name: "Corsair Vengeance RGB Pro 32GB (2 x 16GB) DDR4 3200MHz Desktop Memory",
		manufacturer: "Corsair",
		price: "$119.99 CAD",
	},
	{
		img: AsusThorPowerSupply,
		sale: false,
		name: "Asus ROG Thor Platinum 850W Power Supply",
		manufacturer: "Asus",
		price: "$219.99 CAD",
	},
	{
		img: ThermaltakeFan,
		sale: false,
		name: "Thermaltake UX200 SE 120 mm CPU Air Cooler",
		manufacturer: "Thermaltake",
		price: "$49.99 CAD",
	},
	{
		img: Samsung990proSSD,
		sale: false,
		name: "Samsung 990 Pro 2TB NVMe PCI-e Internal Solid State Drive",
		manufacturer: "Samsung",
		price: "$199.99 CAD",
	},
]