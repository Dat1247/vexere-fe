import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { Notification } from "../../components/NotificationComponent/NotificationComponent";
import { UserService } from "../../services/UserService";
import { TOKEN, USER_LOGIN } from "../../util/config";
import { closeVisibleDrawer } from "../DrawerHOCSlice/DrawerSlice";
import { closeLoading, openLoading } from "../LoadingSlice/LoadingSlice";
import { isBookTicketSuccess } from "../SeatManagementSlice/SeatManagementSlice";
import {
	getListTicketOfUser,
	getListUser,
	getListUserType,
	getUserById,
	login,
	userSignUp,
} from "../UserManagementSlice/UserManagementSlice";

export const loginAsync = createAction("userManagement/loginSaga");
export const signUpAsync = createAction("userManagement/signUpSaga");
export const getAllUsersAsync = createAction("userManagement/getAllUsersSaga");
export const createUserAsync = createAction("userManagement/createUsersSaga");
export const getListUserTypeAsync = createAction(
	"userManagement/getListUserTypeSaga"
);
export const deleteUserAsync = createAction("userManagement/deleteUserSaga");
export const updateUserAsync = createAction("userManagement/updateUserSaga");
export const updateUserProfileAsync = createAction(
	"userManagement/updateUserProfileAsync"
);
export const getUserByIdAsync = createAction("userManagement/getUserByIdAsync");
export const searchTicketByIdAsync = createAction(
	"userManagement/searchTicketByIdAsync"
);
export const datVeAsync = createAction("userManagement/datVeAsync");

function* getListUserTypeSaga(action) {
	try {
		const { data, status } = yield call(() => UserService.getListUserType());

		if (status === 200) {
			yield put(getListUserType(data));
		}
	} catch (err) {
		console.log(err);
	}
}

export function* theoDoiGetListUserType() {
	yield takeLatest(getListUserTypeAsync.type, getListUserTypeSaga);
}

function* signInSaga(action) {
	yield put(openLoading());

	try {
		const { data, status } = yield call(() =>
			UserService.dangNhap(action.payload)
		);
		if (status === 200) {
			const { userLogin } = data;
			localStorage.setItem(USER_LOGIN, JSON.stringify(userLogin));
			localStorage.setItem(TOKEN, userLogin.token);

			Notification("success", "Đăng nhập thành công");
			yield put(login(userLogin));
			yield put(closeLoading());
		}
	} catch (err) {
		console.log(err);
		Notification("error", "Đăng nhập thất bại", err?.response.data);
		yield put(closeLoading());
	}
}

export function* theoDoiSignInSaga() {
	yield takeLatest(loginAsync.type, signInSaga);
}

function* signUpSaga(action) {
	yield put(openLoading());
	try {
		const result = yield call(() => UserService.dangKy(action.payload));

		if (result.status === 201) {
			Notification("success", "Đăng ký thành công");
			yield put(closeLoading());
			yield put(userSignUp());
		}
	} catch (err) {
		console.log(err);
		Notification("error", "Đăng ký thất bại", err?.response.data);
		yield put(closeLoading());
	}
}

export function* theoDoiSignUpSaga() {
	yield takeLatest(signUpAsync.type, signUpSaga);
}

function* createUserSaga(action) {
	yield put(openLoading());
	try {
		const result = yield call(() => UserService.dangKy(action.payload));

		if (result.status === 201) {
			Notification("success", "Thêm người dùng thành công");
			yield put(getAllUsersAsync());
			yield put(closeLoading());
			yield put(closeVisibleDrawer());
		}
	} catch (err) {
		console.log(err);
		Notification("error", "Thêm người dùng thất bại", err?.response.data);
		yield put(closeLoading());
	}
}

export function* theoDoiCreateUserSaga() {
	yield takeLatest(createUserAsync.type, createUserSaga);
}

function* getAllUsersSaga(action) {
	yield put(openLoading());

	try {
		const { data, status } = yield call(() =>
			UserService.getListUsers(action.payload)
		);
		if (status === 200) {
			yield put(getListUser(data));
			yield put(closeLoading());
		}
	} catch (err) {
		console.log(err);
		yield put(closeLoading());
	}
}

export function* theoDoiGetAllUsersSaga() {
	yield takeLatest(getAllUsersAsync.type, getAllUsersSaga);
}

function* deleteUserSaga(action) {
	yield put(openLoading());
	try {
		const result = yield call(() => UserService.deleteUser(action.payload));

		if (result.status === 200) {
			Notification("success", "Xóa người dùng thành công!");
			yield put(getAllUsersAsync());
			yield put(closeLoading());
		}
	} catch (err) {
		Notification("error", "Xóa người dùng thất bại!", err?.response.data);
		yield put(closeLoading());
	}
}

export function* theoDoiDeleteUserSaga() {
	yield takeLatest(deleteUserAsync.type, deleteUserSaga);
}

function* updateUserSaga(action) {
	const { id, formData } = action.payload;

	yield put(openLoading());

	try {
		const { status } = yield call(() => UserService.updateUser(id, formData));
		if (status === 200) {
			Notification("success", "Cập nhật người dùng thành công!");
			yield put(getAllUsersAsync());
			yield put(closeLoading());
			yield put(closeVisibleDrawer());
		}
	} catch (err) {
		console.log(err);
		Notification("error", "Cập nhật người dùng thất bại!");
		yield put(closeLoading());
	}
}

export function* theoDoiUpdateUserSaga() {
	yield takeLatest(updateUserAsync.type, updateUserSaga);
}

function* getUserByIdSaga(action) {
	try {
		const { data, status } = yield call(() =>
			UserService.getUserById(action.payload)
		);

		if (status === 200) {
			yield put(getUserById(data));
		}
	} catch (err) {
		console.log(err);
	}
}

export function* theoDoiGetUserByIdSaga() {
	yield takeLatest(getUserByIdAsync.type, getUserByIdSaga);
}

function* updateUserProfileSaga(action) {
	const { id, formData } = action.payload;
	yield put(openLoading());

	try {
		const result = yield call(() => UserService.editUserProfile(id, formData));
		if (result.status === 203) {
			Notification("success", "User profile updated successfully!");
			yield put(closeLoading());
		}
	} catch (err) {
		console.log(err);
		Notification("error", "Update user profile failed!");
		yield put(closeLoading());
	}
}

export function* theoDoiUpdateUserProfileSaga() {
	yield takeLatest(updateUserProfileAsync.type, updateUserProfileSaga);
}

function* datVeSaga(action) {
	const { tripId, listSeatChoosing } = action.payload;

	yield put(openLoading());
	try {
		const result = yield call(() =>
			UserService.datVe({ tripId, listSeatChoosing })
		);

		if (result.status === 201) {
			Notification("success", "Đặt vé thành công!");
			yield put(isBookTicketSuccess());
			yield put(closeLoading());
		}
	} catch (err) {
		console.log(err);
		Notification("error", "Đặt vé thất bại!");
		yield put(closeLoading());
	}
}

export function* theoDoiDatVeSaga() {
	yield takeLatest(datVeAsync.type, datVeSaga);
}

function* searchTicketByIdSaga(action) {
	try {
		const { data, status } = yield call(() =>
			UserService.getHistoryBookTicket(action.payload)
		);

		if (status === 200) {
			yield put(getListTicketOfUser(data.data));
		}
	} catch (err) {
		console.log(err);
	}
}

export function* theoDoiSearchTicketByIdSaga() {
	yield takeLatest(searchTicketByIdAsync.type, searchTicketByIdSaga);
}
