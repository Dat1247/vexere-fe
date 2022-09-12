import { BaseService } from "./baseService";

export const StationService = {
	getListProvinceService: () => {
		return BaseService.get("stations/province");
	},

	getAllStation: (search) => {
		if (search) {
			return BaseService.get(`stations?name=${search}`);
		}
		return BaseService.get("stations/");
	},

	createStation: (newStation) => {
		return BaseService.post("stations/", newStation);
	},

	editStation: (id, stationEdit) => {
		return BaseService.put(`stations/${id}`, stationEdit);
	},

	deleteStation: (id) => {
		return BaseService.delete(`stations/${id}`);
	},
};
