/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",
		"node_modules/flowbite-react/lib/esm/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			colors: {
				primary: "#138BFC"
			}
		},
	},
	variants: {
		fill: ['hover', 'focus'],
	},
	plugins: [
		require('flowbite/plugin')
	],
};
