import React, { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Checkout.css";
import { Tabs, Radio, Space, Popover } from "antd";
import { DoubleLeftOutlined } from "@ant-design/icons";
import {
	addSeatToListChoosing,
	changeTabActive,
} from "../../redux/SeatManagementSlice/SeatManagementSlice";
import { getListSeatsAsync } from "../../redux/saga/VehicleManagementSaga";
import moment from "moment";
import { IMAGE_URL, TOKEN, USER_LOGIN } from "../../util/config";
import { datVeAsync } from "../../redux/saga/UserManagementSaga";
import {
	changeAfterLogin,
	setParamLink,
} from "../../redux/LoadingSlice/LoadingSlice";
import WarningPage from "../WarningPage/WarningPage";
const { TabPane } = Tabs;

export const Checkout = (props) => {
	const { vehicleDetail, id } = props;

	const listSeats = useSelector((state) => state.seatManagement.listSeats);
	const listChoosing = useSelector(
		(state) => state.seatManagement.listChoosing
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getListSeatsAsync(id));
	}, []);

	console.log("listChoosing", listChoosing);

	const renderSeat1Floor = () => {
		return listSeats
			.slice(0, Math.round(listSeats.length / 2))
			.map((seat, index) => {
				let classSeat = seat.status ? "seatChose" : "";
				let classSeatChoosing = listChoosing.includes(seat)
					? "seatChoosing"
					: "";
				return (
					<button
						disabled={seat.status}
						key={index}
						className={`seat ${classSeat} ${classSeatChoosing}`}
						onClick={() => {
							dispatch(addSeatToListChoosing(seat));
						}}>
						<span>{seat.name}</span>
					</button>
				);
			});
	};

	const renderSeat2Floor = () => {
		return listSeats
			.slice(Math.round(listSeats.length / 2), listSeats.length)
			.map((seat, index) => {
				let classSeat = seat.status ? "seatChose" : "";
				let classSeatChoosing = listChoosing.includes(seat)
					? "seatChoosing"
					: "";

				return (
					<button
						disabled={seat.status}
						key={index}
						className={`seat ${classSeat} ${classSeatChoosing}`}
						onClick={() => {
							dispatch(addSeatToListChoosing(seat));
						}}>
						<span>{seat.name}</span>
					</button>
				);
			});
	};

	const renderListSeatGN = () => {
		return (
			<div className='flex'>
				<div className='coach-container'>
					<p>Tầng 1</p>
					<div className='coach'>
						<div className='driverSeat'>
							<svg
								width='30'
								height='30'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M12.305 24h-.61c-.035-.004-.07-.01-.105-.012a11.783 11.783 0 0 1-2.117-.261 12.027 12.027 0 0 1-6.958-4.394A11.933 11.933 0 0 1 .027 12.78L0 12.411v-.822c.005-.042.013-.084.014-.127a11.845 11.845 0 0 1 1.102-4.508 12.007 12.007 0 0 1 2.847-3.852A11.935 11.935 0 0 1 11.728.003c.947-.022 1.883.07 2.81.27 1.22.265 2.369.71 3.447 1.335a11.991 11.991 0 0 1 3.579 3.164 11.876 11.876 0 0 1 2.073 4.317c.178.712.292 1.434.334 2.168.008.146.02.292.029.439v.609c-.004.03-.011.06-.012.089a11.81 11.81 0 0 1-1.05 4.521 12.02 12.02 0 0 1-1.92 2.979 12.046 12.046 0 0 1-6.395 3.812c-.616.139-1.24.23-1.872.265-.149.008-.297.02-.446.03zm8.799-13.416c-.527-3.976-4.078-7.808-9.1-7.811-5.02-.003-8.583 3.823-9.11 7.809h.09c.64-.035 1.278-.092 1.912-.195.815-.131 1.614-.326 2.378-.639.625-.255 1.239-.54 1.855-.816.82-.368 1.673-.593 2.575-.62a7.123 7.123 0 0 1 1.947.187c.585.146 1.136.382 1.68.634.57.264 1.14.526 1.733.736 1.2.424 2.442.62 3.706.7.11.006.222.01.334.015zm-10.95 10.471v-.094c0-1.437 0-2.873-.002-4.31 0-.141-.011-.284-.035-.423a2.787 2.787 0 0 0-.775-1.495c-.564-.582-1.244-.896-2.067-.892-1.414.007-2.827.002-4.24.002h-.09a9.153 9.153 0 0 0 3.125 5.256 9.15 9.15 0 0 0 4.083 1.956zm3.689.001c1.738-.36 3.25-1.137 4.528-2.355 1.4-1.334 2.287-2.956 2.685-4.855l-.077-.003h-4.362c-.237 0-.47.038-.695.112-.667.22-1.188.635-1.588 1.206a2.673 2.673 0 0 0-.494 1.59c.008 1.4.003 2.801.003 4.202v.103zM12.05 14.22c1.215-.035 2.204-1.083 2.165-2.275-.039-1.223-1.095-2.215-2.29-2.166-1.211.05-2.2 1.108-2.15 2.302.051 1.191 1.108 2.186 2.275 2.139z'
									fill='#858585'></path>
							</svg>
						</div>
						<div className='listSeat'>
							<div className='grid grid-cols-3 gap-4'>{renderSeat1Floor()}</div>
						</div>
					</div>
				</div>
				<div className='coach-container ml-4'>
					<p>Tầng 2</p>
					<div className='coach'>
						<div className='spaceSeat'></div>
						<div className='listSeat'>
							<div className='grid grid-cols-3 gap-4'>{renderSeat2Floor()}</div>
						</div>
					</div>
				</div>
			</div>
		);
	};

	const renderSeatLeft = () => {
		return listSeats.slice(0, (listSeats.length - 5) / 2).map((seat, index) => {
			let classSeat = seat.status ? "seatChose" : "";
			let classSeatChoosing = listChoosing.includes(seat) ? "seatChoosing" : "";

			return (
				<button
					disabled={seat.status}
					key={index}
					className={`seat ${classSeat} ${classSeatChoosing}`}
					onClick={() => {
						dispatch(addSeatToListChoosing(seat));
					}}>
					<span>{seat.name}</span>
				</button>
			);
		});
	};
	const renderSeatRight = () => {
		return listSeats
			.slice((listSeats.length - 5) / 2, listSeats.length - 5)
			.map((seat, index) => {
				let classSeat = seat.status ? "seatChose" : "";
				let classSeatChoosing = listChoosing.includes(seat)
					? "seatChoosing"
					: "";

				return (
					<button
						disabled={seat.status}
						key={index}
						className={`seat ${classSeat} ${classSeatChoosing}`}
						onClick={() => {
							dispatch(addSeatToListChoosing(seat));
						}}>
						<span>{seat.name}</span>
					</button>
				);
			});
	};

	const renderLastSeat = () => {
		return listSeats
			.slice(listSeats.length - 5, listSeats.length)
			.map((seat, index) => {
				let classSeat = seat.status ? "seatChose" : "";
				let classSeatChoosing = listChoosing.includes(seat)
					? "seatChoosing"
					: "";

				return (
					<button
						disabled={seat.status}
						key={index}
						className={`seat ${classSeat} ${classSeatChoosing}`}
						onClick={() => {
							dispatch(addSeatToListChoosing(seat));
						}}>
						<span>{seat.name}</span>
					</button>
				);
			});
	};

	const renderListSeatGNG = () => {
		return (
			<div className='coach-container_NGH'>
				<div className='coach'>
					<div className='driverSeat'>
						<svg
							width='30'
							height='30'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M12.305 24h-.61c-.035-.004-.07-.01-.105-.012a11.783 11.783 0 0 1-2.117-.261 12.027 12.027 0 0 1-6.958-4.394A11.933 11.933 0 0 1 .027 12.78L0 12.411v-.822c.005-.042.013-.084.014-.127a11.845 11.845 0 0 1 1.102-4.508 12.007 12.007 0 0 1 2.847-3.852A11.935 11.935 0 0 1 11.728.003c.947-.022 1.883.07 2.81.27 1.22.265 2.369.71 3.447 1.335a11.991 11.991 0 0 1 3.579 3.164 11.876 11.876 0 0 1 2.073 4.317c.178.712.292 1.434.334 2.168.008.146.02.292.029.439v.609c-.004.03-.011.06-.012.089a11.81 11.81 0 0 1-1.05 4.521 12.02 12.02 0 0 1-1.92 2.979 12.046 12.046 0 0 1-6.395 3.812c-.616.139-1.24.23-1.872.265-.149.008-.297.02-.446.03zm8.799-13.416c-.527-3.976-4.078-7.808-9.1-7.811-5.02-.003-8.583 3.823-9.11 7.809h.09c.64-.035 1.278-.092 1.912-.195.815-.131 1.614-.326 2.378-.639.625-.255 1.239-.54 1.855-.816.82-.368 1.673-.593 2.575-.62a7.123 7.123 0 0 1 1.947.187c.585.146 1.136.382 1.68.634.57.264 1.14.526 1.733.736 1.2.424 2.442.62 3.706.7.11.006.222.01.334.015zm-10.95 10.471v-.094c0-1.437 0-2.873-.002-4.31 0-.141-.011-.284-.035-.423a2.787 2.787 0 0 0-.775-1.495c-.564-.582-1.244-.896-2.067-.892-1.414.007-2.827.002-4.24.002h-.09a9.153 9.153 0 0 0 3.125 5.256 9.15 9.15 0 0 0 4.083 1.956zm3.689.001c1.738-.36 3.25-1.137 4.528-2.355 1.4-1.334 2.287-2.956 2.685-4.855l-.077-.003h-4.362c-.237 0-.47.038-.695.112-.667.22-1.188.635-1.588 1.206a2.673 2.673 0 0 0-.494 1.59c.008 1.4.003 2.801.003 4.202v.103zM12.05 14.22c1.215-.035 2.204-1.083 2.165-2.275-.039-1.223-1.095-2.215-2.29-2.166-1.211.05-2.2 1.108-2.15 2.302.051 1.191 1.108 2.186 2.275 2.139z'
								fill='#858585'></path>
						</svg>
					</div>
					<div className='listSeat'>
						<div className='grid grid-cols-2 gap-5'>
							<div className='grid grid-cols-2 gap-1 '>{renderSeatLeft()}</div>
							<div className='grid grid-cols-2 gap-1 '>{renderSeatRight()}</div>
						</div>
						<div className='grid grid-cols-5 gap-1 mt-1'>
							{renderLastSeat()}
						</div>
					</div>
				</div>
			</div>
		);
	};

	const renderDetailSeat = () => {
		return (
			<div className='flex flex-col justify-between h-full'>
				<div className='p-4 border-2 h-full'>
					<p className='text-2xl text-blue-700 font-bold text-center mb-2'>
						{(vehicleDetail?.price * listChoosing.length).toLocaleString()}đ
					</p>
					<div className='py-4 border-y-2'>
						<p>
							Điểm đi: {vehicleDetail?.fromSta} - Điểm đến:{" "}
							{vehicleDetail?.toSta}{" "}
						</p>
						<p className='text-xl font-semibold'>
							Nhà xe: {vehicleDetail?.companyCarName}
						</p>
						<p className='text-lg mb-0'>
							Thời gian:{" "}
							{moment(vehicleDetail?.startTime).format("DD-MM-YYYY HH:mm:ss")}
						</p>
					</div>
					<div className='flex justify-between mt-2'>
						<div className='text-red-600 text-lg flex flex-wrap w-2/3'>
							Ghế:{" "}
							{listChoosing.map((item, index) => {
								return (
									<span className='ml-2 text-green-500 text-base' key={index}>
										{item.name}
									</span>
								);
							})}
						</div>
						<p className='text-lg text-blue-700'>
							{(vehicleDetail?.price * listChoosing.length).toLocaleString()}đ
						</p>
					</div>
				</div>

				<button
					className='w-full p-4 bg-blue-500 text-white text-2xl font-bold hover:bg-blue-800 duration-500'
					onClick={() => {
						if (listChoosing.length > 0) {
							dispatch(changeTabActive("2"));
						} else {
							alert("Vui lòng chọn ghế trước khi xác nhận!");
						}
					}}>
					Xác nhận
				</button>
			</div>
		);
	};

	return (
		<div className='container'>
			<div className='grid grid-cols-12'>
				<div className='col-span-9 flex justify-around'>
					<div className='noteBoard'>
						<p>Chú thích</p>
						<div>
							<button className='seat'></button>
							Ghế trống
						</div>
						<div>
							<button className='seat seatChose'></button>
							Ghế đã được đặt
						</div>
						<div>
							<button className='seat seatChoosing'></button>
							Ghế đang đặt
						</div>
					</div>
					<div className='diagram'>
						{vehicleDetail?.typeVehicle === "GN"
							? renderListSeatGN()
							: renderListSeatGNG()}
					</div>
				</div>
				<div className='col-span-3'>{renderDetailSeat()}</div>
			</div>
		</div>
	);
};

