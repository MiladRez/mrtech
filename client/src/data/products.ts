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
			usd: 199.99
		},
		salePrice: {
			cad: 199.99,
			usd: 149.99,
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
			french: [
				"Les filtres à air intégrés à la sortie avant améliorent le flux d'air et réduisent l'entrée de particules de poussière pour maintenir l'intérieur du boîtier plus propre",
				"L'alimentation ATX (longueur maximale de 210 mm) est efficace, économise de l'énergie et de l'espace, et est compatible avec la plupart des cartes mères modernes",
				"Peut accueillir jusqu'à deux ventilateurs de 140 mm ou deux ventilateurs de 120 mm avec des filtres à poussière amovibles en haut, jusqu'à trois ventilateurs de 120 mm ou deux ventilateurs de 120 mm à l'avant, jusqu'à un ventilateur arrière de 120 mm, et jusqu'à deux ventilateurs de 120 mm au-dessus du cache d'alimentation pour maximiser le refroidissement",
				"Prend en charge jusqu'à des radiateurs de 360 mm pour améliorer le refroidissement de l'intérieur",
				"Un port USB 3.2 Gen 2 de type C, deux ports USB 3.2 Gen 1 de type A standard, un port micro dédié et un port combo micro/casque pour une connectivité facile aux périphériques",
				"Compatible avec les cartes mères E-ATX / ATX / Micro-ATX / Mini-ITX (max 280 mm de large) pour aider à construire un ordinateur sur mesure",
				"16,8 millions de couleurs et une gamme d'effets pour synchroniser le boîtier avec le reste de la station de bataille pour élever votre expérience de jeu à un autre niveau",
				"L'éclairage RGB personnalisable Razer Chroma vous permet de profiter d'une expérience de jeu plus immersive"
			]
		}
	},
	{
		id: "2",
		img: CorsairVengeanceRAM,
		name: "Corsair Vengeance RGB Pro 32GB (2 x 16GB) DDR4 3200MHz Desktop Memory",
		manufacturer: "Corsair",
		price: {
			cad: 119.99,
			usd: 79.99
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
			french: [
				"La vitesse de la mémoire à 3200 MHz booste efficacement les performances du processeur de votre système",
				"La latence CAS de 16 améliore les performances de la RAM",
				"La prise en charge XMP 2.0 permet à la mémoire de s'ajuster automatiquement à la vitesse la plus rapide et sécurisée avec un simple réglage du BIOS",
				"Une bande passante élevée et un temps de réponse rapide garantissent des performances optimales sur les dernières cartes mères Intel DDR4 et AMD",
				"L'éclairage RGB dynamique multi-zones avec 10 LED RGB super-lumineuses par module complète la configuration de votre ordinateur avec un éclairage coloré",
				"La conception sans fil facilite et simplifie l'installation",
				"Le PCB personnalisé offre une qualité de signal améliorée pour d'excellentes performances et stabilité",
				"Un kit de deux modules de mémoire DDR4 de 16 Go améliore les performances de votre système pour un multitâche fluide"
			]
		}
	},
	{
		id: "3",
		img: NVIDIA_RTX_4090,
		name: "NVIDIA GeForce RTX 4090 24GB GDDR6 Video Card",
		manufacturer: "NVIDIA",
		price: {
			cad: 2099.99,
			usd: 1499.99
		},
		salePrice: {
			cad: 1949.99,
			usd: 1299.99
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
			french: [
				"24 Go de mémoire vidéo GDDR6X haute vitesse offrent un rendu de ray tracing et des graphismes alimentés par l'IA pour une expérience de jeu immersive",
				"La vitesse d'horloge principale de 2235 MHz et la vitesse d'horloge boost de 2,52 GHz fournissent la puissance nécessaire pour suivre les jeux les plus intensifs",
				"L'architecture NVIDIA Ada Lovelace avec 16 384 cœurs NVIDIA CUDA, des cœurs de ray tracing dédiés et des cœurs tensor dédiés garantit des visuels époustouflants",
				"L'interface PCI Express 4.0 est rétrocompatible avec PCI Express 3.0 pour une installation rapide et facile",
				"Les technologies NVIDIA DLSS, Game Ready et NVIDIA Studio Drivers, NVIDIA GeForce Experience, NVIDIA Broadcast, NVIDIA G-SYNC, NVIDIA GPU Boost, Microsoft DirectX 12 Ultimate, Vulkan RT APIs, Vulkan 1.3, Open GL 4.6, HDCP 2.3 et DisplayPort 1.4a optimisent la carte graphique pour des performances incroyables",
				"La prise en charge de la HDR 4K 120 Hz, de la HDR 8K 60 Hz et du taux de rafraîchissement variable HDMI 2.1a permet des résolutions vives",
				"Compatible avec les systèmes d'exploitation Windows 11 64 bits (recommandé), Windows 10 64 bits et Linux 64 bits",
			]
		}
	},
	{
		id: "4",
		img: AsusThorPowerSupply,
		name: "Asus ROG Thor Platinum 850W Power Supply",
		manufacturer: "Asus",
		price: {
			cad: 219.99,
			usd: 159.99
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
			french: [
				"L'alimentation ASUS ROG-THOR-850P2-GAMING offre une efficacité 80Plus Platinum",
				"Des mécanismes de protection robustes, notamment la protection contre la surpuissance, la surtension, la sous-tension, les courts-circuits, le surintensité et la surtempérature",
				"Conforme aux normes ROHS, elle fonctionne avec une plage d'entrée CA de 100-240Vac",
				"La tension de sortie CC comprend +3,3V, +5V, +12V, -12V et +5Vsb",
				"Les capacités de charge maximales varient de 20A à 71A, avec une puissance de sortie totale de 850W",
				"Le contenu de l'emballage comprend des câbles, un câble RGB adressable, des accessoires ROG et des manuels d'utilisation",
				"Prise en charge de l'AURA SYNC et de l'ARGB, elle dispose d'un bouton de ventilateur 0dB et détient une certification de niveau sonore Cybenetics de A++"
			]
		}
	},
	{
		id: "5",
		img: AMDRyzen7,
		name: "AMD Ryzen 7 5800X Octa-Core 3.8GHz AM4 Desktop Processor",
		manufacturer: "AMD",
		price: {
			cad: 599.99,
			usd: 449.99
		},
		salePrice: {
			cad: 499.99,
			usd: 349.99
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
			french: [
				"Une vitesse d'horloge de 3,8 GHz peut exécuter des applications gourmandes en ressources sans ralentir",
				"Huit cœurs gèrent habilement les sessions de jeu à haut FPS, le montage vidéo et de nombreux autres programmes intensifs",
				"Une vitesse de bus de 3200 MHz assure une communication rapide entre le CPU et les autres composants de votre PC",
				"32 Mo de cache L3 et 4 Mo de cache L2 disponibles pour répondre aux demandes étendues de multitâche",
				"Conception prête pour la réalité virtuelle vous permet d'utiliser des casques et accessoires de réalité virtuelle (vendus séparément) pour vous plonger dans le cyberespace"
			]
		}
	},
	{
		id: "6",
		img: IntelCoreI9,
		name: "Intel Core i9-14900K Processor",
		manufacturer: "Intel",
		price: {
			cad: 799.99,
			usd: 599.99
		},
		salePrice: {
			cad: 599.99,
			usd: 399.99
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
			french: [
				"Une vitesse de base de 4,4 GHz et une vitesse de boost maximale de 6 GHz garantissent une réactivité et des performances inégalées, même pour les tâches et applications les plus exigeantes",
				"La technologie Intel Turbo Boost Max 3.0 identifie les cœurs les plus rapides du processeur et dirige des charges de travail importantes vers eux pour de meilleures performances",
				"Intel Thermal Velocity Boost offre une vitesse supplémentaire lors du traitement de tâches exigeantes",
				"24 cœurs offrent une puissance de traitement extraordinaire pour gérer des tâches complexes et gourmandes en ressources avec une efficacité remarquable",
				"Le support PCIe 5.0 & 4.0 garantit des taux de transfert de données ultra-rapides pour un jeu fluide et réactif, la création de contenu, et plus encore",
				"Prend en charge à la fois les modules de RAM DDR5 et DDR4 pour s'adapter à un large éventail de besoins informatiques",
				"La compatibilité avec les cartes mères basées sur les chipsets Intel 700 Series et Intel 600 Series assure une intégration transparente dans votre configuration existante",
				"La puissance de base du processeur de 125 W garantit un fonctionnement efficace et fiable même lors de charges de travail importantes"
			]
		}
	},
	{
		id: "7",
		img: ThermaltakeFan,
		name: "Thermaltake UX200 SE 120 mm CPU Air Cooler",
		manufacturer: "Thermaltake",
		price: {
			cad: 49.99,
			usd: 34.99
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
			french: [
				"Profitez d'une expérience d'éclairage RGB vivante avec le UX210, doté de 10 LED adressables haute luminosité avec 16,8 millions de couleurs",
				"Conçu pour se synchroniser avec ASUS Aura Sync, ASRock RGB LED, GIGABYTE RGB Fusion et MSI Mystic Light Sync pour des performances optimales",
				"Assurez un contact parfait avec le CPU et la pâte thermique grâce à la base en cuivre",
				"Les pales du ventilateur sont spécifiquement conçues pour générer un grand volume d'air à travers le dissipateur thermique en aluminium"
			]
		}
	},
	{
		id: "8",
		img: Samsung990proSSD,
		name: "Samsung 990 Pro 2TB NVMe PCI-e Internal Solid State Drive",
		manufacturer: "Samsung",
		price: {
			cad: 199.99,
			usd: 149.99
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
			french: [
				"Le SSD NVMe PCIe 4.0 de 2 To assure un taux de transfert de données efficace - jusqu'à 1400K/1550K IOPS, tandis que les vitesses de lecture/écriture séquentielles atteignent jusqu'à 7450/6900 Mo/s",
				"Une vitesse de lecture séquentielle allant jusqu'à 7450 Mo/s et une vitesse d'écriture jusqu'à 6900 Mo/s garantissent des temps de chargement rapides pour une expérience de jeu fluide",
				"Offre une bande passante et un débit élevés pour vous permettre de repousser les limites du jeu avec des graphismes exigeants et des animations complexes",
				"Le format compact M.2 2280 permet une insertion facile dans les ordinateurs portables et les PC et optimise également l'efficacité énergétique pour un calcul haute vitesse",
				"Le design futuriste du dissipateur thermique mince offre un contrôle thermique stable et un bruit de ventilateur minimal pour les jeux graphiques intensifs, maintenant avec des lumières RGB",
				"Le logiciel Samsung Magician donne accès à des outils conviviaux pour mettre à jour votre disque, surveiller la santé du disque, booster les performances et protéger les données importantes"
			]
		}
	},
	{
		id: "9",
		img: MSI_MicroATX_Motherboard,
		name: "MSI X470 GAMING PLUS MAX ATX AM4 Motherboard",
		manufacturer: "MSI",
		price: {
			cad: 199.99,
			usd: 149.99
		},
		salePrice: {
			cad: 150.00,
			usd: 99.99
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
			french: [
				"Le socket AM4 vous aide à tirer plus de puissance et de performances de votre ordinateur",
				"Le format Micro-ATX économise de l'espace tout en vous permettant d'exploiter pleinement le potentiel de la mémoire et du processeur",
				"Un slot PCI Express X1 et 2 slots PCI Express X16 vous permettent de connecter des composants importants à la carte mère",
				"Le port Wi-Fi 6 et le port Ethernet offrent des provisions fiables pour le réseau filaire ou sans fil",
				"Le port HDMI et le DisplayPort 1.4 vous permettent de connecter des périphériques d'affichage de haute qualité",
				"Quatre ports USB 2.0, six ports USB 3.1/3.2 Gen 2 et 1 port USB de type C vous permettent de connecter divers périphériques",
				"Le design du dissipateur thermique étendu et le M.2 Shield FROZR se combinent pour maintenir les composants à une température de refroidissement idéale"
			]
		}
	},
	{
		id: "10",
		img: AsusMotherboard,
		name: "ASUS ROG Strix Z790-E Gaming WiFi ATX LGA 1700 DDR5 Motherboard for 12/13th Gen Intel CPUs",
		manufacturer: "Asus",
		price: {
			cad: 549.98,
			usd: 409.98
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
			french: [
				"Le socket LGA 1700 convient aux processeurs Intel Core de 12e et 13e génération, Pentium Gold et Celeron",
				"Quatre emplacements DIMM avec architecture en double canal vous permettent d'ajouter jusqu'à 128 Go de RAM DDR5",
				"Le Wi-Fi 6E intégré et l'Ethernet Intel 2,5 Gb avec ASUS LANGuard offrent des performances réseau de qualité gaming avec des vitesses élevées et des latences faibles",
				"Connectivité HDMI 2.1 et DisplayPort 1.4 pour brancher des moniteurs, des téléviseurs, des projecteurs et d'autres périphériques de sortie vidéo",
				"Six ports USB 2.0, 1 port Ethernet, 1 port USB-C 3.2 Gen 2x2 à l'arrière et connecteur frontal (jusqu'à 30 W de puissance de charge), et 11 ports USB 3.2 Gen 1 et Gen 2 supplémentaires offrent une connectivité complète pour de nombreux appareils et accessoires",
				"Le dissipateur thermique VRM, le dissipateur thermique sans ventilateur PCH, le dissipateur thermique M.2 double face, les connecteurs hybrides pour ventilateurs et l'utilitaire Fan Xpert 4 offrent des options efficaces de gestion thermique et de contrôle du refroidissement",
				"Livré avec l'ALC4080 avec amplificateur Savitech SV3H712 ainsi que DTS Sound unbound et Sonic Studio III pour vous offrir une sortie audio riche et haute fidélité",
				"Comprend un logo ROG iridescent, une finition monochrome et un éclairage Aura pour donner à votre configuration un look futuriste et groovy"
			]
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