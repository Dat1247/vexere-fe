import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { Notification } from "../../components/NotificationComponent/NotificationComponent";
import { TripService } from "../../services/TripService";
import { closeVisibleDrawer } from "../DrawerHOCSlice/DrawerSlice";
import { closeLoading, openLoading } from "../LoadingSlice/LoadingSlice";
import {
	getAllTrips,
	getSearchTrips,
} from "../TripManagementSlice/TripManagementSlice";
import moment from "moment";

export const getAllTripAsync = createAction("tripManagement/getAllTripAsync");
export const createTripAsync = createAction("tripManagement/createTripAsync");
export const deleteTripAsync = createAction("tripManagement/deleteTripAsync");
export const updateTripAsync = createAction("tripManagement/updateTripAsync");
export const searchTripAsync = createAction("tripManagement/searchTripAsync");

function* getAllTripSaga(action) {
	yield put(openLoading());
	try {
		const { data, status } = yield call(() => TripService.getAllTrips());

		if (status === 200) {
			yield put(getAllTrips(data.data));
			yield put(closeLoading());
		}
	} catch (err) {
		console.log(err);
		yield put(closeLoading());
	}
}

export function* theoDoiGetAllTripSaga() {
	yield takeLatest(getAllTripAsync.type, getAllTripSaga);
}

function* createTripSaga(action) {
	yield put(openLoading());
	try {
		const { data, status } = yield call(() =>
			TripService.createNewTrips(action.payload)
		);
		if (status === 201) {
			Notification("success", data.message);
			yield put(getAllTripAsync());
			yield put(closeVisibleDrawer());
			yield put(closeLoading());
		}
	} catch (err) {
		Notification("error", "Create trip failed!");
		yield put(closeLoading());
	}
}

export function* theoDoiCreateTripSaga() {
	yield takeLatest(createTripAsync.type, createTripSaga);
}

function* deleteTripSaga(action) {
	yield put(openLoading());

	try {
		const { data, status } = yield call(() =>
			TripService.deleteTrip(action.payload)
		);

		if (status === 200) {
			Notification("success", data.message);
			yield put(getAllTripAsync());
			yield put(closeLoading());
		}
	} catch (err) {
		Notification("error", "Delete trip failed!", err?.response.data);
		yield put(closeLoading());
	}
}

export function* theoDoiDeleteTripSaga() {
	yield takeLatest(deleteTripAsync.type, deleteTripSaga);
}

function* updateTripSaga(action) {
	const { id, tripUpdate } = action.payload;
	yield put(openLoading());

	try {
		const { data, status } = yield call(() =>
			TripService.updateTrip(id, tripUpdate)
		);

		if (status === 200) {
			Notification("success", data.message);
			yield put(getAllTripAsync());
			yield put(closeLoading());
			yield put(closeVisibleDrawer());
		}
	} catch (err) {
		Notification("error", "Update trip failed!");
		yield put(closeLoading());
	}
}

export function* theoDoiUpdateTripSaga() {
	yield takeLatest(updateTripAsync.type, updateTripSaga);
}

function* searchTripFromToTimeSaga(action) {
	const { fromSta, toSta, startTime } = action.payload;
	try {
		const timeStart = moment(`${startTime} 00:00:00`)
			.utc()
			.format("YYYY-MM-DD HH:mm:ss");
		const timeEnd = moment(`${startTime} 23:59:59`)
			.utc()
			.format("YYYY-MM-DD HH:mm:ss");

		const { data, status } = yield call(() =>
			TripService.searchTrips(fromSta, toSta, timeStart, timeEnd)
		);

		if (status === 200) {
			yield put(getSearchTrips(data.data));
		}
	} catch (err) {
		console.log(err);
	}
}

export function* theoDoiSearchTripFromToTimeSaga() {
	yield takeLatest(searchTripAsync.type, searchTripFromToTimeSaga);
}
