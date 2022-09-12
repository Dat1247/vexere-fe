import { createAction } from "@reduxjs/toolkit";
import { call, takeLatest, put } from "redux-saga/effects";
import { Notification } from "../../components/NotificationComponent/NotificationComponent";
import { CarCompanyService } from "../../services/CarCompanyService";
import { getListCarCompanies } from "../CarCompanyManagementSlice/CarCompanyManagementSlice";
import { closeVisibleDrawer } from "../DrawerHOCSlice/DrawerSlice";
import { closeLoading, openLoading } from "../LoadingSlice/LoadingSlice";

export const getAllCarCompaniesAsync = createAction(
	"carCompanyManagement/getAllCarCompaniesAsync"
);
export const createCarCompanyAsync = createAction(
	"carCompanyManagement/createCarCompanyAsync"
);
export const updateCarCompanyAsync = createAction(
	"carCompanyManagement/updateCarCompanyAsync"
);
export const deleteCarCompanyAsync = createAction(
	"carCompanyManagement/deleteCarCompanyAsync"
);

function* getAllCarCompaniesSaga(action) {
	yield put(openLoading());
	try {
		const { data, status } = yield call(() =>
			CarCompanyService.getListCarCompany(action.payload)
		);
		if (status === 200) {
			yield put(getListCarCompanies(data.data));
			yield put(closeLoading());
		}
	} catch (err) {
		console.log(err);
		yield put(closeLoading());
	}
}

export function* theoDoiGetAllCarCompaniesSaga() {
	yield takeLatest(getAllCarCompaniesAsync.type, getAllCarCompaniesSaga);
}

function* createCarCompanySaga(action) {
	yield put(openLoading());

	try {
		const result = yield call(() =>
			CarCompanyService.createCarCompany(action.payload)
		);
		if (result.status === 201) {
			Notification("success", "Create car company successfully!");
			yield put(getAllCarCompaniesAsync());
			yield put(closeLoading());
			yield put(closeVisibleDrawer());
		}
	} catch (err) {
		console.log(err);
		Notification("error", "Create car company failed!");
		yield put(closeLoading());
	}
}

export function* theoDoiCreateCarCompanySaga() {
	yield takeLatest(createCarCompanyAsync.type, createCarCompanySaga);
}

function* updateCarCompanySaga(action) {
	const { id, carCompanyEdit } = action.payload;
	yield put(openLoading());

	try {
		const { data, status } = yield call(() =>
			CarCompanyService.updateCarCompany(id, carCompanyEdit)
		);
		if (status === 203) {
			Notification("success", "Update car company successfully!");
			yield put(getAllCarCompaniesAsync());
			yield put(closeLoading());
			yield put(closeVisibleDrawer());
		}
	} catch (err) {
		console.log(err);
		Notification("error", "Update car company failed!");
		yield put(closeLoading());
	}
}

export function* theoDoiUpdateCarCompanySaga() {
	yield takeLatest(updateCarCompanyAsync.type, updateCarCompanySaga);
}

function* deleteCarCompanySaga(action) {
	yield put(openLoading());

	try {
		const result = yield call(() =>
			CarCompanyService.deleteCarCompany(action.payload)
		);
		if (result.status === 200) {
			Notification("success", "Delete car company successfully!");
			yield put(getAllCarCompaniesAsync());
			yield put(closeLoading());
			yield put(closeVisibleDrawer());
		}
	} catch (err) {
		Notification("error", "Delete car company failed!", err?.response.data);
		yield put(closeLoading());
	}
}

export function* theoDoiDeleteCarCompanySaga() {
	yield takeLatest(deleteCarCompanyAsync.type, deleteCarCompanySaga);
}
