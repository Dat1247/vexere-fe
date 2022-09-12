import React, { useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
	createUserAsync,
	getListUserTypeAsync,
} from "../../../../redux/saga/UserManagementSaga";

export default function AddUserForm() {
	const { listUserType } = useSelector((state) => state.userManagement);
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			name: "",
			password: "",
			email: "",
			numberPhone: "",
			type: "",
		},
		onSubmit: (values) => {
			console.log(values);
			dispatch(createUserAsync(values));
		},
	});
	useEffect(() => {
		dispatch(getListUserTypeAsync());
	}, []);

	const { values, touched, errors, handleChange, setFieldValue, handleSubmit } =
		formik;

	return (
		<div>
			<Form
				labelCol={{
					span: 4,
				}}
				wrapperCol={{
					span: 16,
				}}
				layout='horizontal'
				initialValues={{
					size: "default",
				}}
				size={"default"}
				onSubmitCapture={handleSubmit}>
				<Form.Item label='Họ tên'>
					<Input name='name' onChange={handleChange} />
					{errors.name && touched.name ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{errors.name}
						</div>
					) : null}
				</Form.Item>
				<Form.Item label='Email'>
					<Input name='email' onChange={handleChange} />
					{errors.email && touched.email ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{errors.email}
						</div>
					) : null}
				</Form.Item>
				<Form.Item label='Mật khẩu'>
					<Input name='password' onChange={handleChange} />
					{errors.password && touched.password ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{errors.password}
						</div>
					) : null}
				</Form.Item>
				<Form.Item label='Số điện thoại'>
					<Input name='numberPhone' onChange={handleChange} />
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
						Thêm
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
