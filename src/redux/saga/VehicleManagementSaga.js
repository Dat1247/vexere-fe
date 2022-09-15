import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { Notification } from "../../components/NotificationComponent/NotificationComponent";
import { VehicleService } from "../../services/VehicleService";
import { closeVisibleDrawer } from "../DrawerHOCSlice/DrawerSlice";
import { closeLoading, openLoading } from "../LoadingSlice/LoadingSlice";
import { getListSeats } from "../SeatManagementSlice/SeatManagementSlice";
import {
	getVehicleDetailCheckout,
	getVehicleList,
	getVehicleTypeList,
} from "../VehicleManagementSlice/VehicleManagementSlice";

export const getAllVehicleAsync = createAction(
	"vehicleManagementSaga/getAllVehicleAsync"
);
export const getVehicleTypeAsync = createAction(
	"vehicleManagementSaga/getVehicleTypeAsync"
);
export const createVehicleAsync = createAction(
	"vehicleManagementSaga/createVehicleAsync"
);
export const deleteVehicleAsync = createAction(
	"vehicleManagementSaga/deleteVehicleAsync"
);
export const updateVehicleAsync = createAction(
	"vehicleManagementSaga/updateVehicleAsync"
);
export const getListSeatsAsync = createAction(
	"vehicleManagementSaga/getListSeatsAsync"
);
export const getVehicleDetailByIdAsync = createAction(
	"vehicleManagementSaga/getVehicleDetailByIdAsync"
);

function* getListVehicleSaga(action) {
	yield put(openLoading());

	try {
		const { data, status } = yield call(() =>
			VehicleService.getVehicleList(action.payload)
		);

		if (status === 200) {
			yield put(getVehicleList(data.data));
			yield put(closeLoading());
		}
	} catch (err) {
		console.log(err);
		yield put(closeLoading());
	}
}

export function* theoDoiGetListVehicleSaga() {
	yield takeLatest(getAllVehicleAsync.type, getListVehicleSaga);
}

function* getListVehicleTypeSaga(action) {
	try {
		const { data, status } = yield call(() =>
			VehicleService.getListVehicleTypes()
		);
		if (status === 200) {
			yield put(getVehicleTypeList(data));
		}
	} catch (err) {
		console.log(err);
	}
}

export function* theoDoiGetListVehicleTypeSaga() {
	yield takeLatest(getVehicleTypeAsync.type, getListVehicleTypeSaga);
}

function* getVehicleByIdSaga(action) {
	try {
		const { data, status } = yield call(() =>
			VehicleService.getVehicleById(action.payload)
		);

		if (status === 200) {
			yield put(getVehicleDetailCheckout(data.data[0]));
		}
	} catch (err) {
		console.log(err);
	}
}

export function* theoDoiGetVehicleByIdSaga() {
	yield takeLatest(getVehicleDetailByIdAsync.type, getVehicleByIdSaga);
}

function* createVehicleSaga(action) {
	yield put(openLoading());

	try {
		const result = yield call(() =>
			VehicleService.createVehicle(action.payload)
		);

		if (result.status === 201) {
			Notification("success", "Create new vehicle successfully!");
			yield put(getAllVehicleAsync());
			yield put(closeLoading());
			yield put(closeVisibleDrawer());
		}
	} catch (err) {
		console.log(err);
		Notification("error", "Create new vehicle failed!", err?.response.data);
		yield put(closeLoading());
	}
}

export function* theoDoiCreateVehicleSaga() {
	yield takeLatest(createVehicleAsync.type, createVehicleSaga);
}

function* deleteVehicleSaga(action) {
	yield put(openLoading());

	try {
		const result = yield call(() =>
			VehicleService.deleteVehicle(action.payload)
		);

		if (result.status === 200) {
			Notification("success", result.data.message);
			yield put(getAllVehicleAsync());
			yield put(closeLoading());
		}
	} catch (err) {
		Notification("error", "Delete vehicle failed!", err?.response.data);
		yield put(closeLoading());
	}
}

export function* theoDoiDeleteVehicleSaga() {
	yield takeLatest(deleteVehicleAsync.type, deleteVehicleSaga);
}

function* updateVehicleSaga(action) {
	const { id, vehicleUpdate } = action.payload;
	yield put(openLoading());
	try {
		const { data, status } = yield call(() =>
			VehicleService.updateVehicle(id, vehicleUpdate)
		);

		if (status === 200) {
			Notification("success", data.message);
			yield put(getAllVehicleAsync());
			yield put(closeLoading());
			yield put(closeVisibleDrawer());
		}
	} catch (err) {
		console.log(err);
		Notification("error", "Delete vehicle failed!", err?.response.data);
		yield put(closeLoading());
	}
}

export function* theoDoiUpdateVehicleSaga() {
	yield takeLatest(updateVehicleAsync.type, updateVehicleSaga);
}

function* getListSeatsSaga(action) {
	try {
		const { data, status } = yield call(() =>
			VehicleService.getListSeat(action.payload)
		);

		if (status === 200) {
			yield put(getListSeats(data));
		}
	} catch (err) {
		console.log(err);
	}
}

export function* theoDoiGetListSeatsSaga() {
	yield takeLatest(getListSeatsAsync.type, getListSeatsSaga);
}
