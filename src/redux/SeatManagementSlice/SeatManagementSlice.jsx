import { createSlice } from "@reduxjs/toolkit";

export const SeatManagementSlice = createSlice({
	name: "seatManagement",
	initialState: {
		listSeats: [],
		listChoosing: [],
		activeTab: 1,
		isBookTicket: false,
	},
	reducers: {
		addSeatToListChoosing: (state, action) => {
			const listChoosingUpdate = state.listChoosing;
			let index = listChoosingUpdate.findIndex(
				(item) => item.id === action.payload.id
			);
			if (index !== -1) {
				listChoosingUpdate.splice(index, 1);
			} else {
				listChoosingUpdate.push(action.payload);
			}
			state.listChoosing = listChoosingUpdate;
		},
		changeTabActive: (state, action) => {
			state.activeTab = action.payload;
		},
		getListSeats: (state, action) => {
			state.listSeats = action.payload;
		},
		resetListChoosing: (state, action) => {
			state.listChoosing = [];
		},
		isBookTicketSuccess: (state, action) => {
			state.isBookTicket = true;
		},
		resetIsBookTicket: (state, action) => {
			state.isBookTicket = false;
		},
	},
});

export const {
	addSeatToListChoosing,
	changeTabActive,
	getListSeats,
	resetListChoosing,
	isBookTicketSuccess,
	resetIsBookTicket,
} = SeatManagementSlice.actions;
export default SeatManagementSlice.reducer;
