import React, { useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
	createStationAsync,
	listProvinceAsync,
} from "../../../../redux/saga/StationManagementSaga";

export default function AddStationForm() {
	const { listProvince } = useSelector((state) => state.stationManagement);
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			name: "",
			address: "",
			province: "",
		},
		onSubmit: (values) => {
			dispatch(createStationAsync(values));
		},
	});
	useEffect(() => {
		dispatch(listProvinceAsync());
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
				<Form.Item label='Tên'>
					<Input name='name' onChange={handleChange} />
					{errors.name && touched.name ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{errors.name}
						</div>
					) : null}
				</Form.Item>
				<Form.Item label='Địa chỉ'>
					<Input.TextArea rows={4} name='address' onChange={handleChange} />
					{errors.address && touched.address ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{errors.address}
						</div>
					) : null}
				</Form.Item>

				<Form.Item label='Tỉnh thành'>
					<Select
						name='province'
						value={values.type}
						onChange={(value) => {
							setFieldValue("province", value);
						}}>
						{listProvince?.map((item, index) => {
							return (
								<Select.Option value={item.code} key={index}>
									{item.value}
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
