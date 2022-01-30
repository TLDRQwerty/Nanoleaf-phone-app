const colors = require("tailwindcss/colors");

module.exports = {
	purge: [],
	theme: {
		extend: {
			colors: {
				primary: colors.fuchsia,
				secondary: colors.gray,
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
