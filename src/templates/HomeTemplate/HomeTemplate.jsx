import React, { Fragment, useEffect, useState } from "react";
import WarningPage from "../../pages/WarningPage/WarningPage";
import Footer from "./Layouts/Footer/Footer";
import Header from "./Layouts/Header/Header";

export default function HomeTemplate(props) {
	const [widthScreen, setWidthScreen] = useState(window.innerWidth);
	const { Component } = props;
	useEffect(() => {
		window.addEventListener("resize", () => {
			setWidthScreen(window.innerWidth);
		});
	}, []);
	if (widthScreen < 1300) {
		return <WarningPage maxScreen={"1300"} />;
	} else {
		return (
			<Fragment>
				<Header />
				<Component />
				<Footer />
			</Fragment>
		);
	}
}
