import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Tag, Table, Tooltip, Popconfirm, Input } from "antd";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import {
	deleteStationAsync,
	getAllStationAsync,
	listProvinceAsync,
} from "../../../redux/saga/StationManagementSaga";
import "./StationsManagement.css";
import { openVisibleDrawer } from "../../../redux/DrawerHOCSlice/DrawerSlice";
import { getStationEdit } from "../../../redux/StationManagementSlice/StationManagementSlice";

const { Search } = Input;

export default function StationsManagement(props) {
	const { listProvince, listStation } = useSelector(
		(state) => state.stationManagement
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllStationAsync());
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
			width: "8%",
		},
		{
			title: "Name",
			dataIndex: "name",
			width: "25%",
		},
		{
			title: "Address",
			dataIndex: "address",
			width: "40%",
		},
		{
			title: "Province",
			dataIndex: "province",
			filters: filterProvinceArr,
			onFilter: (value, record) => {
				return record.province.includes(value);
			},
			render: (text, record, index) => {
				const objProvince = listProvince?.find(
					(province) => province.code === text
				);

				return <div>{objProvince?.value}</div>;
			},
			sorter: (a, b) => {
				let provinceA = a.province.toLowerCase().trim();
				let provinceB = b.province.toLowerCase().trim();
				if (provinceA > provinceB) {
					return 1;
				}
				return -1;
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
											ComponentContentDrawer: "EditStationForm",
											Title: "Edit station",
										})
									);
									dispatch(getStationEdit(record));
								}}>
								<FormOutlined className='text-xl ' />
							</button>
						</Tooltip>
						<Tooltip placement='top' title={"Delete"}>
							<Popconfirm
								title='Are you sure to delete this station?'
								placement='topRight'
								onConfirm={() => {
									dispatch(deleteStationAsync(record.id));
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
			width: "12%",
		},
	];

	return (
		<div>
			<h1 className='text-2xl font-semibold mb-4'>Stations Management</h1>
			<Button
				className='mb-4'
				onClick={() => {
					dispatch(
						openVisibleDrawer({
							ComponentContentDrawer: "AddStationForm",
							Title: "Add new station",
						})
					);
				}}>
				Add Station
			</Button>
			<Search
				placeholder='Search station'
				allowClear
				enterButton='Search'
				size='large'
				onSearch={(value, e) => {
					dispatch(getAllStationAsync(value));
				}}
				className='mb-4'
			/>

			<Table columns={columns} dataSource={listStation} rowKey={"id"} />
		</div>
	);
}
