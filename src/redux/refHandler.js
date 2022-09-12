import AddCarCompanyForm from "../components/Form/CarCompany/AddCarCompanyForm/AddCarCompanyForm";
import EditCarCompanyForm from "../components/Form/CarCompany/EditCarCompanyForm/EditCarCompanyForm";
import AddStationForm from "../components/Form/Station/AddStationForm/AddStationForm";
import EditStationForm from "../components/Form/Station/EditStationForm/EditStationForm";
import AddTripForm from "../components/Form/Trip/AddTripForm/AddTripForm";
import EditTripForm from "../components/Form/Trip/EditTripForm/EditTripForm";
import AddUserForm from "../components/Form/User/AddUserForm/AddUserForm";
import EditUserForm from "../components/Form/User/EditUserForm/EditUserForm";
import AddVehicleForm from "../components/Form/Vehicle/AddVehicleForm/AddVehicleForm";
import EditVehicleForm from "../components/Form/Vehicle/EditVehicleForm/EditVehicleForm";

export const myRefStore = {
	objectForm: {},
};

export function refHandler({ getState }) {
	return (next) => (action) => {
		switch (action.type) {
			// this can be done more elegantly with a redux-observable
			case "drawerSlice/openVisibleDrawer":
				switch (action.payload.ComponentContentDrawer) {
					case "EditUserForm":
						myRefStore.objectForm.Form = EditUserForm;
						break;
					case "AddUserForm":
						myRefStore.objectForm.Form = AddUserForm;
						break;
					case "AddStationForm":
						myRefStore.objectForm.Form = AddStationForm;
						break;
					case "EditStationForm":
						myRefStore.objectForm.Form = EditStationForm;
						break;
					case "EditTripForm":
						myRefStore.objectForm.Form = EditTripForm;
						break;
					case "AddTripForm":
						myRefStore.objectForm.Form = AddTripForm;
						break;
					case "AddCarCompanyForm":
						myRefStore.objectForm.Form = AddCarCompanyForm;
						break;
					case "EditCarCompanyForm":
						myRefStore.objectForm.Form = EditCarCompanyForm;
						break;
					case "AddVehicleForm":
						myRefStore.objectForm.Form = AddVehicleForm;
						break;
					case "EditVehicleForm":
						myRefStore.objectForm.Form = EditVehicleForm;
						break;
					default:
						break;
				}
				break;

			default:
				break;
		}
		// be sure to maintain the chain of the store
		const returnValue = next(action);
		// otherwise, your midddeware will break the store
		return returnValue;
	};
}
