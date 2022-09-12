import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Tag, Table, Tooltip, Popconfirm, Input } from "antd";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { openVisibleDrawer } from "../../../redux/DrawerHOCSlice/DrawerSlice";
import {
	deleteVehicleAsync,
	getAllVehicleAsync,
	getVehicleTypeAsync,
} from "../../../redux/saga/VehicleManagementSaga";
import moment from "moment";
import { getObjVehicleEdit } from "../../../redux/VehicleManagementSlice/VehicleManagementSlice";

const { Search } = Input;

export default function VehicleManagement() {
	const { listVehicle, listVehicleType } = useSelector(
		(state) => state.vehicleManagement
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllVehicleAsync());
		dispatch(getVehicleTypeAsync());
	}, []);

	let filterVehicleTypeArr = [];
	listVehicleType?.forEach((item) => {
		filterVehicleTypeArr.push({ text: item.name, value: item.value });
	});

	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			sorter: (a, b) => a.id - b.id,
			sortDirections: ["descend", "ascend"],
			width: "7%",
		},
		{
			title: "Name",
			dataIndex: "vehicleName",

			sorter: (a, b) => {
				let aName = a.vehicleName.toLowerCase().trim();
				let bName = b.vehicleName.toLowerCase().trim();
				if (aName > bName) {
					return 1;
				}
				return -1;
			},
			sortDirections: ["descend", "ascend"],
			width: "12%",
		},
		{
			title: "From",
			dataIndex: "fromStationName",
			sorter: (a, b) => {
				let aName = a.fromStationName.toLowerCase().trim();
				let bName = b.fromStationName.toLowerCase().trim();
				if (aName > bName) {
					return 1;
				}
				return -1;
			},
			sortDirections: ["descend", "ascend"],
			width: "15%",
		},
		{
			title: "To",
			dataIndex: "toStationName",
			sorter: (a, b) => {
				let aName = a.toStationName.toLowerCase().trim();
				let bName = b.toStationName.toLowerCase().trim();
				if (aName > bName) {
					return 1;
				}
				return -1;
			},
			sortDirections: ["descend", "ascend"],
			width: "15%",
		},
		{
			title: "Price",
			dataIndex: "price",
			render: (text, record, index) => {
				return <div>{text.toLocaleString()}</div>;
			},
			sorter: (a, b) => {
				return a.price - b.price;
			},
			sortDirections: ["descend", "ascend"],
			width: "10%",
		},
		{
			title: "Start time",
			dataIndex: "startTime",
			render: (text, record, index) => {
				return <div>{moment(text).format("HH:mm DD/MM/YYYY")}</div>;
			},
			width: "13%",
		},
		{
			title: "Company name",
			dataIndex: "carCompanyName",
			sorter: (a, b) => {
				let aName = a.carCompanyName.toLowerCase().trim();
				let bName = b.carCompanyName.toLowerCase().trim();
				if (aName > bName) {
					return 1;
				}
				return -1;
			},
			sortDirections: ["descend", "ascend"],
			width: "13%",
		},
		{
			title: "Type",
			dataIndex: "typeVehicle",
			render: (text, record, index) => {
				if (text === "GN") {
					return <Tag color='volcano'>Giường nằm</Tag>;
				} else {
					return <Tag color='magenta'>Ghế ngồi</Tag>;
				}
			},
			filters: filterVehicleTypeArr,
			onFilter: (value, record) => {
				return record.typeVehicle === value;
			},
			width: "5%",
		},
		{
			title: "Actions",
			dataIndex: "action",
			render: (text, record, index) => {
				return (
					<div>
						<Tooltip placement='top' title={"Edit"}>
							<button
								className='text-green-500 hover:text-green-700 duration-700'
								onClick={() => {
									dispatch(
										openVisibleDrawer({
											ComponentContentDrawer: "EditVehicleForm",
											Title: "Edit vehicle company",
										})
									);
									dispatch(getObjVehicleEdit(record));
								}}>
								<FormOutlined className='text-xl ' />
							</button>
						</Tooltip>
						<Tooltip placement='top' title={"Delete"}>
							<Popconfirm
								title='Are you sure to delete this vehicle?'
								placement='topRight'
								onConfirm={() => {
									dispatch(deleteVehicleAsync(record.id));
								}}
								okText='Yes'
								cancelText='No'>
								<button className='ml-4 text-red-500 hover:text-red-700 duration-700'>
									<DeleteOutlined className='text-xl ' />
								</button>
							</Popconfirm>
						</Tooltip>
					</div>
				);
			},
			width: "10%",
		},
	];

	return (
		<div>
			<h1 className='text-2xl font-semibold mb-4'>Vehicles Management</h1>
			<Button
				className='mb-4'
				onClick={() => {
					dispatch(
						openVisibleDrawer({
							ComponentContentDrawer: "AddVehicleForm",
							Title: "Add new vehicle",
						})
					);
				}}>
				Add New Vehicle
			</Button>
			<Search
				placeholder='Search vehicle'
				allowClear
				enterButton='Search'
				size='large'
				onSearch={(value, e) => {
					dispatch(getAllVehicleAsync(value));
				}}
				className='mb-4'
			/>

			<Table columns={columns} dataSource={listVehicle} rowKey={"id"} />
		</div>
	);
}
