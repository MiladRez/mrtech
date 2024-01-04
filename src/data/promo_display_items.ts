import USBHub from "../images/usb-hub.png";
import PreBuiltSystem from "../images/pre-built-system.png";

export type PromoDisplayItem = {
	img: File,
	header: string
}

export const item1: PromoDisplayItem = {
	img: USBHub,
	header: "Items Up To 50% Off"
}

export const item2: PromoDisplayItem = {
	img: PreBuiltSystem,
	header: "Pre-Built Systems"
}