const colors = require("tailwindcss/colors");

module.exports = {
	purge: [],
	theme: {
		extend: {
			colors: {
				primary: colors.fuchsia,
				secondary: colors.gray,
				'dark-primary': colors.gray,
				'dark-secondary': colors.blue,
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
