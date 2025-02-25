/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				accent: "rgba(56, 141, 168)",
				accentHover: "rgba(40, 127, 153, 1)",
				"dark-purple": "#081A51",
				"light-white": "rgba(255,255,255,0.17)",
			},
			borderRadius: {
				custom: "40px",
			},
		},
		screens: {
			xs: "480px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},
	},
	plugins: [],
}
