import PropTypes from "prop-types";
import { Dialog, Box, DialogContent, Button, TableCell, TableRow, DialogActions, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrderLine } from "../../../../../redux/poFilterWindowSlice";

const OrderLineStatic = ({ index }) => {
	const [openDialog, setOpenDialog] = useState(false);
	const dispatch = useDispatch();
	const { data, staticArr } = useSelector((state) => state.poFilterWindow);

	// Edit mode handler
	const handleEdit = () => {
		dispatch({ type: "poFilterWindow/setEditMode", payload: { index, editMode: staticArr[index] } });
	};

	// Handle delete operation
	const handleDeleteClick = () => {
		dispatch(deleteOrderLine(data[index].orderline_id)); // Dispatch the delete action
		setOpenDialog(false); // Close the dialog
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
				<TableCell>{data[index].pay_terms}</TableCell>
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
	index: PropTypes.number.isRequired,
};
export default OrderLineStatic;
