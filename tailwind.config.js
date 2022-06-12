const colors = require("tailwindcss/colors");

module.exports = {
	purge: [],
	theme: {
		extend: {
			colors: {
				primary: colors.rose,
				secondary: colors.fuchsia,
				"dark-primary": colors.rose,
				"dark-secondary": colors.fuchsia,
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
