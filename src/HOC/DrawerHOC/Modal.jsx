import React from "react";
import ReactDOM from "react-dom";
import { Button, Drawer, Space } from "antd";

const Modal = ({ isShowing, hide, Component }) =>
	isShowing
		? ReactDOM.createPortal(
				<React.Fragment>
					<Drawer
						title='Create a new account'
						width={720}
						onClose={hide}
						visible={isShowing}
						bodyStyle={{ paddingBottom: 80 }}
						extra={
							<Space>
								<Button onClick={hide}>Cancel</Button>
								<Button onClick={hide} type='primary'>
									Submit
								</Button>
							</Space>
						}>
						<Component />
					</Drawer>
				</React.Fragment>,
				document.body
		  )
		: null;

export default Modal;
