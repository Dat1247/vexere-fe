import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, Tooltip, Popconfirm } from "antd";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import {
	deleteTripAsync,
	getAllTripAsync,
} from "../../../redux/saga/TripManagementSaga";
import { openVisibleDrawer } from "../../../redux/DrawerHOCSlice/DrawerSlice";
import moment from "moment";
import { getObjTripEdit } from "../../../redux/TripManagementSlice/TripManagementSlice";
import { listProvinceAsync } from "../../../redux/saga/StationManagementSaga";

export default function TripsManagement(props) {
	const { listTrip } = useSelector((state) => state.tripManagement);
	const { listProvince } = useSelector((state) => state.stationManagement);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllTripAsync());
		dispatch(listProvinceAsync());
	}, []);

	let filterProvinceArr = [];

	listProvince?.forEach((province) => {
		filterProvinceArr.push({ text: province.value, value: province.code });
	});

	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			sorter: (a, b) => a.id - b.id,
			sortDirections: ["descend", "ascend"],
			width: "10%",
		},
		{
			title: "From",
			dataIndex: "fromStation",
			render: (text, record, index) => {
				return (
					<div>
						<p>
							{record.from.name} - {record.from.province}
						</p>
					</div>
				);
			},
			filters: filterProvinceArr,
			onFilter: (value, record) => {
				return record.from.province.includes(value);
			},
			width: "25%",
		},
		{
			title: "To",
			dataIndex: "toStation",
			render: (text, record, index) => {
				return (
					<div>
						<p>
							{record.to.name} - {record.to.province}
						</p>
					</div>
				);
			},
			filters: filterProvinceArr,
			onFilter: (value, record) => {
				return record.to.province.includes(value);
			},
			width: "25%",
		},
		{
			title: "Start Time",
			dataIndex: "startTime",
			render: (text, record, index) => {
				return <div>{moment(text).format("HH:mm DD/MM/YYYY")}</div>;
			},
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
			width: "15%",
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
											ComponentContentDrawer: "EditTripForm",
											Title: "Edit trip",
										})
									);
									dispatch(getObjTripEdit(record));
								}}>
								<FormOutlined className='text-xl ' />
							</button>
						</Tooltip>
						<Tooltip placement='top' title={"Delete"}>
							<Popconfirm
								title='Are you sure to delete this trip?'
								placement='topRight'
								onConfirm={() => {
									dispatch(deleteTripAsync(record.id));
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
			<h1 className='text-2xl font-semibold mb-4'>Trips Management</h1>
			<Button
				className='mb-4'
				onClick={() => {
					dispatch(
						openVisibleDrawer({
							ComponentContentDrawer: "AddTripForm",
							Title: "Add new trip",
						})
					);
				}}>
				Add Trip
			</Button>

			<Table columns={columns} dataSource={listTrip} rowKey={"id"} />
		</div>
	);
}
