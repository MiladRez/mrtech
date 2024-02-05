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

export const allProducts: ProductItem[] = [
	{
		id: "1",
		img: RazerTomahawkCase,
		name: "Razer Tomahawk Mid Tower ATX Computer Case",
		manufacturer: "Razer",
		price: {
			cad: 279.99,
			usd: 1
		},
		salePrice: {
			cad: 199.99,
			usd: 1,
		},
		stock: 1347,
		rating: 4.4,
		numOfReviews: 17,
		features: {
			english: [
			"Built-in air filters at the front vent improve the airflow and reduce the intake of dust particles to keep the case's interior cleaner",
			"ATX (Max-Length 210mm) power supply is efficient, saves power and space, and is compatible with most modern motherboards",
			"Accommodates up to two 140mm or two 120mm fans with removable dust filters at the top, up to three 120mm or two 120mm fans at the front, up to a 120mm rear fan up, and up to two 120mm fans above the PSU shroud to maximize the cooling",
			"Supports up to 360mm radiators to improve the cooling of the interior",
			"One USB 3.2 Gen 2 Type-C port, two standard USB 3.2 Gen 1 Type-A ports, a dedicated mic port, and one mic/headphone combo port for easy connectivity to peripherals",
			"Compatible with E-ATX / ATX / Micro-ATX / Mini-ITX (Max 280mm Wide) motherboards that help build a custom computer",
			"16.8 million colours and a suite of effects for syncing the case with the rest of battle station to take your gameplay to another level",
			"Razer Chroma RGB customizable lighting lets you enjoy a more immersive gaming experience"
			],
			french: []
		}
	},
	{
		id: "2",
		img: CorsairVengeanceRAM,
		name: "Corsair Vengeance RGB Pro 32GB (2 x 16GB) DDR4 3200MHz Desktop Memory",
		manufacturer: "Corsair",
		price: {
			cad: 119.99,
			usd: 1
		},
		stock: 491,
		rating: 4.9,
		numOfReviews: 244,
		features: {
			english: [
			"3200MHz memory speed effectively boosts your system's processor performance",
			"16 CAS latency improves the performance of the RAM",
			"XMP 2.0 support allows the memory to automatically adjust to the fastest yet safe speed with just a single BIOS setting",
			"High bandwidth and quick response time ensure optimal performance on the latest Intel DDR4 and AMD motherboards",
			"Dynamic multi-zone RGB lighting featuring 10 super-bright RGB LEDs per module complements your computer setup with colourful lighting",
			"Wire-free design makes installation easy and simple",
			"Custom designed PCB offers enhanced signal quality for excellent performance and stability",
			"Kit of two 16GB DDR4 memory modules enhances your system's performance for smooth multitasking"
			],
			french: []
		}
	},
	{
		id: "3",
		img: NVIDIA_RTX_4090,
		name: "NVIDIA GeForce RTX 4090 24GB GDDR6 Video Card",
		manufacturer: "NVIDIA",
		price: {
			cad: 2099.99,
			usd: 1
		},
		salePrice: {
			cad: 1949.99,
			usd: 1
		},
		stock: 12,
		rating: 4.8,
		numOfReviews: 345,
		features: {
			english: [
			"24GB of high-speed GDDR6X video memory delivers ray tracing and AI-powered graphics for an immersive gaming experience",
			"2235MHz core clock speed and 2.52GHz boost clock speed provide the power you need to keep up with the most intensive games",
			"NVIDIA Ada Lovelace architecture with 16,384 NVIDIA CUDA cores, dedicated ray tracing cores, and dedicated tensor cores ensure stunning visuals",
			"PCI Express 4.0 interface is backward-compatible with PCI Express 3.0 for quick and easy installation",
			"NVIDIA DLSS, Game Ready and NVIDIA Studio Drivers, NVIDIA GeForce Experience, NVIDIA Broadcast, NVIDIA G-SYNC, NVIDIA GPU Boost, Microsoft DirectX 12 Ultimate, Vulkan RT APIs, Vulkan 1.3, Open GL 4.6, HDCP 2.3, and DisplayPort 1.4a technologies optimize the graphics card for incredible performance",
			"Support for 4K 120Hz HDR, 8K 60Hz HDR, and HDMI 2.1a variable refresh rate enables vivid resolutions",
			"Compatible with Windows 11 64-bit (recommended), Windows 10 64-bit, and Linux 64-bit operating systems"
			],
			french: []
		}
	},
	{
		id: "4",
		img: AsusThorPowerSupply,
		name: "Asus ROG Thor Platinum 850W Power Supply",
		manufacturer: "Asus",
		price: {
			cad: 219.99,
			usd: 1
		},
		stock: 74,
		rating: 4.7,
		numOfReviews: 765,
		features: {
			english: [
			"The ASUS ROG-THOR-850P2-GAMING power supply boasts 80Plus Platinum efficiency",
			"Robust protection mechanisms, including Over Power, Over Voltage, Under Voltage, Short Circuit, Over Current, and Over Temperature Protection",
			"Compliant with ROHS standards, it operates with an AC input range of 100-240Vac",
			"The DC output voltage includes +3.3V, +5V, +12V, -12V, and +5Vsb",
			"Maximum load capacities range from 20A to 71A, with a total output power of 850W",
			"Package contents include cables, an addressable RGB cable, ROG accessories, and user manuals",
			"Supporting AURA SYNC and ARGB, it features a 0dB fan button and holds a Cybenetics Noise Level Certification of A++"
			],
			french: []
		}
	},
	{
		id: "5",
		img: AMDRyzen7,
		name: "AMD Ryzen 7 5800X Octa-Core 3.8GHz AM4 Desktop Processor",
		manufacturer: "AMD",
		price: {
			cad: 599.99,
			usd: 1
		},
		salePrice: {
			cad: 499.99,
			usd: 1
		},
		stock: 2,
		rating: 4.3,
		numOfReviews: 5,
		features: {
			english: [
			"3.8GHz clock speed can run resource-intensive applications without slowing down",
			"Eight cores adeptly handle high-FPS gaming sessions, video editing, and many more heavy-duty programs",
			"3200Mhz bus speed ensures rapid communication between the CPU and other components of your PC",
			"32MB of L3 cache and 4MB of L2 cache available to keep up with extensive multi-tasking demands",
			"VR-ready design lets you use virtual reality headsets and accessories (sold separately) to immerse yourself in cyberspace"
			],
			french: []
		}
	},
	{
		id: "6",
		img: IntelCoreI9,
		name: "Intel Core i9-14900K Processor",
		manufacturer: "Intel",
		price: {
			cad: 799.99,
			usd: 1
		},
		salePrice: {
			cad: 599.99,
			usd: 1
		},
		stock: 874,
		rating: 4.6,
		numOfReviews: 801,
		features: {
			english: [
			"Base speed of 4.4GHz and a max boost clock speed of 6GHz ensure unrivaled responsiveness and performance for even the most demanding tasks and applications",
			"Intel Turbo Boost Max Technology 3.0 identifies the fastest cores in the processor and directs significant workloads to them for better performance",
			"Intel Thermal Velocity Boost delivers an extra burst of speed when tackling demanding tasks",
			"24 cores deliver extraordinary processing power for handling complex and resource-intensive tasks with remarkable efficiency",
			"PCIe 5.0 & 4.0 support ensures lightning-fast data transfer rates for smooth and responsive gaming, content creation, and more",
			"Supports both DDR5 and DDR4 RAM modules to adapt to a wide range of computing requirements",
			"Compatibility with Intel 700 Series and Intel 600 Series Chipset based motherboards ensure seamless integration into your existing setup",
			"125W processor base power ensures efficient and reliable operation even during heavy workloads"
			],
			french: []
		}
	},
	{
		id: "7",
		img: ThermaltakeFan,
		name: "Thermaltake UX200 SE 120 mm CPU Air Cooler",
		manufacturer: "Thermaltake",
		price: {
			cad: 49.99,
			usd: 1
		},
		stock: 280,
		rating: 3.5,
		numOfReviews: 641,
		features: {
			english: [
			"Get a vivid RGB lighting experience with the UX210, featuring 10 high-lumen addressable LEDs with 16.8 colours",
			"Designed to synchronize with ASUS Aura Sync, ASRock RGB LED, GIGABYTE RGB Fusion, and MSI Mystic Light Sync for the best performance",
			"Make perfect contact with the CPU and thermal paste with the copper base",
			"The fan blades are specifically designed to generate a large volume of air to pass through the aluminum heatsink"
			],
			french: []
		}
	},
	{
		id: "8",
		img: Samsung990proSSD,
		name: "Samsung 990 Pro 2TB NVMe PCI-e Internal Solid State Drive",
		manufacturer: "Samsung",
		price: {
			cad: 199.99,
			usd: 1
		},
		stock: 53,
		rating: 4.1,
		numOfReviews: 593,
		features: {
			english: [
			"PCIe 4.0 NVMe SSD with 2TB of memory ensures an efficient data transfer rate - up to 1400K/1550K IOPS, while sequential read/write speeds up to 7450/6900 MB/s",
			"Sequential read speed up to 7450MB/s and write speed up to 6900MB/s guarantee rapid load times for a smooth gaming experience",
			"Provides high-performance bandwidth and throughput to let you push beyond the limits in gaming with demanding graphics and complex animation",
			"Compact M.2 2280 form factor allows an easy plugging into laptops and PCs and also optimizes the power efficiency for high-speed computing",
			"The slim heatsink’s futuristic design offers stable heat control and minimal fan noise for heavy-graphic gaming, now with RGB lights",
			"Samsung Magician software opens access to user-friendly tools to update your drive, monitors the drive health, boosts the performance, and protects important data"
			],
			french: []
		}
	},
	{
		id: "9",
		img: MSI_MicroATX_Motherboard,
		name: "MSI X470 GAMING PLUS MAX ATX AM4 Motherboard",
		manufacturer: "MSI",
		price: {
			cad: 199.99,
			usd: 1
		},
		salePrice: {
			cad: 150.00,
			usd: 1
		},
		stock: 0,
		rating: 5.0,
		numOfReviews: 972,
		features: {
			english: [
			"AM4 socket helps you to extract more power and performance from your computer",
			"Micro-ATX form factor saves space, while allowing you to utilize the maximum potential of the memory and CPU",
			"One PCI Express X1 slot and 2 PCI Express X16 slots allows you to connect important components to the motherboard",
			"Wi-Fi 6 and Ethernet port provides reliable provisions for wired or wireless networking",
			"HDMI port and DisplayPort 1.4 lets you connect high quality display devices",
			"Four USB 2.0 ports, six USB 3.1/3.2 Gen 2 ports and 1 USB Type C port allows you to connect various peripheral devices",
			"Extended heatsink design and M.2 Shield FROZR combine to keep the components at ideal cooling temperature"
			],
			french: []
		}
	},
	{
		id: "10",
		img: AsusMotherboard,
		name: "ASUS ROG Strix Z790-E Gaming WiFi ATX LGA 1700 DDR5 Motherboard for 12/13th Gen Intel CPUs",
		manufacturer: "Asus",
		price: {
			cad: 549.98,
			usd: 1
		},
		stock: 902,
		rating: 4.5,
		numOfReviews: 188,
		features: {
			english: [
			"LGA 1700 socket is suitable for the Intel Core 12th and 13th generation, Pentium Gold, and Celeron processors",
			"Four DIMM slots with dual channel architecture let you add up to 128GB of DDR5 RAM",
			"Onboard Wi-Fi 6E and Intel 2.5Gb Ethernet with ASUS LANGuard provide gaming-grade network performance with high speeds and low latencies",
			"HDMI 2.1 and DisplayPort 1.4 connectivity for plugging in monitors, TVs, projectors, and other video output devices",
			"Six USB 2.0 ports, 1 Ethernet port, 1 USB-C 3.2 Gen 2x2 rear I/O port and front-panel connector (up to 30W power delivery), and 11 additional USB 3.2 Gen 1 and Gen 2 ports provide comprehensive connectivity for many devices and accessories",
			"VRM heatsink, PCH fanless heatsink, double-sided M.2 heatsink, hybrid fan headers, and Fan Xpert 4 utility efficient thermal management and cooling control options",
			"Comes with ALC4080 with Savitech SV3H712 amplifier along with DTS Sound unbound and Sonic Studio III to give you rich and high-fidelity audio output",
			"Includes iridescent ROG logo, monochrome finish, and Aura lighting to give your rig a groovy futuristic look"
			],
			french: []
		}
	}
]

export const productsOnSale: ProductItem[] = allProducts.filter((prod) => prod.salePrice);
export const popularProducts: ProductItem[] = allProducts.filter((prod) => !prod.salePrice);

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
		french: ""
	},
	{
		english: "Shop",
		french: ""
	},
	{
		english: "Deals",
		french: ""
	},
	{
		english: "Blog",
		french: ""
	},
	{
		english: "Contact",
		french: ""
	}
]