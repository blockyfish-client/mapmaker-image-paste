/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			backgroundColor: "#1f2937"
		},
		colors: {
			"background": "#181f2a",
			"surface-0": "#19212c",
			"surface-1": "#1f2937",
			"primary-text": "#ffffff",
			"secondary-text": "#abc",
			"link-text": "#92c5fd",
			"error-text": "#f56c6c",
			"success-text": "#48bb78",
			"warning-text": "#f98f16",
			"border-0": "#232d3b",
			"border-1": "#374151",
			"highlight": "rgba(138,180,248,0.24)",

			"blue-0": "#6366f1",
			"blue-1": "#4f46e5"
		},
		screens: {
			sm: "480px",
			md: "768px",
			lg: "976px",
			xl: "1440px"
		}
	},
	plugins: []
};
