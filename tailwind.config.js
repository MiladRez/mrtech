/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",
		"node_modules/flowbite-react/lib/esm/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			colors: {
				primary: "#138BFC"
			},
			fontFamily: {
				'sans': ["Sora", "sans-serif"]		
			},
			screens: {
				'big': '900px',
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