export const ConfirmPayment = (props) => {
	const { vehicleDetail } = props;
	const navigate = useNavigate();
	const { listChoosing, isBookTicket } = useSelector(
		(state) => state.seatManagement
	);
	const { userLogin } = useSelector((state) => state.userManagement);
	const dispatch = useDispatch();
	const [valueRadio, setValueRadio] = useState(-1);
	const onChange = (e) => {
		setValueRadio(e.target.value);
	};

	useEffect(() => {
		setValueRadio(-1);
	}, []);

	if (isBookTicket) {
		navigate(-1);
	}

	return (
		<div className='grid grid-cols-12 gap-4 container payment'>
			<div className='col-span-8'>
				<h4>Phương thức thanh toán</h4>
				<div className='listPayments'>
					<Radio.Group onChange={onChange} name='payment' value={valueRadio}>
						<Space direction='vertical'>
							<div>
								<Radio value={1}>
									<div className='flex items-center'>
										<img
											src={
												"https://storage.googleapis.com/fe-production/httpImage/bus_station.svg"
											}
											alt='busStation'
										/>
										<p className='mb-0'>Thanh toán khi lên xe</p>
									</div>
								</Radio>
							</div>
							<div>
								<Radio value={2}>
									<div className='flex items-center'>
										<img
											src={
												"https://storage.googleapis.com/fe-production/httpImage/zalo_pay.svg"
											}
											alt='zaloPay'
										/>
										<p className='mb-0'>Ví Zalopay</p>
									</div>
									<p>Điện thoại của bạn phải được cài đặt ứng dụng Zalopay</p>
								</Radio>
							</div>
							<div>
								<Radio value={3}>
									<div className='flex items-center'>
										<img
											src={
												"https://storage.googleapis.com/fe-production/httpImage/vn_pay.svg"
											}
											alt='VNPay'
										/>
										<p className='mb-0'>Thanh toán VNPAY - QR</p>
									</div>

									<p>
										Thiết bị cần cài đặt Ứng dụng ngân hàng (Mobile Banking)
										hoặc Ví VNPAY
									</p>
								</Radio>
							</div>
							<div>
								<Radio value={4}>
									<div className='flex items-center'>
										<img
											src={
												"https://storage.googleapis.com/fe-production/httpImage/credit_card.svg"
											}
											alt='creditCard'
										/>
										<p className='mb-0'>Thẻ thanh toán quốc tế</p>
									</div>

									<p>Thẻ Visa, MasterCard, JCB</p>
								</Radio>
							</div>
							<div>
								<Radio value={5}>
									<div className='flex items-center'>
										<img
											src={
												"https://storage.googleapis.com/fe-production/httpImage/momo.svg"
											}
											alt='MoMo'
										/>
										<p className='mb-0'>Ví MoMo</p>
									</div>
									<p>Điện thoại của bạn phải được cài đặt ứng dụng MoMo</p>
								</Radio>
							</div>
							<div>
								<Radio value={6}>
									<div className='flex items-center'>
										<img
											src={
												"https://storage.googleapis.com/fe-production/httpImage/bank_transfer.svg"
											}
											alt='bankTransfer'
										/>

										<p className='mb-0'>Chuyển khoản ngân hàng</p>
									</div>
									<p>Chuyển khoản đến tài khoản ngân hàng</p>
								</Radio>
							</div>
						</Space>
					</Radio.Group>
				</div>
			</div>
			<div className='col-span-4'>
				<h4>Thông tin chuyến đi</h4>
				<div>
					<div className='detailCheckout'>
						<div className='detailProfile'>
							<div className='detailCheckout__box'>
								<h5>Hành khách</h5>
								<p>{userLogin.name}</p>
							</div>
							<div className='detailCheckout__box'>
								<h5>Số điện thoại</h5>
								<p>{userLogin.numberPhone}</p>
							</div>
							<div className='detailCheckout__box'>
								<h5>Email</h5>
								<p>{userLogin.email}</p>
							</div>
						</div>
						<div className='detailVehicle'>
							<div className='detailCheckout__box'>
								<h5>Ghế</h5>
								<p>
									{listChoosing.map((item, index) => {
										return (
											<span key={index} className='pr-2'>
												{item.name}
											</span>
										);
									})}
								</p>
							</div>
							<div className='detailCheckout__box'>
								<h5>Giá</h5>
								<p>
									{(
										vehicleDetail?.price * listChoosing.length
									).toLocaleString()}
									đ
								</p>
							</div>
							<div className='detailCheckout__box'>
								<h5>Nhà xe</h5>
								<p>{vehicleDetail?.companyCarName}</p>
							</div>
							<div className='detailCheckout__box'>
								<h5>Thời gian</h5>
								<p>
									{moment(vehicleDetail?.startTime).format(
										"DD-MM-YYYY HH:mm:ss"
									)}
								</p>
							</div>
							<div className='detailCheckout__box'>
								<h5>Điểm đến</h5>
								<p>{vehicleDetail?.toSta}</p>
							</div>
							<div className='detailCheckout__box'>
								<h5>Điểm đi</h5>
								<p>{vehicleDetail?.fromSta}</p>
							</div>
						</div>
					</div>
					<div>
						{valueRadio > -1 ? (
							<div className='checkPayment'>
								<button
									className='text-lg p-4 text-white bg-yellow-500 font-bold uppercase w-full h-full hover:bg-yellow-700 duration-500'
									onClick={() => {
										dispatch(
											datVeAsync({
												tripId: vehicleDetail.tripId,
												listSeatChoosing: listChoosing,
											})
										);
									}}>
									Thanh toán
								</button>
							</div>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default function CheckOutTab(props) {
	const params = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const { activeTab } = useSelector((state) => state.seatManagement);
	const { listTripSearch } = useSelector((state) => state.tripManagement);
	const { userLogin } = useSelector((state) => state.userManagement);
	const dispatch = useDispatch();
	const [widthScreen, setWidthScreen] = useState(window.innerWidth);

	useEffect(() => {
		window.addEventListener("resize", () => {
			setWidthScreen(window.innerWidth);
		});
		return () => {
			dispatch(changeTabActive("1"));
		};
	}, []);

	const vehicleDetail = listTripSearch.find(
		(item) => item.vehicleId == params.id
	);

	const content = (
		<div>
			{userLogin?.userType === "ADMIN" ? (
				<button
					className='mb-2 text-blue-500 hover:text-blue-700  duration-500'
					onClick={() => {
						navigate("/admin");
					}}>
					Quản trị
				</button>
			) : (
				""
			)}
			<br />
			<button
				onClick={() => {
					navigate("/profile");
				}}
				className='mb-2'>
				Thông tin người dùng
			</button>
			<br />
			<button
				onClick={() => {
					localStorage.removeItem(TOKEN);
					localStorage.removeItem(USER_LOGIN);
					navigate("/");
					window.location.reload();
				}}
				className='text-red-500 hover:text-red-800 duration-500 '>
				Đăng xuất
			</button>
		</div>
	);

	const operations = {
		left: (
			<div
				className='mr-4 cursor-pointer  text-red-500 hover:text-red-700 duration-500'
				onClick={() => {
					if (activeTab == "2") {
						dispatch(changeTabActive("1"));
					} else {
						navigate(-1);
					}
				}}>
				<p className='flex items-center mb-0'>
					<DoubleLeftOutlined />
					<span className='ml-2'>QUAY LẠI</span>
				</p>
			</div>
		),
		right: (
			<Fragment>
				<div className='flex items-center'>
					<Popover
						content={content}
						title={
							<div className='text-center'>
								<p className='mb-0'>Xin chào! </p>
								<span className='font-semibold'>{userLogin?.name}</span>
							</div>
						}>
						<img
							className='flex justify-center items-center w-12 h-12 rounded-full bg-red-200'
							src={
								userLogin?.avatar[0] === "."
									? IMAGE_URL + userLogin?.avatar.slice(2)
									: userLogin?.avatar
							}
							alt='avatar'
						/>
					</Popover>
				</div>
			</Fragment>
		),
	};
	if (widthScreen >= 1300) {
		if (userLogin) {
			return (
				<Tabs
					defaultActiveKey={"1"}
					activeKey={activeTab.toString()}
					centered
					tabBarExtraContent={operations}>
					<TabPane tab='01 CHỌN VÉ' key='1'>
						<Checkout vehicleDetail={vehicleDetail} id={params.id} />
					</TabPane>
					<TabPane tab='02 THANH TOÁN' key='2'>
						<ConfirmPayment vehicleDetail={vehicleDetail} id={params.id} />
					</TabPane>
				</Tabs>
			);
		} else {
			return (
				<div className='flex h-screen items-center justify-center flex-col'>
					<h3 className='text-2xl font-bold mb-4'>
						Bạn cần phải đăng nhập trước khi vào trang này!
					</h3>
					<div>
						<button
							className='bg-red-500 text-white px-4 py-2 rounded-lg font-semibold tracking-wide hover:bg-red-800 duration-500'
							onClick={() => {
								navigate(-1);
							}}>
							Quay lại
						</button>
						<button
							className='bg-green-500 text-white px-4 py-2 rounded-lg font-semibold tracking-wide ml-4 hover:bg-green-800 duration-500'
							onClick={() => {
								dispatch(setParamLink(location.pathname));
								dispatch(changeAfterLogin());
								navigate("/login");
							}}>
							Đến trang đăng nhập
						</button>
					</div>
				</div>
			);
		}
	} else {
		return <WarningPage maxScreen={"1300"} />;
	}
}
