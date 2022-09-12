import React from "react";
import { WarningOutlined } from "@ant-design/icons";
import "./WarningPage.css";

export default function WarningPage(props) {
	return (
		<div className='warning-overlay'>
			<WarningOutlined className='warning-icon' />
			<p className='warning-title'>This screen size is too small!</p>
			<p className='warning-info'>
				Your screen width must be larger than {props.maxScreen}px!
			</p>
		</div>
	);
}
