import { BaseService } from "./baseService";

export const CarCompanyService = {
	getListCarCompany: (search) => {
		if (search) {
			return BaseService.get(`car-company?name=${search}`);
		}
		return BaseService.get(`car-company/`);
	},
	createCarCompany: (newCarCompany) => {
		return BaseService.post("car-company/", newCarCompany);
	},
	updateCarCompany: (id, carCompanyUpdate) => {
		return BaseService.put(`car-company/${id}`, carCompanyUpdate);
	},
	deleteCarCompany: (id) => {
		return BaseService.delete(`car-company/${id}`);
	},
};
