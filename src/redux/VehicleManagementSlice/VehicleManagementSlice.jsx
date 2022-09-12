import { createSlice } from "@reduxjs/toolkit";

export const VehicleManagementSlice = createSlice({
	name: "vehicleManagement",
	initialState: {
		listVehicle: [],
		listVehicleType: [],
		objVehicleEdit: {},
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
	},
});

export const {
	getVehicleList,
	getVehicleTypeList,
	getObjVehicleEdit,
	getListSeat,
} = VehicleManagementSlice.actions;

export default VehicleManagementSlice.reducer;
