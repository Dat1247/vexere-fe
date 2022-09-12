import { createSlice } from "@reduxjs/toolkit";

export const StationManagementSlice = createSlice({
	name: "stationManagement",
	initialState: {
		listProvince: [],
		listStation: [],
		listStationSearch: [],
		stationEdit: {},
	},
	reducers: {
		getListProvince: (state, action) => {
			state.listProvince = action.payload;
		},
		getListStation: (state, action) => {
			state.listStation = action.payload;
			state.listStationSearch = state.listStation;
		},
		getStationEdit: (state, action) => {
			state.stationEdit = action.payload;
		},
	},
});

export const { getListProvince, getListStation, getStationEdit } =
	StationManagementSlice.actions;

export default StationManagementSlice.reducer;
