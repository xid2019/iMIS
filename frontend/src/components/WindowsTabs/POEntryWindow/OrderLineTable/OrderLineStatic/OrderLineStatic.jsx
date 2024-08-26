import PropTypes from "prop-types";
import { Box, Button, TableCell, TableRow } from "@mui/material";

const OrderLineStatic = ({ data, setData, index, staticArr, setStaticArr }) => {
	const handleEdit = () => {
		const newStaticArr = [...staticArr];
		newStaticArr[index] = false;
		setStaticArr(newStaticArr);
	};

	const handleDelete = () => {
		const newData = data.filter((_, i) => i !== index);
		setData(newData);
	};
	return (
		<>
			<TableRow>
				<TableCell>{data[index].customer_id}</TableCell>
				<TableCell>{data[index].customer_po}</TableCell>
				<TableCell>{data[index].order_date}</TableCell>
				<TableCell>{data[index].line_number}</TableCell>
				<TableCell>{data[index].part_number}</TableCell>
				<TableCell>{data[index].description}</TableCell>
				<TableCell>{data[index].quantity}</TableCell>
				<TableCell>{data[index].ship_via}</TableCell>
				<TableCell>{data[index].balance}</TableCell>
				<TableCell>{data[index].required_date}</TableCell>
				<TableCell>{data[index].confirmed_date}</TableCell>
				<TableCell>{data[index].status}</TableCell>
				<TableCell>
					<Box display="flex" justifyContent="flex-start" alignItems="center">
						<Button onClick={handleEdit} variant="text" color="primary">
							Edit
						</Button>
						<Button
							onClick={handleDelete}
							variant="text"
							color="error"
							style={{ marginLeft: 8 }} // Add some space between the buttons
						>
							Delete
						</Button>
					</Box>
				</TableCell>
			</TableRow>
		</>
	);
};

OrderLineStatic.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			order_id: PropTypes.number.isRequired,
			customer_id: PropTypes.string.isRequired,
			customer_po: PropTypes.string.isRequired,
			order_date: PropTypes.string.isRequired,
			line_number: PropTypes.string.isRequired,
			part_number: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			quantity: PropTypes.number.isRequired,
			ship_via: PropTypes.string.isRequired,
			balance: PropTypes.number.isRequired,
			required_date: PropTypes.string.isRequired,
			confirmed_date: PropTypes.string,
			status: PropTypes.string.isRequired,
		})
	).isRequired,
	setData: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	staticArr: PropTypes.arrayOf(PropTypes.bool),
	setStaticArr: PropTypes.func.isRequired,
};

export default OrderLineStatic;
