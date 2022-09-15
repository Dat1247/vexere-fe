import { useState } from "react";
import moment from "moment";
import { Select, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import "./SearchForm.css";

const { Option } = Select;

export const SearchForm = (props) => {
	const navigate = useNavigate();
	const [valueSelect, setValueSelect] = useState({
		from: "",
		to: "",
		time: "",
	});

	const { listProvince } = props;

	const onChangeByName = (value, name) => {
		setValueSelect({
			...valueSelect,
			[name]: value,
		});
	};

	const onChangeTime = (value, name) => {
		let valueTime = moment(value).format("YYYY-MM-DD");
		setValueSelect({
			...valueSelect,
			[name]: valueTime,
		});
	};

	const onSearch = (value) => {
		console.log("search:", value);
	};

	const renderListProvince = () => {
		return listProvince?.map((province, index) => {
			return (
				<Option value={province.code} key={index}>
					{province.value}
				</Option>
			);
		});
	};

	return (
		<form
			className='formSearch'
			onSubmit={(e) => {
				e.preventDefault();
				const { from, to, time } = valueSelect;

				if (from === "" || to === "" || time === "" || from === to) {
					return;
				} else {
					navigate(`/search/${from}&${to}&${time}`, { replace: true });
				}
			}}>
			<Select
				showSearch
				placeholder='Chọn điểm đi'
				onChange={(value) => {
					onChangeByName(value, "from");
				}}
				onSearch={onSearch}
				size={"large"}
				name='fromStation'>
				{renderListProvince()}
			</Select>
			<Select
				showSearch
				placeholder='Chọn điểm đến'
				onChange={(value) => {
					onChangeByName(value, "to");
				}}
				onSearch={onSearch}
				size={"large"}
				name='toStation'>
				{renderListProvince()}
			</Select>

			<DatePicker
				onChange={(value) => {
					onChangeTime(value, "time");
				}}
				format={"DD-MM-YYYY"}
				name='time'
			/>
			<button type='submit'>Tìm Kiếm</button>
		</form>
	);
};
