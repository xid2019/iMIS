import PropTypes from "prop-types";
import { Dialog, Box, DialogContent, Button, TableCell, TableRow, DialogActions, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrderLine } from "../../../../../redux/orderLinesSlice";

const OrderLineStatic = ({ index, data }) => {
	const [openDialog, setOpenDialog] = useState(false);
	const dispatch = useDispatch();
	const { staticArr } = useSelector((state) => state.orderLines);

	// Edit mode handler
	const handleEdit = () => {
		dispatch({ type: "orderLines/setEditMode", payload: { index, editMode: staticArr[index] } });
	};

	// Handle delete operation
	const handleDeleteClick = () => {
		dispatch(deleteOrderLine(data.orderline_id)); // Dispatch the delete action
		setOpenDialog(false); // Close the dialog
	};

	return (
		<>
			<TableRow>
				<TableCell>{data.customer_id}</TableCell>
				<TableCell>{data.customer_po}</TableCell>
				<TableCell>{data.order_date}</TableCell>
				<TableCell>{data.line_number}</TableCell>
				<TableCell>{data.part_number}</TableCell>
				<TableCell>{data.description}</TableCell>
				<TableCell>{data.quantity}</TableCell>
				<TableCell>{data.ship_via}</TableCell>
				<TableCell>{data.balance}</TableCell>
				<TableCell>{data.required_date}</TableCell>
				<TableCell>{data.confirmed_date}</TableCell>
				<TableCell>{data.dwg_number}</TableCell>
				<TableCell>{data.revision}</TableCell>
				<TableCell>{data.price}</TableCell>
				<TableCell>{data.material}</TableCell>
				<TableCell>{data.weight}</TableCell>
				<TableCell>{data.factory}</TableCell>
				<TableCell>{data.status}</TableCell>
				<TableCell>
					<Box display="flex" justifyContent="flex-start" alignItems="center">
						<Button onClick={handleEdit} variant="text" color="primary">
							Edit
						</Button>
						<Button
							onClick={() => setOpenDialog(true)}
							variant="text"
							color="error"
							style={{ marginLeft: 8 }} // Add some space between the buttons
						>
							Delete
						</Button>
					</Box>
				</TableCell>
			</TableRow>

			<Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
				<DialogTitle>Confirm Deletion</DialogTitle>
				<DialogContent>
					<Typography>Are you sure you want to delete this order line?</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenDialog(false)} color="primary">
						Cancel
					</Button>
					<Button onClick={handleDeleteClick} color="error">
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

OrderLineStatic.propTypes = {
	data: PropTypes.shape({
		order_id: PropTypes.number.isRequired,
		customer_id: PropTypes.string.isRequired,
		customer_po: PropTypes.string.isRequired,
		order_date: PropTypes.string.isRequired,
		orderline_id: PropTypes.number,
		line_number: PropTypes.string,
		part_number: PropTypes.string,
		description: PropTypes.string,
		quantity: PropTypes.number,
		ship_via: PropTypes.string,
		balance: PropTypes.number,
		required_date: PropTypes.string,
		confirmed_date: PropTypes.string,
		dwg_number: PropTypes.string,
		revision: PropTypes.string,
		price: PropTypes.number,
		material: PropTypes.string,
		weight: PropTypes.number,
		factory: PropTypes.string,
		status: PropTypes.string,
	}).isRequired,
	index: PropTypes.number.isRequired,
};
export default OrderLineStatic;
