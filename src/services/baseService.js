import Axios from "axios";
import { API_URL, TOKEN } from "../util/config";

class baseService {
	put = (url, data) => {
		return Axios({
			url: `${API_URL}/${url}`,
			method: "PUT",
			data: data,
			headers: {
				token: localStorage.getItem(TOKEN),
				Authorization: "Bearer " + localStorage.getItem(TOKEN),
			},
		});
	};
	post = (url, data) => {
		return Axios({
			url: `${API_URL}/${url}`,
			method: "POST",
			data: data,
			headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
		});
	};
	get = (url) => {
		return Axios({
			url: `${API_URL}/${url}`,
			method: "GET",
			headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
		});
	};
	delete = (url) => {
		return Axios({
			url: `${API_URL}/${url}`,
			method: "DELETE",
			headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
		});
	};
}

export const BaseService = new baseService();
