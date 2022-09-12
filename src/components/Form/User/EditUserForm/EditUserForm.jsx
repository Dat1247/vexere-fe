import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
	getListUserTypeAsync,
	updateUserAsync,
} from "../../../../redux/saga/UserManagementSaga";
import { IMAGE_URL } from "../../../../util/config";

export default function EditUserForm() {
	const { userEdit, listUserType } = useSelector(
		(state) => state.userManagement
	);
	const [imgSrc, setImgSrc] = useState("");
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			id: userEdit.id,
			name: userEdit.name,
			email: userEdit.email,
			avatar: null,
			numberPhone: userEdit.numberPhone,
			type: userEdit.type,
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
				updateUserAsync({
					id: userEdit.id,
					formData,
				})
			);
		},
	});
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getListUserTypeAsync());
	}, []);

	const {
		values,
		touched,
		errors,
		handleChange,
		handleBlur,
		handleSubmit,
		setFieldValue,
	} = formik;

	const handleChangeFile = async (e) => {
		let file = e.target.files[0];
		console.log(file);
		if (
			file.type === "image/jpeg" ||
			file.type === "image/png" ||
			file.type === "image/gif" ||
			file.type === "image/jpg"
		) {
			await setFieldValue("avatar", file);
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (e) => {
				setImgSrc(e.target.result);
			};
		}
	};

	return (
		<div>
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
				<div className='grid grid-cols-7'>
					<div className='col-span-5'>
						<Form.Item label='ID'>
							<Input
								name='id'
								onChange={handleChange}
								value={values.id}
								disabled={true}
							/>
						</Form.Item>
						<Form.Item label='Họ tên'>
							<Input name='name' onChange={handleChange} value={values.name} />
							{errors.name && touched.name ? (
								<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
									{errors.name}
								</div>
							) : null}
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
					</div>
					<div className='col-span-2 flex items-center justify-center'>
						<img
							src={
								imgSrc === ""
									? userEdit.avatar[0] === "."
										? IMAGE_URL + userEdit.avatar
										: userEdit.avatar
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
					<Select
						name='type'
						value={values.type}
						onChange={(value) => {
							setFieldValue("type", value);
						}}>
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
	);
}
