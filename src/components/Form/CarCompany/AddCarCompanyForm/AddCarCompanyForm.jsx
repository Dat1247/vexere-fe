import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getListUserTypeAsync } from "../../../../redux/saga/UserManagementSaga";
import { createCarCompanyAsync } from "../../../../redux/saga/CarCompanyManagementSaga";

export default function AddCarCompanyForm() {
	const [imgSrc, setImgSrc] = useState("");

	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			name: "",
			description: "",
			company: {},
		},
		onSubmit: (values) => {
			console.log(values);
			let formData = new FormData();
			for (let key in values) {
				if (key !== "company") {
					formData.append(key, values[key]);
				} else {
					if (values.company !== null || values.company !== {}) {
						formData.append("company", values.company, values.company.name);
					}
				}
			}
			dispatch(createCarCompanyAsync(formData));
		},
	});

	const { values, touched, errors, handleChange, setFieldValue, handleSubmit } =
		formik;

	const handleChangeFile = async (e) => {
		let file = e.target.files[0];

		if (
			file.type === "image/jpeg" ||
			file.type === "image/png" ||
			file.type === "image/gif" ||
			file.type === "image/jpg"
		) {
			await setFieldValue("company", file);
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
				<Form.Item label='Name'>
					<Input name='name' onChange={handleChange} value={values.name} />
					{errors.name && touched.name ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{errors.name}
						</div>
					) : null}
				</Form.Item>
				<Form.Item label='Description'>
					<Input.TextArea
						rows={4}
						name='description'
						onChange={handleChange}
						value={values.description}
					/>
					{errors.description && touched.description ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{errors.description}
						</div>
					) : null}
				</Form.Item>
				<Form.Item label='Image'>
					<input
						type='file'
						name='company'
						onChange={handleChangeFile}
						accept='image/png, image/jpeg, image/gif, image/jpg'
					/>
					<img
						src={
							!imgSrc
								? require("../../../../assets/img/image-error.png")
								: imgSrc
						}
						alt='avatar'
						style={{
							width: "150px",
							height: "150px",

							margin: "10px 0",
						}}
					/>
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
