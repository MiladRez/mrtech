import VRHeadset from "../images/vr-headset.jpeg";
import CommunitySTEM from "../images/community-STEM.jpeg";
import IPhone from "../images/iphone.jpeg";

export type Blog = {
	img: File,
	title: string,
	date: string,
	desc: string
}

export const featuredBlogs: Blog[] = [
	{
		img: VRHeadset,
		title: "Best Budget VR Headsets",
		date: "January 6, 2024",
		desc: "The greatest VR gaming headset experiences at affordable prices."
	},
	{
		img: CommunitySTEM,
		title: "Community Partnership Series",
		date: "January 7, 2024",
		desc: "Teaming up with local organizations to create STEM opportunities for underrepresented communities."
	},
	{
		img: IPhone,
		title: "Maximizing Battery Life on iOS 17",
		date: "January 8, 2024",
		desc: "Disable these 2 iOS 17 features to save battery on your iOS device."
	}
]