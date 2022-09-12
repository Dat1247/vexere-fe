import { BaseService } from "./baseService";

export const UserService = {
	getListUserType: () => {
		return BaseService.get(`users/get-type-user`);
	},
	dangNhap: (user) => {
		return BaseService.post(`users/login`, user);
	},
	dangKy: (user) => {
		return BaseService.post(`users/register`, user);
	},
	getListUsers: (search) => {
		if (search) {
			return BaseService.get(`users/get-list-user?name=${search}`);
		}
		return BaseService.get(`users/get-list-user`);
	},
	updateUser: (id, userUpdate) => {
		return BaseService.put(`users/${id}`, userUpdate);
	},
	deleteUser: (id) => {
		return BaseService.delete(`users/${id}`);
	},
	editUserProfile: (id, userEdit) => {
		return BaseService.put(`users/update-profile/${id}`, userEdit);
	},
	getUserById: (id) => {
		return BaseService.get(`users/${id}`);
	},

	datVe: (objDatVe) => {
		return BaseService.post(`seats/dat-ve`, objDatVe);
	},

	getHistoryBookTicket: (id) => {
		return BaseService.get(`users/search-ticket/${id}`);
	},
};
