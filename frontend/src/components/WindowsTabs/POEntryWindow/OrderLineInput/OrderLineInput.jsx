import OrderLineInputValues from "./OrderLIneInputValues/OrderLineInputValues";
import { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";

const OrderLineInput = ({ data, setData, staticArr, setStaticArr }) => {
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

			{showInputFields && (
				<OrderLineInputValues data={data} setData={setData} staticArr={staticArr} setStaticArr={setStaticArr} handleCancel={handleCancel} />
			)}
		</Grid>
	);
};

OrderLineInput.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			customer_id: PropTypes.string,
			customer_po: PropTypes.string,
			buyer: PropTypes.string,
			line_number: PropTypes.string,
			part_number: PropTypes.string,
			dwg_number: PropTypes.string,
			revision: PropTypes.string,
			quantity: PropTypes.string,
			description: PropTypes.string,
			price: PropTypes.string,
			cost: PropTypes.string,
			unit: PropTypes.string,
			pay_terms: PropTypes.string,
			required_date: PropTypes.string,
			due_date: PropTypes.string,
			material: PropTypes.string,
			weight: PropTypes.string,
			schd_days: PropTypes.string,
			factory: PropTypes.string,
			ship_via: PropTypes.string,
		})
	).isRequired,
	staticArr: PropTypes.arrayOf(PropTypes.bool).isRequired,
	setStaticArr: PropTypes.func.isRequired,
	setData: PropTypes.func.isRequired,
};

export default OrderLineInput;
