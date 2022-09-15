import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, Tooltip, Popconfirm, Input } from "antd";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { openVisibleDrawer } from "../../../redux/DrawerHOCSlice/DrawerSlice";
import {
	deleteCarCompanyAsync,
	getAllCarCompaniesAsync,
} from "../../../redux/saga/CarCompanyManagementSaga";
import { IMAGE_URL } from "../../../util/config";
import { getObjCarCompanyEdit } from "../../../redux/CarCompanyManagementSlice/CarCompanyManagementSlice";

const { Search } = Input;

export default function CarCompanyManagement() {
	const { listCarCompanies } = useSelector(
		(state) => state.carCompanyManagement
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllCarCompaniesAsync());
	}, []);

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

			sorter: (a, b) => {
				let aName = a.name.toLowerCase().trim();
				let bName = b.name.toLowerCase().trim();
				if (aName > bName) {
					return 1;
				}
				return -1;
			},
			sortDirections: ["descend", "ascend"],
			width: "27%",
		},
		{
			title: "Image",
			dataIndex: "image",
			render: (text, record, index) => {
				return (
					<img
						src={IMAGE_URL + text}
						alt={record.name}
						className='w-14 h-14 '
					/>
				);
			},
			width: "10%",
		},
		{
			title: "Description",
			dataIndex: "description",
			width: "45%",
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
											ComponentContentDrawer: "EditCarCompanyForm",
											Title: "Edit car company",
										})
									);
									dispatch(getObjCarCompanyEdit(record));
								}}>
								<FormOutlined className='text-xl ' />
							</button>
						</Tooltip>
						<Tooltip placement='top' title={"Delete"}>
							<Popconfirm
								title='Are you sure to delete this company?'
								placement='topRight'
								onConfirm={() => {
									dispatch(deleteCarCompanyAsync(record.id));
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
			<h1 className='text-2xl font-semibold mb-4'>Car Companies Management</h1>
			<Button
				className='mb-4'
				onClick={() => {
					dispatch(
						openVisibleDrawer({
							ComponentContentDrawer: "AddCarCompanyForm",
							Title: "Add new car company",
						})
					);
				}}>
				Add New Car Company
			</Button>
			<Search
				placeholder='Search company'
				allowClear
				enterButton='Search'
				size='large'
				onSearch={(value, e) => {
					dispatch(getAllCarCompaniesAsync(value));
				}}
				className='mb-4'
			/>

			<Table columns={columns} dataSource={listCarCompanies} rowKey={"id"} />
		</div>
	);
}
