import React from "react";
import {
	Drawer,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
	closeVisibleDrawer,
} from "../../redux/DrawerHOCSlice/DrawerSlice";
import { myRefStore } from "./../../redux/refHandler";


export default function DrawerHOC(props) {
	const { isVisibleDrawer, Title } = useSelector(
		(state) => state.drawerHOC
	);
	const { Form } = myRefStore.objectForm;

	const dispatch = useDispatch();

	const onClose = () => {
		dispatch(closeVisibleDrawer());
	};

	return (
		<>
			<Drawer
				title={Title}
				width={720}
				onClose={onClose}
				visible={isVisibleDrawer}
				bodyStyle={{ paddingBottom: 80 }}>
				{Form ? <Form /> : ""}

			</Drawer>
		</>
	);
}
