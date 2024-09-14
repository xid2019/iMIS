import { Box, Button, TableCell, TableRow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

const InvoiceLineStatic = ({ index }) => {
	const dispatch = useDispatch();
	const { orderLineData, orderLineStaticArr } = useSelector((state) => state.invoiceWindow);
	const handleEdit = () => {
		dispatch({ type: "invoiceWindow/setOrderLineEditMode", payload: { index, editMode: orderLineStaticArr[index] } });
	};

	const handleDelete = () => {
		dispatch({ type: "invoiceWindow/deleteOrderLineInTable", payload: index });
	};
	return (
		<TableRow>
			<TableCell>{orderLineData[index].line_number}</TableCell>
			<TableCell>{orderLineData[index].quantity}</TableCell>
			<TableCell>{orderLineData[index].unit}</TableCell>
			<TableCell>{orderLineData[index].part_number}</TableCell>
			<TableCell>{orderLineData[index].dwg_number}</TableCell>
			<TableCell>{orderLineData[index].revision}</TableCell>
			<TableCell>{orderLineData[index].hts_code}</TableCell>
			<TableCell>{orderLineData[index].description}</TableCell>
			<TableCell>{orderLineData[index].ship_via}</TableCell>
			<TableCell>{orderLineData[index].required_date}</TableCell>
			<TableCell>{orderLineData[index].confirmed_date}</TableCell>
			<TableCell>{orderLineData[index].material}</TableCell>
			<TableCell>{orderLineData[index].weight}</TableCell>
			<TableCell>{orderLineData[index].price}</TableCell>
			<TableCell>{orderLineData[index].total_price}</TableCell>
			<TableCell>
				<Box display="flex" justifyContent="flex-start" alignItems="center">
					<Button onClick={handleEdit} variant="text" color="primary">
						Edit
					</Button>
					<Button onClick={handleDelete} variant="text" color="error" style={{ marginLeft: 8 }}>
						Delete
					</Button>
				</Box>
			</TableCell>
		</TableRow>
	);
};

InvoiceLineStatic.propTypes = {
	index: PropTypes.number.isRequired,
};

export default InvoiceLineStatic;
