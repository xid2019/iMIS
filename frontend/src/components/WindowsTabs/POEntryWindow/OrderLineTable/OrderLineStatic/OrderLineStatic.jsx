import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Box, Button, TableCell, TableRow } from "@mui/material";

const OrderLineStatic = ({ index }) => {
	const dispatch = useDispatch();
	const { data, staticArr } = useSelector((state) => state.poEntryWindow);
	// Edit mode handler
	const handleEdit = () => {
		dispatch({ type: "poEntryWindow/setEditMode", payload: { index, editMode: staticArr[index] } });
	};

	const handleDelete = () => {
		dispatch({ type: "poEntryWindow/deleteOrderLineInTable", payload: index });
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
				<TableCell>{data[index].dwg_number}</TableCell>
				<TableCell>{data[index].revision}</TableCell>
				<TableCell>{data[index].price}</TableCell>
				<TableCell>{data[index].material}</TableCell>
				<TableCell>{data[index].weight}</TableCell>
				<TableCell>{data[index].factory}</TableCell>
				<TableCell>{data[index].status}</TableCell>
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
		</>
	);
};

OrderLineStatic.propTypes = {
	index: PropTypes.number.isRequired,
};

export default OrderLineStatic;
