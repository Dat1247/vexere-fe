import { createAction } from "@reduxjs/toolkit";
import { call, takeLatest, put } from "redux-saga/effects";
import { Notification } from "../../components/NotificationComponent/NotificationComponent";
import { StationService } from "../../services/StationService";
import { closeVisibleDrawer } from "../DrawerHOCSlice/DrawerSlice";
import { closeLoading, openLoading } from "../LoadingSlice/LoadingSlice";
import {
	getListProvince,
	getListStation,
} from "../StationManagementSlice/StationManagementSlice";

export const listProvinceAsync = createAction(
	"stationManagement/getListProvinceAsync"
);
export const getAllStationAsync = createAction(
	"stationManagement/getAllStationAsync"
);
export const deleteStationAsync = createAction(
	"stationManagement/deleteStationAsync"
);
export const createStationAsync = createAction(
	"stationManagement/createStationAsync"
);
export const editStationAsync = createAction(
	"stationManagement/editStationAsync"
);

function* getListProvinceSaga(action) {
	yield put(openLoading());

	try {
		const { data, status } = yield call(() =>
			StationService.getListProvinceService()
		);

		if (status === 200) {
			yield put(getListProvince(data));
			yield put(closeLoading());
		}
	} catch (err) {
		console.log(err);
		yield put(closeLoading());
	}
}

export function* theoDoiGetListProvince() {
	yield takeLatest(listProvinceAsync.type, getListProvinceSaga);
}

function* getAllStationSaga(action) {
	try {
		const { data, status } = yield call(() =>
			StationService.getAllStation(action.payload)
		);

		if (status === 200) {
			yield put(getListStation(data.data));
		}
	} catch (err) {
		console.log(err);
	}
}

export function* theoDoiGetAllStationSaga() {
	yield takeLatest(getAllStationAsync.type, getAllStationSaga);
}

function* createStationSaga(action) {
	yield put(openLoading());
	try {
		const { data, status } = yield call(() =>
			StationService.createStation(action.payload)
		);
		if (status === 201) {
			Notification("success", data.message);
			yield put(getAllStationAsync());
			yield put(closeLoading());
			yield put(closeVisibleDrawer());
		}
	} catch (err) {
		console.log(err);
		Notification("error", "Create station failed!", err?.response.data);
		yield put(closeLoading());
	}
}

export function* theoDoiCreateStationSaga() {
	yield takeLatest(createStationAsync.type, createStationSaga);
}

function* editStationSaga(action) {
	const editStation = action.payload;
	yield put(openLoading());

	try {
		const { data, status } = yield call(() =>
			StationService.editStation(editStation.id, editStation)
		);

		if (status === 200) {
			Notification("success", data.message);
			yield put(getAllStationAsync());
			yield put(closeLoading());
			yield put(closeVisibleDrawer());
		}
	} catch (err) {
		console.log(err);
		Notification("error", "Edit station failed!", err?.response.data);
		yield put(closeLoading());
	}
}

export function* theoDoiEditStationSaga() {
	yield takeLatest(editStationAsync.type, editStationSaga);
}

function* deleteStationSaga(action) {
	yield put(openLoading());

	try {
		const result = yield call(() =>
			StationService.deleteStation(action.payload)
		);
		if (result.status === 200) {
			Notification("success", "Delete station successfully!");
			yield put(getAllStationAsync());
			yield put(closeLoading());
		}
	} catch (err) {
		console.log(err);
		Notification("error", "Delete station failed!");
		yield put(closeLoading());
	}
}

export function* theoDoiDeleteStationSaga() {
	yield takeLatest(deleteStationAsync.type, deleteStationSaga);
}
