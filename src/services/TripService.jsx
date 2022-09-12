import { BaseService } from "./baseService";

export const TripService = {
	searchTrips: (from, to, timeStart, timeEnd) => {
		return BaseService.get(
			`trips/search-trip-from-to-station/${from}&${to}&${timeStart}&${timeEnd}`
		);
	},

	getAllTrips: () => {
		return BaseService.get("trips");
	},

	createNewTrips: (newTrip) => {
		return BaseService.post("trips", newTrip);
	},

	deleteTrip: (id) => {
		return BaseService.delete(`trips/${id}`);
	},

	updateTrip: (id, tripEdit) => {
		return BaseService.put(`trips/${id}`, tripEdit);
	},
};
