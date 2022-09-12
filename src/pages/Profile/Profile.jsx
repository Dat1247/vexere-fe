import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Select, Tabs } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import moment from "moment";
import {
	getListUserTypeAsync,
	getUserByIdAsync,
	searchTicketByIdAsync,
	updateUserProfileAsync,
} from "../../redux/saga/UserManagementSaga";
import { IMAGE_URL } from "../../util/config";
import "./Profile.css";
import { togglePassword } from "../../redux/UserManagementSlice/UserManagementSlice";

const { TabPane } = Tabs;

export const ThongTinNguoiDung = () => {
	const { userLogin, userById, listUserType, isShowPassWord } = useSelector(
		(state) => state.userManagement
	);
	const [imgSrc, setImgSrc] = useState("");

	const dispatch = useDispatch();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			id: userById.id,
			name: userById.name,
			password: "",
			email: userById.email,
			avatar: null,
			numberPhone: userById.numberPhone,
			type: userById.type,
		},
		onSubmit: (values) => {
			let formData = new FormData();
			for (let key in values) {
				if (key !== "avatar") {
					formData.append(key, values[key]);
				} else {
					if (values.avatar !== null) {
						formData.append("avatar", values.avatar, values.avatar.name);
					}
				}
			}

			dispatch(
				updateUserProfileAsync({
					id: userById.id,
					formData,
				})
			);
		},
	});

	useEffect(() => {
		dispatch(getUserByIdAsync(userLogin.id));
		dispatch(getListUserTypeAsync());
	}, []);

	const { values, touched, errors, handleChange, handleSubmit, setFieldValue } =
		formik;

	const handleChangeFile = async (e) => {
		let file = e.target.files[0];

		if (
			file.type === "image/jpeg" ||
			file.type === "image/png" ||
			file.type === "image/gif" ||
			file.type === "image/jpg"
		) {
			setFieldValue("avatar", file);
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (e) => {
				setImgSrc(e.target.result);
			};
		}
	};

	return (
		<div className='container mt-4 mb-8'>
			<div className='grid grid-cols-7'>
				<div className='col-span-5'>
					<Form
						labelCol={{
							span: 6,
						}}
						wrapperCol={{
							span: 16,
						}}
						layout='horizontal'
						initialValues={{
							size: "default",
						}}
						size={"default"}
						onSubmitCapture={handleSubmit}
						encType='multipart/form-data'>
						<Form.Item label='ID'>
							<Input name='id' value={values.id} disabled={true} />
						</Form.Item>
						<Form.Item label='Họ tên'>
							<Input name='name' onChange={handleChange} value={values.name} />
							{errors.name && touched.name ? (
								<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
									{errors.name}
								</div>
							) : null}
						</Form.Item>
						<Form.Item label='Mật khẩu mới'>
							<Input
								type={isShowPassWord ? "text" : "password"}
								name='password'
								onChange={handleChange}
								value={values.password}
							/>
							<div
								className='absolute'
								style={{ bottom: "25%", left: "95%", cursor: "pointer" }}
								onClick={() => {
									dispatch(togglePassword());
								}}>
								{values.password ? (
									isShowPassWord ? (
										<EyeInvisibleOutlined />
									) : (
										<EyeOutlined />
									)
								) : (
									""
								)}
							</div>
						</Form.Item>
						<Form.Item label='Email'>
							<Input
								name='email'
								onChange={handleChange}
								value={values.email}
							/>
							{errors.email && touched.email ? (
								<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
									{errors.email}
								</div>
							) : null}
						</Form.Item>

						<Form.Item label='Avatar'>
							<input
								type='file'
								name='avatar'
								onChange={handleChangeFile}
								accept='image/png, image/jpeg, image/gif, image/jpg'
							/>
						</Form.Item>
						<Form.Item label='Số điện thoại'>
							<Input
								name='numberPhone'
								onChange={handleChange}
								value={values.numberPhone}
							/>
							{errors.numberPhone && touched.numberPhone ? (
								<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
									{errors.numberPhone}
								</div>
							) : null}
						</Form.Item>
						<Form.Item label='Loại người dùng'>
							<Select name='type' value={values.type} disabled={true}>
								{listUserType.map((item, index) => {
									return (
										<Select.Option value={item.value} key={index}>
											{item.name}
										</Select.Option>
									);
								})}
							</Select>
						</Form.Item>

						<Form.Item label='Tác vụ'>
							<Button htmlType='submit' type='primary'>
								Cập nhật
							</Button>
						</Form.Item>
					</Form>
				</div>
				<div className='col-span-2 flex items-start justify-center'>
					<img
						src={
							imgSrc === ""
								? userLogin?.avatar[0] === "."
									? IMAGE_URL + userLogin?.avatar
									: userLogin?.avatar
								: imgSrc
						}
						alt='avatar'
						style={{
							width: "150px",
							height: "150px",
							borderRadius: "50%",
							border: "1px solid rgb(188, 188, 188)",
							padding: "10px",
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export const LichSuDatVe = () => {
	const { userLogin, listTicketOfUser } = useSelector(
		(state) => state.userManagement
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(searchTicketByIdAsync(userLogin.id));
	}, []);

	const renderListTickets = () => {
		return listTicketOfUser.map((item, index) => {
			return (
				<div key={index} className='ticketItem'>
					<p>
						Nơi đi: <span>{item.fromStation}</span>
					</p>
					<p>
						Nơi đến: <span>{item.toStation}</span>
					</p>
					<div className='flex mb-2 italic text-gray-800 font-semibold'>
						<p className='mb-0'>{item.vehicle}</p>{" "}
						<span className='mx-2'>-</span>{" "}
						<p className='mb-0'>{item.carCompany}</p>
					</div>
					<p>
						Ngày khởi hành:{" "}
						<span>{moment(item.startTime).format("DD/MM/YYYY HH:mm:ss")}</span>
					</p>
					<p>
						Giá vé:{" "}
						<span className='text-lg font-bold text-red-700'>
							{item.price.toLocaleString()}đ
						</span>
					</p>
					<p>
						Ghế:{" "}
						<span className='text-lg font-bold text-green-700'>
							{item.soGhe}
						</span>
					</p>
					<p className='italic text-gray-500 font-semibold'>
						Ngày đặt:{" "}
						<span>{moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss")}</span>
					</p>
				</div>
			);
		});
	};

	return (
		<div className='container  mb-8'>
			<div className='grid grid-cols-3 gap-4 historyTicket'>
				{renderListTickets()}
			</div>
		</div>
	);
};

export default function Profile() {
	return (
		<Tabs defaultActiveKey={"1"} centered>
			<TabPane tab='01 THÔNG TIN NGƯỜI DÙNG' key='1'>
				<ThongTinNguoiDung />
			</TabPane>
			<TabPane tab='02 LỊCH SỬ ĐẶT VÉ' key='2'>
				<LichSuDatVe />
			</TabPane>
		</Tabs>
	);
}
