import { notification } from "antd";

export const Notification = (type, title, message) => {
	notification[type]({
		message: title,
		description: message,
	});
};
