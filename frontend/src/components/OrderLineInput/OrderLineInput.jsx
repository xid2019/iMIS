import OrderLineInputValues from "./OrderLIneInputValues/OrderLineInputValues";
import { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";

const OrderLineInput = ({ fetchData }) => {
	const [showInputFields, setShowInputFields] = useState(false);

	const handleButtonClick = () => {
		setShowInputFields(true);
	};

	const handleCancel = () => {
		setShowInputFields(false);
	};

	return (
		<Grid>
			{!showInputFields && (
				<Button variant="contained" color="primary" onClick={handleButtonClick}>
					Add Order Line
				</Button>
			)}

			{showInputFields && <OrderLineInputValues fetchData={fetchData} handleCancel={handleCancel} />}
		</Grid>
	);
};

OrderLineInput.propTypes = {
	fetchData: PropTypes.func.isRequired,
};

export default OrderLineInput;
