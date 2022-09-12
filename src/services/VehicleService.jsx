import { BaseService } from "./baseService";

export const VehicleService = {
	getVehicleList: (search) => {
		if (search) {
			return BaseService.get(`vehicles/getVehicleList?search=${search}`);
		}
		return BaseService.get(`vehicles/getVehicleList`);
	},

	getListVehicleTypes: () => {
		return BaseService.get(`vehicles/vehicletypes`);
	},

	createVehicle: (newVehicle) => {
		return BaseService.post(`vehicles/create-vehicle-and-seat`, newVehicle);
	},

	deleteVehicle: (id) => {
		return BaseService.delete(`vehicles/${id}`);
	},

	updateVehicle: (id, vehicleUpdate) => {
		return BaseService.put(`vehicles/${id}`, vehicleUpdate);
	},

	getListSeat: (id) => {
		return BaseService.get(`seats/list-seat/${id}`);
	},
};
