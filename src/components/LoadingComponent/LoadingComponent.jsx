import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import LoadingCSS from "./LoadingComponent.module.css";

export default function LoadingComponent() {
	const { isLoading } = useSelector((state) => state.loadingSlice);

	return (
		<Fragment>
			{isLoading ? (
				<div className={LoadingCSS.loading}>
					<img
						src={require("../../assets/LoadingImg/loading.gif")}
						alt='loading'
					/>
					<p>Loading...</p>
				</div>
			) : (
				""
			)}
		</Fragment>
	);
}
