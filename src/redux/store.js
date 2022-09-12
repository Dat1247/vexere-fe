import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/couterSlice";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./saga/rootSaga";
import userManagementReducer from "./UserManagementSlice/UserManagementSlice.jsx";
import stationManagementReducer from "./StationManagementSlice/StationManagementSlice.jsx";
import seatManagementReducer from "./SeatManagementSlice/SeatManagementSlice.jsx";
import tripManagementReducer from "./TripManagementSlice/TripManagementSlice.jsx";
import drawerHOCReducer from "./DrawerHOCSlice/DrawerSlice.jsx";
import loadingSliceReducer from "./LoadingSlice/LoadingSlice.jsx";
import carCompanyReducer from "./CarCompanyManagementSlice/CarCompanyManagementSlice.jsx";
import vehicleManagementReducer from "./VehicleManagementSlice/VehicleManagementSlice.jsx";
import { refHandler } from "./refHandler";

const sagaMiddleware = createSagaMiddleware();
export default configureStore({
	reducer: {
		counter: counterReducer,
		drawerHOC: drawerHOCReducer,
		userManagement: userManagementReducer,
		stationManagement: stationManagementReducer,
		seatManagement: seatManagementReducer,
		tripManagement: tripManagementReducer,
		loadingSlice: loadingSliceReducer,
		carCompanyManagement: carCompanyReducer,
		vehicleManagement: vehicleManagementReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(sagaMiddleware, refHandler),
});

sagaMiddleware.run(rootSaga);
