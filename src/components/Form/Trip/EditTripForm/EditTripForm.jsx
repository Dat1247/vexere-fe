import React, { useEffect } from "react";
import { Button, Form, Input, Select, InputNumber, DatePicker } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
	createStationAsync,
	getAllStationAsync,
	listProvinceAsync,
} from "../../../../redux/saga/StationManagementSaga";
import moment from "moment";
import {
	createTripAsync,
	updateTripAsync,
} from "../../../../redux/saga/TripManagementSaga";

export default function EditTripForm() {
	const { listStation } = useSelector((state) => state.stationManagement);
	const { objTripEdit } = useSelector((state) => state.tripManagement);

	const dispatch = useDispatch();
	const timeFormat = "YYYY-MM-DD HH:mm:ss";
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			id: objTripEdit.id,
			fromStation: objTripEdit.fromStation,
			toStation: objTripEdit.toStation,
			price: objTripEdit.price,
			startTime: moment(objTripEdit.startTime).format(timeFormat),
		},

		onSubmit: (values) => {
			if (values.fromStation === values.toStation) {
				alert("From Station and To Station must be different!");
			} else {
				console.log(values);

				dispatch(
					updateTripAsync({
						id: objTripEdit.id,
						tripUpdate: values,
					})
				);
			}
		},
	});
	useEffect(() => {
		dispatch(listProvinceAsync());
		dispatch(getAllStationAsync());
	}, []);

	const { values, touched, handleChange, errors, setFieldValue, handleSubmit } =
		formik;

	const onChangeDate = (value) => {
		setFieldValue("startTime", moment(value).format(timeFormat));
	};

	const onOk = (value) => {
		setFieldValue("startTime", moment(value).format(timeFormat));
	};

	const onChangeNumber = (value) => {
		setFieldValue("price", value);
	};

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
				<Form.Item label='From Station'>
					<Select
						name='fromStation'
						value={values.fromStation}
						onChange={(value) => {
							setFieldValue("fromStation", value);
						}}>
						{listStation?.map((item, index) => {
							return (
								<Select.Option value={item.id} key={index}>
									{item.name} - {item.province}
								</Select.Option>
							);
						})}
					</Select>
				</Form.Item>
				<Form.Item label='To Station'>
					<Select
						name='toStation'
						value={values.toStation}
						onChange={(value) => {
							setFieldValue("toStation", value);
						}}>
						{listStation?.map((item, index) => {
							return (
								<Select.Option value={item.id} key={index}>
									{item.name} - {item.province}
								</Select.Option>
							);
						})}
					</Select>
				</Form.Item>
				<Form.Item label='Start time'>
					<DatePicker
						showTime
						format={timeFormat}
						onChange={onChangeDate}
						value={moment(values.startTime, timeFormat)}
						onOk={onOk}
					/>
				</Form.Item>

				<Form.Item label='Price'>
					<InputNumber
						min={100000}
						max={500000}
						onChange={onChangeNumber}
						step={10000}
						value={values.price}
					/>
					{errors.price && touched.price ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{errors.price}
						</div>
					) : null}
				</Form.Item>
				<Form.Item label='Action'>
					<Button htmlType='submit' type='primary'>
						Edit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
