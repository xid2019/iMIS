import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Box, Button, TableCell, TableRow } from "@mui/material";

const InventoryItemStatic = ({ index }) => {
	const dispatch = useDispatch();
	const { data, staticArr } = useSelector((state) => state.inventoryWindow);

	const handleEdit = () => {
		dispatch({ type: "inventoryWindow/setEditMode", payload: { index, editMode: staticArr[index] } });
	};

	const handleDelete = () => {
		dispatch({ type: "inventoryWindow/deleteOrderLineInTable", payload: index });
	};
	return (
		<>
			<TableRow>
				<TableCell>{data[index].id}</TableCell>
				<TableCell>{data[index].part_number}</TableCell>
				<TableCell>{data[index].dwg_number}</TableCell>
				<TableCell>{data[index].revision}</TableCell>
				<TableCell>{data[index].description}</TableCell>
				<TableCell>{data[index].material}</TableCell>
				<TableCell>{data[index].weight}</TableCell>
				<TableCell>{data[index].factory}</TableCell>
				<TableCell>{data[index].min_inventory}</TableCell>
				<TableCell>{data[index].max_inventory}</TableCell>
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

InventoryItemStatic.propTypes = {
	index: PropTypes.number.isRequired,
};

export default InventoryItemStatic;
