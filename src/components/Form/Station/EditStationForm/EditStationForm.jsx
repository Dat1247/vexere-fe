import React, { useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
	createStationAsync,
	editStationAsync,
	listProvinceAsync,
} from "../../../../redux/saga/StationManagementSaga";

export default function EditStationForm() {
	const { listProvince, stationEdit } = useSelector(
		(state) => state.stationManagement
	);
	const dispatch = useDispatch();
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			id: stationEdit?.id,
			name: stationEdit?.name,
			address: stationEdit?.address,
			province: stationEdit?.province,
		},
		onSubmit: (values) => {
			dispatch(editStationAsync(values));
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
				<Form.Item label='ID'>
					<Input
						name='id'
						onChange={handleChange}
						value={values.id}
						disabled={true}
					/>
				</Form.Item>
				<Form.Item label='Tên'>
					<Input name='name' onChange={handleChange} value={values.name} />
					{errors.name && touched.name ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{errors.name}
						</div>
					) : null}
				</Form.Item>
				<Form.Item label='Địa chỉ'>
					<Input.TextArea
						rows={4}
						name='address'
						onChange={handleChange}
						value={values.address}
					/>
					{errors.address && touched.address ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{errors.address}
						</div>
					) : null}
				</Form.Item>

				<Form.Item label='Tỉnh thành'>
					<Select
						name='province'
						value={values.province}
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
						Edit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
