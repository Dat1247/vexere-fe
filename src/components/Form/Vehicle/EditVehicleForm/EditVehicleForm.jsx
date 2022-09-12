import React, { useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
	createVehicleAsync,
	getVehicleTypeAsync,
	updateVehicleAsync,
} from "../../../../redux/saga/VehicleManagementSaga";
import { getAllTripAsync } from "../../../../redux/saga/TripManagementSaga";
import { getAllCarCompaniesAsync } from "../../../../redux/saga/CarCompanyManagementSaga";

export default function EditVehicleForm() {
	const { listVehicleType, objVehicleEdit } = useSelector(
		(state) => state.vehicleManagement
	);
	const { listTrip } = useSelector((state) => state.tripManagement);
	const { listCarCompanies } = useSelector(
		(state) => state.carCompanyManagement
	);
	const dispatch = useDispatch();
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			id: objVehicleEdit.id,
			name: objVehicleEdit.vehicleName,
			carCompany_id: objVehicleEdit.carCompany_id,
			trip_id: objVehicleEdit.trip_id,
			typeVehicle: objVehicleEdit.typeVehicle,
		},
		validationSchema: Yup.object().shape({
			name: Yup.string().required("Name is required!"),
			carCompany_id: Yup.string().required("Car company is required!"),
			trip_id: Yup.string().required("Trip is required!"),
			typeVehicle: Yup.string().required("Type vehicle is required!"),
		}),
		onSubmit: (values) => {
			dispatch(
				updateVehicleAsync({
					id: objVehicleEdit.id,
					vehicleUpdate: values,
				})
			);
		},
	});

	useEffect(() => {
		dispatch(getVehicleTypeAsync());
		dispatch(getAllTripAsync());
		dispatch(getAllCarCompaniesAsync());
	}, [dispatch]);

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
						disabled={true}
						value={values.id}
					/>
				</Form.Item>
				<Form.Item label='Name'>
					<Input name='name' onChange={handleChange} value={values.name} />
					{errors.name && touched.name ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{errors.name}
						</div>
					) : null}
				</Form.Item>
				<Form.Item label='Car Company'>
					<Select
						name='carCompany_id'
						value={values.carCompany_id}
						onChange={(value) => {
							setFieldValue("carCompany_id", value);
						}}>
						{listCarCompanies?.map((item, index) => {
							return (
								<Select.Option value={item.id} key={index}>
									{item.name}
								</Select.Option>
							);
						})}
					</Select>
					{errors.carCompany_id && touched.carCompany_id ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{errors.carCompany_id}
						</div>
					) : null}
				</Form.Item>
				<Form.Item label='Trip'>
					<Select
						name='trip_id'
						value={values.trip_id}
						onChange={(value) => {
							setFieldValue("trip_id", value);
						}}>
						{listTrip?.map((item, index) => {
							return (
								<Select.Option value={item.id} key={index}>
									{item.from.name} - {item.to.name}
								</Select.Option>
							);
						})}
					</Select>
					{errors.trip_id && touched.trip_id ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{errors.trip_id}
						</div>
					) : null}
				</Form.Item>

				<Form.Item label='Type'>
					<Select
						name='typeVehicle'
						value={values.typeVehicle}
						onChange={(value) => {
							setFieldValue("typeVehicle", value);
						}}>
						{listVehicleType?.map((item, index) => {
							return (
								<Select.Option value={item.value} key={index}>
									{item.name}
								</Select.Option>
							);
						})}
					</Select>
					{errors.typeVehicle && touched.typeVehicle ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{errors.typeVehicle}
						</div>
					) : null}
				</Form.Item>

				<Form.Item label='Action'>
					<Button htmlType='submit' type='primary'>
						Add
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
