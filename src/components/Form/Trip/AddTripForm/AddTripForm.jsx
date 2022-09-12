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
import { createTripAsync } from "../../../../redux/saga/TripManagementSaga";

export default function AddTripForm() {
	const { listStation } = useSelector((state) => state.stationManagement);

	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			fromStation: "",
			toStation: "",
			price: "",
			startTime: "",
		},

		onSubmit: (values) => {
			if (values.fromStation === values.toStation) {
				alert("From Station and To Station must be different!");
			} else {
				console.log(values);
				dispatch(createTripAsync(values));
			}
		},
	});
	useEffect(() => {
		dispatch(listProvinceAsync());
		dispatch(getAllStationAsync());
	}, []);

	console.log("listStation", listStation);

	const { values, touched, errors, setFieldValue, handleSubmit } = formik;

	const onChangeDate = (value) => {
		setFieldValue("startTime", moment(value).format("DD/MM/YYYY HH:mm:ss"));
	};

	const onOk = (value) => {
		setFieldValue("startTime", moment(value).format("YYYY-MM-DD HH:mm:ss"));
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
						format='DD-MM-YYYY HH:mm:ss'
						onChange={onChangeDate}
						onOk={onOk}
					/>
				</Form.Item>

				<Form.Item label='Price'>
					<InputNumber
						min={100000}
						max={500000}
						onChange={onChangeNumber}
						step={10000}
					/>
					{errors.price && touched.price ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{errors.price}
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
