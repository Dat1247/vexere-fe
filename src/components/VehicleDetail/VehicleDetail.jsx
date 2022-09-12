import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../util/config";
import "./VehicleDetail.css";
import moment from "moment";
import { MoreOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListSeatsAsync } from "../../redux/saga/VehicleManagementSaga";
import {
	resetIsBookTicket,
	resetListChoosing,
} from "../../redux/SeatManagementSlice/SeatManagementSlice";

export const VehicleDetail = (props) => {
	const {
		companyCarImage,
		companyCarName,
		fromAddress,
		fromProvince,
		fromSta,
		price,
		startTime,
		toAddress,
		toProvince,
		toSta,
		tripId,
		vehicleId,
		vehicleName,
		seatRemaining,
		typeVehicle,
	} = props.vehicleDetail;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		// dispatch(getListSeatsAsync(vehicleId));
	}, []);

	return (
		<div className='vehicleDetail'>
			<div className='grid grid-cols-4 p-4'>
				{companyCarImage[0] === "." ? (
					<img
						src={IMAGE_URL + companyCarImage}
						alt='imageCar'
						className='col-span-1 h-full'
					/>
				) : (
					<img
						src={companyCarImage}
						alt='imageCar'
						className='col-span-1 h-full'
					/>
				)}

				<div className='col-span-3 vehicleDetail__info'>
					<div className='vehicleDetail__infoLeft'>
						<div>
							<h4 className='font-bold'>{companyCarName}</h4>
							<p className='italic'>
								{typeVehicle === "GN" ? "Giường nằm" : "Ghế ngồi"}
							</p>
						</div>
						<div className='my-2'>
							<p>
								<span className='font-semibold'>{fromSta}</span>
							</p>
							<MoreOutlined className='my-1 text-xl' />
							<p>
								<span className='font-semibold'>{toSta}</span>
							</p>
						</div>
						<p>
							{" "}
							<span>{moment(startTime).format("DD-MM-YYYY HH:mm:ss")}</span>
						</p>
					</div>
					<div className='vehicleDetail__infoRight'>
						<p className='font-bold text-blue-700'>{price.toLocaleString()}đ</p>
						<div>
							<p>{seatRemaining} chỗ trống</p>
							<button
								onClick={() => {
									navigate(`/checkout/${vehicleId}`);
									dispatch(resetListChoosing());
									dispatch(resetIsBookTicket());
								}}>
								Chọn chuyến
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
