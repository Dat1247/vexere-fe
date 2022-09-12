import { createSlice } from "@reduxjs/toolkit";

export const CarCompanyManagementSlice = createSlice({
	name: "carCompanySlice",
	initialState: {
		listCarCompanies: [],
		objCarCompanyEdit: {},
	},
	reducers: {
		getListCarCompanies: (state, action) => {
			state.listCarCompanies = action.payload;
		},
		getObjCarCompanyEdit: (state, action) => {
			state.objCarCompanyEdit = action.payload;
		},
	},
});

export const { getListCarCompanies, getObjCarCompanyEdit } =
	CarCompanyManagementSlice.actions;
export default CarCompanyManagementSlice.reducer;
