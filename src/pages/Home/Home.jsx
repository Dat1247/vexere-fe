import React, { useEffect, useState } from "react";
import homeCss from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { listProvinceAsync } from "../../redux/saga/StationManagementSaga";
import { SearchForm } from "../../components/Form/SearchForm/SearchForm";

export default function Home(props) {
	const dispatch = useDispatch();
	const listProvince = useSelector(
		(state) => state.stationManagement.listProvince
	);
	useEffect(() => {
		dispatch(listProvinceAsync());
	}, []);

	return (
		<div className={homeCss.banner}>
			<img src='./leaderboard.png' alt='banner' />
			<div className={homeCss.search}>
				<div>
					<h1>Tìm kiếm vé xe trên VeXeRe</h1>
					<SearchForm listProvince={listProvince} />
				</div>
			</div>
		</div>
	);
}
