import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { signUpAsync } from "../../redux/saga/UserManagementSaga";
import { useNavigate } from "react-router-dom";
import {
	setIsSignUp,
	togglePassword,
} from "../../redux/UserManagementSlice/UserManagementSlice";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

export default function Register() {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const { isSignUp, isShowPassWord } = useSelector(
		(state) => state.userManagement
	);

	useEffect(() => {
		if (isSignUp) {
			navigate("/login");
			dispatch(setIsSignUp());
		}
	}, [isSignUp]);

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
			numberPhone: "",
		},
		validationSchema: Yup.object().shape({
			email: Yup.string()
				.email("Email không hợp lệ!")
				.required("Email không được để trống!"),
			password: Yup.string()
				.min(6, "Mật khẩu quá ngắn!")
				.max(32, "Mật khẩu quá dài!")
				.required("Password không được để trống!"),
			numberPhone: Yup.string()
				.matches(/^\d+$/, "Số điện thoại phải là số!")
				.required("Số điện thoại không được để trống!"),
			name: Yup.string().required("Họ tên không được để trống!"),
		}),
		onSubmit: (values) => {
			dispatch(signUpAsync(values));
		},
	});

	const { values, handleSubmit, handleChange, errors, touched, handleBlur } =
		formik;

	return (
		<div className='lg:w-1/2 xl:max-w-screen-sm'>
			<div className='py-8 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12'></div>
			<div className='px-12 sm:px-24 md:px-48 lg:px-12 xl:px-24 xl:max-w-2xl'>
				<h2
					className='text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-4xl
	  xl:text-bold mb-4'>
					Đăng ký
				</h2>
				<div className='mt-8'>
					<form onSubmit={handleSubmit}>
						<div className=''>
							<div className='flex justify-between items-center'>
								<div className='text-sm font-bold text-gray-700 tracking-wide'>
									Email
								</div>
							</div>
							<input
								className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
								name='email'
								value={values.email}
								placeholder='Nhập vào email'
								onChange={handleChange}
							/>
							{errors.email && touched.email ? (
								<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
									{errors.email}
								</div>
							) : null}
						</div>
						<div className='mt-4 relative'>
							<div className='flex justify-between items-center'>
								<div className='text-sm font-bold text-gray-700 tracking-wide'>
									Mật khẩu
								</div>
							</div>
							<input
								className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
								type={isShowPassWord ? "text" : "password"}
								name='password'
								value={values.password}
								placeholder='Nhập vào mật khẩu'
								onChange={handleChange}
							/>
							<div
								className='absolute'
								style={{ bottom: "35%", left: "95%", cursor: "pointer" }}
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
							{errors.password && touched.password ? (
								<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
									{errors.password}
								</div>
							) : null}
						</div>

						<div className='mt-4'>
							<div className='flex justify-between items-center'>
								<div className='text-sm font-bold text-gray-700 tracking-wide'>
									Số điện thoại
								</div>
							</div>
							<input
								className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
								name='numberPhone'
								value={values.numberPhone}
								placeholder='Nhập vào số điện thoại'
								onChange={handleChange}
							/>
							{errors.numberPhone && touched.numberPhone ? (
								<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
									{errors.numberPhone}
								</div>
							) : null}
						</div>
						<div className='mt-4'>
							<div className='flex justify-between items-center'>
								<div className='text-sm font-bold text-gray-700 tracking-wide'>
									Họ tên
								</div>
							</div>
							<input
								className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
								name='name'
								value={values.name}
								placeholder='Nhập vào họ tên'
								onChange={handleChange}
							/>
							{errors.name && touched.name ? (
								<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
									{errors.name}
								</div>
							) : null}
						</div>
						<div className='mt-8'>
							<button
								className='bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
				  font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
				  shadow-lg'
								type='submit'>
								Đăng Ký
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
