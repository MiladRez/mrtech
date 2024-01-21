import RazerTomahawkCase from "../images/razer-tomahawk-case.jpeg";
import AMDRyzen7 from "../images/amd-ryzen-7.jpeg";
import NVIDIA_RTX_4090 from "../images/nvidia-rtx-4090.jpeg";
import MSI_MicroATX_Motherboard from "../images/msi-micro-atx-motherboard.jpeg";

import CorsairVengeanceRAM from "../images/corsair-vengeance-ram.jpeg";
import AsusThorPowerSupply from "../images/asus-thor-power-supply.jpeg";
import ThermaltakeFan from "../images/thermaltake-fan.jpeg";
import Samsung990proSSD from "../images/samsung-990-pro-ssd.jpeg";

import IntelCoreI9 from "../images/intel-core-i9.jpeg";
import AsusMotherboard from "../images/asus-motherboard.jpeg";

export type ProductItem = {
	id: string,
	img: File,
	sale: boolean,
	name: string,
	manufacturer: string,
	price: number,
	salePrice?: number,
}

export const allProducts: ProductItem[] = [
	{
		id: "1",
		img: RazerTomahawkCase,
		sale: true,
		name: "Razer Tomahawk Mid Tower ATX Computer Case",
		manufacturer: "Razer",
		price: 279.99,
		salePrice: 199.99
	},
	{
		id: "2",
		img: CorsairVengeanceRAM,
		sale: false,
		name: "Corsair Vengeance RGB Pro 32GB (2 x 16GB) DDR4 3200MHz Desktop Memory",
		manufacturer: "Corsair",
		price: 119.99,
	},
	{
		id: "3",
		img: NVIDIA_RTX_4090,
		sale: true,
		name: "NVIDIA GeForce RTX 4090 24GB GDDR6 Video Card",
		manufacturer: "NVIDIA",
		price: 2099.99,
		salePrice: 1949.99
	},
	{
		id: "4",
		img: AsusThorPowerSupply,
		sale: false,
		name: "Asus ROG Thor Platinum 850W Power Supply",
		manufacturer: "Asus",
		price: 219.99,
	},
	{
		id: "5",
		img: AMDRyzen7,
		sale: true,
		name: "AMD Ryzen 7 5800X Octa-Core 3.8GHz AM4 Desktop Processor",
		manufacturer: "AMD",
		price: 599.99,
		salePrice: 499.99
	},
	{
		id: "6",
		img: IntelCoreI9,
		sale: true,
		name: "Intel Core i9-14900K Processor",
		manufacturer: "Intel",
		price: 799.99,
		salePrice: 599.99
	},
	{
		id: "7",
		img: ThermaltakeFan,
		sale: false,
		name: "Thermaltake UX200 SE 120 mm CPU Air Cooler",
		manufacturer: "Thermaltake",
		price: 49.99,
	},
	{
		id: "8",
		img: Samsung990proSSD,
		sale: false,
		name: "Samsung 990 Pro 2TB NVMe PCI-e Internal Solid State Drive",
		manufacturer: "Samsung",
		price: 199.99,
	},
	{
		id: "9",
		img: MSI_MicroATX_Motherboard,
		sale: true,
		name: "MSI X470 GAMING PLUS MAX ATX AM4 Motherboard",
		manufacturer: "MSI",
		price: 199.99,
		salePrice: 150.00
	},
	{
		id: "10",
		img: AsusMotherboard,
		sale: false,
		name: "ASUS ROG Strix Z790-E Gaming WiFi ATX LGA 1700 DDR5 Motherboard for 12/13th Gen Intel CPUs",
		manufacturer: "Asus",
		price: 549.98
	}
]

export const productsOnSale: ProductItem[] = [
	{
		id: "1",
		img: RazerTomahawkCase,
		sale: true,
		name: "Razer Tomahawk Mid Tower ATX Computer Case",
		manufacturer: "Razer",
		price: 279.99,
		salePrice: 199.99
	},
	{
		id: "5",
		img: AMDRyzen7,
		sale: true,
		name: "AMD Ryzen 7 5800X Octa-Core 3.8GHz AM4 Desktop Processor",
		manufacturer: "AMD",
		price: 599.99,
		salePrice: 499.99
	},
	{
		id: "3",
		img: NVIDIA_RTX_4090,
		sale: true,
		name: "NVIDIA GeForce RTX 4090 24GB GDDR6 Video Card",
		manufacturer: "NVIDIA",
		price: 2099.99,
		salePrice: 1949.99
	},
	{
		id: "9",
		img: MSI_MicroATX_Motherboard,
		sale: true,
		name: "MSI X470 GAMING PLUS MAX ATX AM4 Motherboard",
		manufacturer: "MSI",
		price: 199.99,
		salePrice: 150.00
	}
]

export const popularProducts: ProductItem[] = [
	{
		id: "2",
		img: CorsairVengeanceRAM,
		sale: false,
		name: "Corsair Vengeance RGB Pro 32GB (2 x 16GB) DDR4 3200MHz Desktop Memory",
		manufacturer: "Corsair",
		price: 119.99,
	},
	{
		id: "4",
		img: AsusThorPowerSupply,
		sale: false,
		name: "Asus ROG Thor Platinum 850W Power Supply",
		manufacturer: "Asus",
		price: 219.99,
	},
	{
		id: "7",
		img: ThermaltakeFan,
		sale: false,
		name: "Thermaltake UX200 SE 120 mm CPU Air Cooler",
		manufacturer: "Thermaltake",
		price: 49.99,
	},
	{
		id: "8",
		img: Samsung990proSSD,
		sale: false,
		name: "Samsung 990 Pro 2TB NVMe PCI-e Internal Solid State Drive",
		manufacturer: "Samsung",
		price: 199.99,
	},
]