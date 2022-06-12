import "./wdyr";
import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { SafeAreaView } from "react-native";
import Router from "./Router";
import { NativeRouter } from "react-router-native";
import { useDeviceContext } from "twrnc";
import tw from "./tailwind";
import ErrorBoundary from "./ui/ErrorBoundary";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			suspense: true,
		},
	},
});

function App() {
	useDeviceContext(tw);
	return (
		<QueryClientProvider client={queryClient}>
			<SafeAreaView>
				<ErrorBoundary>
					<NativeRouter>
						<Router />
					</NativeRouter>
				</ErrorBoundary>
			</SafeAreaView>
		</QueryClientProvider>
	);
}

export default App;
