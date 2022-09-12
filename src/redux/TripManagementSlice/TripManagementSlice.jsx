import { createSlice } from "@reduxjs/toolkit";

export const TripManagementSlice = createSlice({
	name: "tripManagement",
	initialState: {
		listTripSearch: [],
		listTripFilter: [],
		listTrip: [],
		objTripEdit: {},
	},
	reducers: {
		getAllTrips: (state, action) => {
			state.listTrip = action.payload;
		},
		getObjTripEdit: (state, action) => {
			state.objTripEdit = action.payload;
		},
		getSearchTrips: (state, action) => {
			state.listTripSearch = action.payload;
			state.listTripFilter = action.payload;
		},
		getListTripFilter: (state, action) => {
			state.listTripFilter = action.payload;
		},
	},
});

export const {
	getAllTrips,
	getObjTripEdit,
	getSearchTrips,
	getListTripFilter,
} = TripManagementSlice.actions;
export default TripManagementSlice.reducer;
