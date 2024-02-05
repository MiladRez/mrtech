import USBHub from "../images/usb-hub.png";
import PreBuiltSystem from "../images/pre-built-system.png";

export type PromoDisplayItem = {
	img: File,
	header: {
		english: string,
		french: string
	}
}

export const item1: PromoDisplayItem = {
	img: USBHub,
	header: {
		english: "Items Up To 50% Off",
		french: ""
	}
}

export const item2: PromoDisplayItem = {
	img: PreBuiltSystem,
	header: {
		english: "Pre-Built Systems",
		french: ""
	}
}