import React from "react";
import Logger from "./utils/Logger";

if (process.env.NODE_ENV === "development" && false) {
	Logger.log("LOADED WDYR FILE");
	const whyDidYouRender = require("@welldone-software/why-did-you-render");
	whyDidYouRender(React, {
		trackAllPureComponents: true,
	});
}
