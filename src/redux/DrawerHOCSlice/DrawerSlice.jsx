import { createSlice } from "@reduxjs/toolkit";

export const DrawerSlice = createSlice({
	name: "drawerSlice",
	initialState: {
		isVisibleDrawer: false,
		Title: "",
	},
	reducers: {
		openVisibleDrawer: (state, action) => {
			const { Title } = action.payload;
			state.isVisibleDrawer = true;
			state.Title = Title;
		},
		closeVisibleDrawer: (state, action) => {
			state.isVisibleDrawer = false;
		},
	},
});

export const { openVisibleDrawer, closeVisibleDrawer } = DrawerSlice.actions;
export default DrawerSlice.reducer;
