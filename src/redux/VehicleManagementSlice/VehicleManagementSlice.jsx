import { createSlice } from "@reduxjs/toolkit";

export const VehicleManagementSlice = createSlice({
	name: "vehicleManagement",
	initialState: {
		listVehicle: [],
		listVehicleType: [],
		objVehicleEdit: {},
		vehicleDetail: {},
	},
	reducers: {
		getVehicleList: (state, action) => {
			state.listVehicle = action.payload;
		},
		getVehicleTypeList: (state, action) => {
			state.listVehicleType = action.payload;
		},
		getObjVehicleEdit: (state, action) => {
			state.objVehicleEdit = action.payload;
		},
		getVehicleDetailCheckout: (state, action) => {
			state.vehicleDetail = action.payload;
		},
	},
});

export const {
	getVehicleList,
	getVehicleTypeList,
	getObjVehicleEdit,
	getListSeat,
	getVehicleDetailCheckout,
} = VehicleManagementSlice.actions;

export default VehicleManagementSlice.reducer;
