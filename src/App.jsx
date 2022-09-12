import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import { UserTemplate } from "./templates/UserTemplate/UserTemplate";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import SearchTrip from "./pages/SearchTrip/SearchTrip";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import Checkout from "./pages/Checkout/Checkout";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import UsersManagement from "./pages/Admin/UsersManagement/UsersManagement";
import StationsManagement from "./pages/Admin/StationsManagement/StationsManagement";
import TripsManagement from "./pages/Admin/TripsManagement/TripsManagement";
import DrawerHOC from "./HOC/DrawerHOC/DrawerHOC";
import LoadingComponent from "./components/LoadingComponent/LoadingComponent";
import Profile from "./pages/Profile/Profile";
import CarCompanyManagement from "./pages/Admin/CarCompanyManagement/CarCompanyManagement";
import VehicleManagement from "./pages/Admin/VehicleManagement/VehicleManagement";

function App() {
	return (
		<BrowserRouter>
			<LoadingComponent />
			<DrawerHOC />
			<Routes>
				<Route path='/' element={<HomeTemplate Component={Home} />} />
				<Route path='/home' element={<HomeTemplate Component={Home} />} />
				<Route path='/login' element={<UserTemplate Component={Login} />} />
				<Route
					path='/register'
					element={<UserTemplate Component={Register} />}
				/>
				<Route path='/profile' element={<HomeTemplate Component={Profile} />} />
				<Route
					path='/search/:from&:to&:time'
					element={<HomeTemplate Component={SearchTrip} />}
				/>
				<Route path='/checkout/:id' element={<Checkout />} />
				<Route
					path='/admin'
					element={<AdminTemplate Component={UsersManagement} />}
				/>
				<Route
					path='/admin/users'
					element={<AdminTemplate Component={UsersManagement} />}
				/>
				<Route
					path='/admin/stations'
					element={<AdminTemplate Component={StationsManagement} />}
				/>
				<Route
					path='/admin/trips'
					element={<AdminTemplate Component={TripsManagement} />}
				/>
				<Route
					path='/admin/car-companies'
					element={<AdminTemplate Component={CarCompanyManagement} />}
				/>
				<Route
					path='/admin/vehicles'
					element={<AdminTemplate Component={VehicleManagement} />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
