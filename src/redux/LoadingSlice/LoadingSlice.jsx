import { createSlice } from "@reduxjs/toolkit";

export const LoadingSlice = createSlice({
	name: "loadingSlice",
	initialState: {
		isLoading: false,
		isAfterLogin: false,
		paramLink: "",
	},
	reducers: {
		openLoading: (state, action) => {
			state.isLoading = true;
		},
		closeLoading: (state, action) => {
			state.isLoading = false;
		},
		changeAfterLogin: (state, action) => {
			state.isAfterLogin = true;
		},
		resetAfterLogin: (state, action) => {
			state.isAfterLogin = false;
		},
		setParamLink: (state, action) => {
			state.paramLink = action.payload;
		},
	},
});

export const {
	openLoading,
	closeLoading,
	changeAfterLogin,
	resetAfterLogin,
	setParamLink,
} = LoadingSlice.actions;
export default LoadingSlice.reducer;
