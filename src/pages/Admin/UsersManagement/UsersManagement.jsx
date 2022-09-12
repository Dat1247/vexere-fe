import React, { useEffect } from "react";
import { Button, Tag, Table, Tooltip, Popconfirm, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteUserAsync,
	getAllUsersAsync,
} from "../../../redux/saga/UserManagementSaga";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { openVisibleDrawer } from "../../../redux/DrawerHOCSlice/DrawerSlice";
import { getUserEdit } from "../../../redux/UserManagementSlice/UserManagementSlice";
import { IMAGE_URL } from "../../../util/config";

const { Search } = Input;

export default function UsersManagement(props) {
	const { listUser, listUserSearch } = useSelector(
		(state) => state.userManagement
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllUsersAsync());
	}, []);

	console.log("listUser", listUser);

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
			title: "Avatar",
			dataIndex: "avatar",
			render: (text, record, index) => {
				if (text[0] === ".") {
					return (
						<img
							src={IMAGE_URL + text}
							alt={record.name}
							className='w-14 h-14 '
						/>
					);
				}
				return <img src={text} alt={record.name} className='w-14 h-14 ' />;
			},
			width: "10%",
		},
		{
			title: "Email",
			dataIndex: "email",
			width: "20%",
		},
		{
			title: "Number phone",
			dataIndex: "numberPhone",
			width: "15%",
		},
		{
			title: "Type",
			dataIndex: "type",
			filters: [
				{ text: "Admin", value: "ADMIN" },
				{ text: "Client", value: "CLIENT" },
			],
			render: (text, record, index) => {
				if (text === "CLIENT") {
					return <Tag color='green'>{text}</Tag>;
				}
				return <Tag color='geekblue'>{text}</Tag>;
			},
			onFilter: (value, record) => record.type.includes(value),
			sorter: (a, b) => {
				let typeA = a.type.toLowerCase().trim();
				let typeB = b.type.toLowerCase().trim();
				if (typeA > typeB) {
					return 1;
				}
				return -1;
			},
			sortDirections: ["descend", "ascend"],
			width: "10%",
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
											ComponentContentDrawer: "EditUserForm",
											Title: "Edit user",
										})
									);
									dispatch(getUserEdit(record));
								}}>
								<FormOutlined className='text-xl ' />
							</button>
						</Tooltip>
						<Tooltip placement='top' title={"Delete"}>
							<Popconfirm
								title='Are you sure to delete this user?'
								placement='topRight'
								onConfirm={() => {
									dispatch(deleteUserAsync(record.id));
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
			<h1 className='text-2xl font-semibold mb-4'>Users Management</h1>
			<Button
				className='mb-4'
				onClick={() => {
					dispatch(
						openVisibleDrawer({
							ComponentContentDrawer: "AddUserForm",
							Title: "Add new user",
						})
					);
					// toggleAdd();
				}}>
				Add User
			</Button>
			<Search
				placeholder='Search user'
				allowClear
				enterButton='Search'
				size='large'
				onSearch={(value, e) => {
					dispatch(getAllUsersAsync(value));
				}}
				className='mb-4'
			/>
			{/* <Modal
				isShowing={isShowingAdd}
				hide={toggleAdd}
				Component={AddUserForm}
			/>
			<Modal
				isShowing={isShowingEdit}
				hide={toggleEdit}
				Component={EditUserForm}
			/> */}
			<Table columns={columns} dataSource={listUserSearch} rowKey={"id"} />
		</div>
	);
}
