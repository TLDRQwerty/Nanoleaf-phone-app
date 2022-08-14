import {NavigationContainer} from "@react-navigation/native";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React from "react";
import {useDeviceContext} from "twrnc";
import Navigations from "~/Navigations";
import tw from "~/tailwind";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			suspense: true,
		},
	},
});

const App = () => {
	useDeviceContext(tw);
	return (
		<QueryClientProvider client={queryClient}>
			<NavigationContainer>
				<Navigations />
			</NavigationContainer>
		</QueryClientProvider>
	);
};

export default App;
