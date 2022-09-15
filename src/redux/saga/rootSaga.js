import { all } from "redux-saga/effects";
import * as UserManagementSaga from "./UserManagementSaga";
import * as StationManagementSaga from "./StationManagementSaga.jsx";
import * as TripManagementSaga from "./TripManagementSaga.jsx";
import * as CarCompanyManagementSaga from "./CarCompanyManagementSaga.jsx";
import * as VehicleManagementSaga from "./VehicleManagementSaga";

export function* rootSaga() {
	yield all([
		UserManagementSaga.theoDoiSignInSaga(),
		UserManagementSaga.theoDoiSignUpSaga(),
		UserManagementSaga.theoDoiGetAllUsersSaga(),
		UserManagementSaga.theoDoiGetListUserType(),
		UserManagementSaga.theoDoiCreateUserSaga(),
		UserManagementSaga.theoDoiDeleteUserSaga(),
		UserManagementSaga.theoDoiUpdateUserSaga(),
		UserManagementSaga.theoDoiUpdateUserProfileSaga(),
		UserManagementSaga.theoDoiGetUserByIdSaga(),
		UserManagementSaga.theoDoiDatVeSaga(),
		UserManagementSaga.theoDoiSearchTicketByIdSaga(),

		StationManagementSaga.theoDoiGetListProvince(),
		StationManagementSaga.theoDoiGetAllStationSaga(),
		StationManagementSaga.theoDoiDeleteStationSaga(),
		StationManagementSaga.theoDoiCreateStationSaga(),
		StationManagementSaga.theoDoiEditStationSaga(),

		TripManagementSaga.theoDoiGetAllTripSaga(),
		TripManagementSaga.theoDoiCreateTripSaga(),
		TripManagementSaga.theoDoiDeleteTripSaga(),
		TripManagementSaga.theoDoiUpdateTripSaga(),
		TripManagementSaga.theoDoiSearchTripFromToTimeSaga(),

		CarCompanyManagementSaga.theoDoiGetAllCarCompaniesSaga(),
		CarCompanyManagementSaga.theoDoiCreateCarCompanySaga(),
		CarCompanyManagementSaga.theoDoiUpdateCarCompanySaga(),
		CarCompanyManagementSaga.theoDoiDeleteCarCompanySaga(),

		VehicleManagementSaga.theoDoiGetListVehicleSaga(),
		VehicleManagementSaga.theoDoiGetListVehicleTypeSaga(),
		VehicleManagementSaga.theoDoiGetVehicleByIdSaga(),
		VehicleManagementSaga.theoDoiCreateVehicleSaga(),
		VehicleManagementSaga.theoDoiDeleteVehicleSaga(),
		VehicleManagementSaga.theoDoiUpdateVehicleSaga(),
		VehicleManagementSaga.theoDoiGetListSeatsSaga(),
	]);
}
