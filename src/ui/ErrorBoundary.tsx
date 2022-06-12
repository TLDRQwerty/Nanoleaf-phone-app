import React, { createContext, Dispatch, ReactNode, useCallback, useContext, useReducer } from "react";
import { View } from "react-native";
import tw from "../tailwind";
import Alert from "./Alert";
import Pressable from "./Pressable";
import Text from "./Text";

interface State {
	errors: Array<ErrorType>;
}

type ErrorType = { title: string; description?: ReactNode };

enum ActionTypes {
	AddError,
	DismissError,
	ClearErrors,
}

type Actions =
	| { type: ActionTypes.AddError; error: ErrorType }
	| { type: ActionTypes.DismissError; index: number }
	| { type: ActionTypes.ClearErrors };

const reducers: { [T in ActionTypes]: (State: State, action: Extract<Actions, { type: T }>) => State } = {
	[ActionTypes.AddError]: (state, action) => ({ ...state, errors: [...state.errors, action.error] }),
	[ActionTypes.DismissError]: (state, action) => ({
		...state,
		errors: state.errors.filter((_, idx) => action.index !== idx),
	}),
	[ActionTypes.ClearErrors]: (state, action) => ({ ...state, errors: [] }),
};

const ErrorContext = createContext<null | [State, Dispatch<Actions>]>(null);

function useErrorContext() {
	const context = useContext(ErrorContext);

	if (context == null) {
		throw Error("Error context not found");
	}

	return context;
}

function ErrorBoundary({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer((state: State, action: Actions) => reducers[action.type](state, action), {
		errors: [],
	});
	return <ErrorContext.Provider value={[state, dispatch]}>{React.useMemo(() => children, [])}</ErrorContext.Provider>;
}

function Errors() {
	const [{ errors }] = useErrorContext();
	if (errors.length === 0) {
		return null;
	}
	return (
		<View>
			<ErrorWrapper index={0} title={errors[0].title} description={errors[0].description} />
		</View>
	);
}

function ErrorWrapper({ index, title, description }: { index: number } & ErrorType) {
	const [{ errors }, dispatch] = useErrorContext();
	const handlePress = () => {
		dispatch({ type: ActionTypes.DismissError, index });
	};
	const handleLongPress = () => {
		dispatch({ type: ActionTypes.ClearErrors });
	};
	return (
		<Pressable type="none" onPress={handlePress} onLongPress={handleLongPress}>
			<Alert type="error">
				<Alert.Title>
					<View style={tw`flex-row justify-between`}>
						<Text style={tw.style(Alert.title({ type: "error" }))}>{title}</Text>
						{errors.length - 1 > 0 && (
							<Text style={tw.style(Alert.title({ type: "error" }))}>+ {errors.length - 1} more</Text>
						)}
					</View>
				</Alert.Title>
				<Alert.Description>
					<Text style={tw.style(Alert.description({ type: "error" }))}>{description}</Text>
				</Alert.Description>
			</Alert>
		</Pressable>
	);
}

function useError() {
	const [, dispatch] = useErrorContext();
	return useCallback((error: ErrorType) => {
		return dispatch({ type: ActionTypes.AddError, error });
	}, []);
}

export { useError };
export default Object.assign(ErrorBoundary, { Errors });
