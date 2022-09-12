import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { resetAfterLogin } from "../../redux/LoadingSlice/LoadingSlice";
import { loginAsync } from "../../redux/saga/UserManagementSaga";
import { togglePassword } from "../../redux/UserManagementSlice/UserManagementSlice";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

export default function Login(props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isLogin, isShowPassWord } = useSelector(
		(state) => state.userManagement
	);
	const { isAfterLogin, paramLink } = useSelector(
		(state) => state.loadingSlice
	);

	useEffect(() => {
		if (isLogin) {
			if (isAfterLogin) {
				dispatch(resetAfterLogin());
				navigate(paramLink);
			} else {
				navigate("/");
			}
		}
	}, [isLogin]);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object().shape({
			email: Yup.string().required("Email không được để trống!"),
			password: Yup.string()
				.min(6, "Mật khẩu quá ngắn!")
				.max(32, "Mật khẩu quá dài!")
				.required("Password không được để trống!"),
		}),
		onSubmit: (values) => {
			dispatch(loginAsync(values));
		},
	});

	const { values, handleSubmit, handleChange, errors, touched } = formik;

	return (
		<div className='lg:w-1/2 xl:max-w-screen-sm'>
			<div className='py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12'></div>
			<div className='mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl'>
				<h2
					className='text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
	  xl:text-bold'>
					Đăng nhập
				</h2>
				<div className='mt-12'>
					<form onSubmit={handleSubmit}>
						<div>
							<div className='text-sm font-bold text-gray-700 tracking-wide'>
								Email
							</div>
							<input
								className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
								value={values.email}
								name='email'
								onChange={handleChange}
								placeholder='Nhập vào email'
							/>
							{errors.email && touched.email ? (
								<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
									{errors.email}
								</div>
							) : null}
						</div>
						<div className='mt-8 relative'>
							<div className='flex justify-between items-center'>
								<div className='text-sm font-bold text-gray-700 tracking-wide'>
									Mật khẩu
								</div>
							</div>
							<input
								className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
								type={isShowPassWord ? "text" : "password"}
								value={values.password}
								name='password'
								onChange={handleChange}
								placeholder='Nhập vào mật khẩu'
							/>
							<div
								className='absolute'
								style={{ bottom: "15%", left: "95%", cursor: "pointer" }}
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
						<div className='mt-10'>
							<button
								className='bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
				  font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
				  shadow-lg'
								type='submit'>
								Đăng Nhập
							</button>
						</div>
					</form>
					<div className='mt-12 text-sm font-display font-semibold text-gray-700 text-center'>
						Bạn chưa có tài khoản ?{" "}
						<NavLink
							to='/register'
							className='cursor-pointer text-indigo-600 hover:text-indigo-800'>
							Đăng ký
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
}
