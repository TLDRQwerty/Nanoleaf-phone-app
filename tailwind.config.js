const colors = require("tailwindcss/colors");

module.exports = {
	purge: [],
	theme: {
		extend: {
			colors: {
				gray: colors.gray,
				primary: colors.indigo,
				secondary: colors.gray,
				light: colors.black,
				dark: colors.white,
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
