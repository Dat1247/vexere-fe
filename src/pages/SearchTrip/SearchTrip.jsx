import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Checkbox, InputNumber, Slider } from "antd";

import { SearchForm } from "../../components/Form/SearchForm/SearchForm";
import { VehicleDetail } from "../../components/VehicleDetail/VehicleDetail";
import { listProvinceAsync } from "../../redux/saga/StationManagementSaga";
import "./SearchTrip.css";
import { searchTripAsync } from "../../redux/saga/TripManagementSaga";
import { getListTripFilter } from "../../redux/TripManagementSlice/TripManagementSlice";
import { getAllCarCompaniesAsync } from "../../redux/saga/CarCompanyManagementSaga";

export default function SearchTrip() {
	const param = useParams();
	const dispatch = useDispatch();
	const listProvince = useSelector(
		(state) => state.stationManagement.listProvince
	);
	const { listTripSearch, listTripFilter } = useSelector(
		(state) => state.tripManagement
	);
	const { listCarCompanies } = useSelector(
		(state) => state.carCompanyManagement
	);
	useEffect(() => {
		dispatch(listProvinceAsync());
		dispatch(
			searchTripAsync({
				fromSta: param.from,
				toSta: param.to,
				startTime: param.time,
			})
		);
		dispatch(getAllCarCompaniesAsync());
	}, [param]);

	const [filterCheck, setFilterCheck] = useState({
		minPrice: 0,
		maxPrice: 1000000,
		seatRemaining: 1,
		carCompanies: [],
		typeVehicles: [],
		startTimes: [],
	});

	console.log("param", param);
	console.log("listTripSearch", listTripSearch);

	const today = new Date();
	const timeNow = moment(today).format("HH:mm");
	const dateNow = moment(today).format("YYYY-MM-DD");

	const compareTime = (time, compareTime) => {
		if (time <= compareTime) {
			return true;
		}
		return false;
	};

	const onClickTime = (e, timeCompare, timeStart, id) => {
		if (!compareTime(timeNow, timeCompare) && dateNow === param.time) {
			console.log("timeCheck");
			return;
		}

		if (e.target.checked) {
			setFilterCheck({
				...filterCheck,
				[e.target.name]: [
					...filterCheck.startTimes,
					{ id, timeStart, timeCompare },
				].sort((a, b) => a.id - b.id),
			});
		} else {
			setFilterCheck({
				...filterCheck,
				[e.target.name]: filterCheck.startTimes.filter(
					(time) =>
						time.timeStart !== timeStart && time.timeCompare !== timeCompare
				),
			});
		}
	};

	const onChangeSeatRemaining = (value) => {
		setFilterCheck({
			...filterCheck,
			seatRemaining: value,
		});
	};
	const onChangeCheck = (checkedValues, name) => {
		setFilterCheck({
			...filterCheck,
			[name]: checkedValues,
		});
	};

	const onChangePrice = (value) => {
		const [minPrice, maxPrice] = value;

		setFilterCheck({
			...filterCheck,
			minPrice: minPrice,
			maxPrice: maxPrice,
		});
	};

	const listTypeVehicle = [
		{
			label: "Ghế ngồi",
			value: "GNG",
		},
		{
			label: "Giường nằm",
			value: "GN",
		},
	];

	const renderVehicle = () => {
		return listTripFilter.map((vehicle, index) => {
			return <VehicleDetail vehicleDetail={vehicle} key={index} />;
		});
	};

	const filterVehicleDetail = () => {
		const {
			carCompanies,
			typeVehicles,
			startTimes,
			minPrice,
			maxPrice,
			seatRemaining,
		} = filterCheck;

		const result = listTripSearch.filter((item) => {
			const time = moment(item.startTime).format("HH:mm:ss");

			if (
				startTimes.length <= 0 &&
				typeVehicles.length <= 0 &&
				carCompanies.length <= 0
			) {
				return (
					Number(item.price) >= minPrice &&
					Number(item.price) <= maxPrice &&
					Number(item.seatRemaining) >= seatRemaining
				);
			}
			if (startTimes.length <= 0) {
				if (typeVehicles.length <= 0) {
					return (
						Number(item.price) >= minPrice &&
						Number(item.price) <= maxPrice &&
						Number(item.seatRemaining) >= seatRemaining &&
						carCompanies.includes(item.companyCarName)
					);
				}
				if (carCompanies.length <= 0) {
					return (
						Number(item.price) >= minPrice &&
						Number(item.price) <= maxPrice &&
						Number(item.seatRemaining) >= seatRemaining &&
						typeVehicles.includes(item.typeVehicle)
					);
				}

				return (
					Number(item.price) >= minPrice &&
					Number(item.price) <= maxPrice &&
					Number(item.seatRemaining) >= seatRemaining &&
					typeVehicles.includes(item.typeVehicle) &&
					carCompanies.includes(item.companyCarName)
				);
			}
			if (typeVehicles.length <= 0) {
				if (carCompanies.length <= 0) {
					return (
						Number(item.price) >= minPrice &&
						Number(item.price) <= maxPrice &&
						Number(item.seatRemaining) >= seatRemaining &&
						time >= startTimes[0].timeStart &&
						time <= startTimes[startTimes.length - 1].timeCompare
					);
				}
				if (startTimes.length <= 0) {
					return (
						Number(item.price) >= minPrice &&
						Number(item.price) <= maxPrice &&
						Number(item.seatRemaining) >= seatRemaining &&
						carCompanies.includes(item.companyCarName)
					);
				}
				return (
					Number(item.price) >= minPrice &&
					Number(item.price) <= maxPrice &&
					Number(item.seatRemaining) >= seatRemaining &&
					time >= startTimes[0].timeStart &&
					time <= startTimes[startTimes.length - 1].timeCompare &&
					carCompanies.includes(item.companyCarName)
				);
			}
			if (carCompanies.length <= 0) {
				if (startTimes.length <= 0) {
					return (
						Number(item.price) >= minPrice &&
						Number(item.price) <= maxPrice &&
						Number(item.seatRemaining) >= seatRemaining &&
						typeVehicles.includes(item.typeVehicle)
					);
				}
				if (typeVehicles.length <= 0) {
					return (
						Number(item.price) >= minPrice &&
						Number(item.price) <= maxPrice &&
						Number(item.seatRemaining) >= seatRemaining &&
						time >= startTimes[0].timeStart &&
						time <= startTimes[startTimes.length - 1].timeCompare
					);
				}
				return (
					Number(item.price) >= minPrice &&
					Number(item.price) <= maxPrice &&
					Number(item.seatRemaining) >= seatRemaining &&
					time >= startTimes[0].timeStart &&
					time <= startTimes[startTimes.length - 1].timeCompare &&
					typeVehicles.includes(item.typeVehicle)
				);
			}
			return (
				Number(item.price) >= minPrice &&
				Number(item.price) <= maxPrice &&
				Number(item.seatRemaining) >= seatRemaining &&
				time >= startTimes[0].timeStart &&
				time <= startTimes[startTimes.length - 1].timeCompare &&
				typeVehicles.includes(item.typeVehicle) &&
				carCompanies.includes(item.companyCarName)
			);
		});
		console.log("result", result);

		dispatch(getListTripFilter(result));
	};

	const listCarCompany = [];

	listCarCompanies.forEach((item) => {
		listCarCompany.push({ label: item.name, value: item.name });
	});

	return (
		<div className='container mx-auto searchTrip my-4'>
			<h2>
				Xe đi từ {param.from} đến {param.to}{" "}
			</h2>
			<div className='flex justify-center'>
				<SearchForm listProvince={listProvince} />
			</div>
			<div className='grid grid-cols-4 gap-2 md:gap-5 mt-4 searchTrip__listTrip'>
				<div className='col-span-2  md:col-span-1 searchTrip__listTrip-left'>
					<p className='flex justify-between'>
						<span>Bộ lọc tìm kiếm</span>
						<span
							className='text-blue-500 hover:text-blue-700 cursor-pointer duration-500'
							onClick={() => {
								setFilterCheck({
									minPrice: 0,
									maxPrice: 1000000,
									seatRemaining: 1,
									carCompanies: [],
									typeVehicles: [],
									startTimes: [],
								});
								dispatch(getListTripFilter(listTripSearch));
							}}>
							Xóa lọc
						</span>
					</p>
					<div className='filterBox'>
						<div>
							<h5>Giờ đi</h5>
							<div className='boxTime'>
								<label htmlFor='timeMidNight'>
									<input
										className='hidden'
										type='checkbox'
										name='startTimes'
										id='timeMidNight'
										checked={
											filterCheck.startTimes.filter(
												(e) => e.timeStart === "00:00"
											).length > 0
										}
										onChange={(e) => {
											onClickTime(e, "06:00", "00:00", 1);
										}}
									/>
									<div
										className={
											dateNow !== param.time
												? "timeFill"
												: compareTime(timeNow, "06:00")
												? "timeFill"
												: "timeFill disableTime"
										}>
										<p>Buổi sớm (SL)</p>
										<p>00:00 - 06:00</p>
									</div>
								</label>
								<label htmlFor='timeMorning'>
									<input
										className='hidden'
										type='checkbox'
										name='startTimes'
										id='timeMorning'
										checked={
											filterCheck.startTimes.filter(
												(e) => e.timeStart === "06:01"
											).length > 0
										}
										onChange={(e) => {
											onClickTime(e, "12:00", "06:01", 2);
										}}
									/>
									<div
										className={
											dateNow !== param.time
												? "timeFill"
												: compareTime(timeNow, "12:00")
												? "timeFill"
												: "timeFill disableTime"
										}>
										<p>Buổi sáng (SL)</p>
										<p>06:01 - 12:00</p>
									</div>
								</label>
								<label htmlFor='timeAfternoon'>
									<input
										className='hidden'
										type='checkbox'
										name='startTimes'
										id='timeAfternoon'
										checked={
											filterCheck.startTimes.filter(
												(e) => e.timeStart === "12:01"
											).length > 0
										}
										onChange={(e) => {
											onClickTime(e, "18:00", "12:01", 3);
										}}
									/>
									<div
										className={
											dateNow !== param.time
												? "timeFill"
												: compareTime(timeNow, "18:00")
												? "timeFill"
												: "timeFill disableTime"
										}>
										<p>Buổi chiều (SL)</p>
										<p>12:01 - 18:00</p>
									</div>
								</label>
								<label htmlFor='timeEvening'>
									<input
										className='hidden'
										type='checkbox'
										name='startTimes'
										id='timeEvening'
										checked={
											filterCheck.startTimes.filter(
												(e) => e.timeStart === "18:01"
											).length > 0
										}
										onChange={(e) => {
											onClickTime(e, "23:59", "18:01", 4);
										}}
									/>
									<div
										className={
											dateNow !== param.time
												? "timeFill"
												: compareTime(timeNow, "23:59")
												? "timeFill"
												: "timeFill disableTime"
										}>
										<p>Buổi tối (SL)</p>
										<p>18:01 - 23:59</p>
									</div>
								</label>
							</div>
						</div>
						<div>
							<h5>Giá vé</h5>
							<Slider
								range
								value={[filterCheck.minPrice, filterCheck.maxPrice]}
								step={10000}
								min={0}
								max={1000000}
								onChange={onChangePrice}
							/>
							<div className='flex justify-between'>
								<p>{filterCheck.minPrice.toLocaleString()}đ</p>
								<p>{filterCheck.maxPrice.toLocaleString()}đ</p>
							</div>
						</div>
						<div className='seatRemaining'>
							<h5 className='mb-0'>Số ghế trống</h5>
							<InputNumber
								min={1}
								max={10}
								value={filterCheck.seatRemaining}
								onChange={onChangeSeatRemaining}
							/>
						</div>
						<div>
							<h5>Nhà xe</h5>
							<Checkbox.Group
								options={listCarCompany}
								value={filterCheck.carCompanies}
								onChange={(e) => {
									onChangeCheck(e, "carCompanies");
								}}
								name='carCompanies'
							/>
						</div>
						<div>
							<h5>Loại xe</h5>
							<Checkbox.Group
								options={listTypeVehicle}
								value={filterCheck.typeVehicles}
								onChange={(e) => {
									onChangeCheck(e, "typeVehicles");
								}}
								name='typeVehicles'
							/>
						</div>
						<div className='text-center mt-4'>
							<button
								className='self-center px-4 py-1 font-semibold rounded bg-sky-500 text-white hover:bg-sky-700 duration-500'
								onClick={() => {
									filterVehicleDetail();
								}}>
								Lọc
							</button>
						</div>
					</div>
				</div>
				<div className='col-span-2  md:col-span-3 searchTrip__listTrip-right'>
					<h3>
						Đặt mua vé xe đi từ {param.from} đến {param.to} ngày{" "}
						{moment(param.time).format("DD-MM-YYYY")}:{" "}
						<span> {listTripFilter.length} chuyến </span>
					</h3>
					{renderVehicle()}
				</div>
			</div>
		</div>
	);
}
