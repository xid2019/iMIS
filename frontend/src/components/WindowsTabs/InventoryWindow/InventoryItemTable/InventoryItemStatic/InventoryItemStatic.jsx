import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Box, Button, TableCell, TableRow, Collapse, ToggleButton } from "@mui/material";
import { useState } from "react";
import InventoryRecordsTable from "../InventoryRecordsTable/InventoryRecordsTable";
import { deleteInventoryItem, fetchInventoryItems } from "../../../../../redux/inventoryWindowSlice";

const InventoryItemStatic = ({ index }) => {
	const dispatch = useDispatch();
	const { data, staticArr } = useSelector((state) => state.inventoryWindow);
	const [expanded, setExpanded] = useState(false); // State to manage the expansion

	const handleToggle = () => {
		setExpanded(!expanded);
	};

	const handleEdit = () => {
		dispatch({ type: "inventoryWindow/setEditMode", payload: { index, editMode: staticArr[index] } });
	};

	const handleDelete = async () => {
		await dispatch(deleteInventoryItem(data[index].id));
		dispatch(fetchInventoryItems());
	};

	const isLowInventory = data[index].quantity < data[index].min_inventory;
	const isHighInventory = data[index].quantity > data[index].max_inventory;

	return (
		<>
			<TableRow style={{ backgroundColor: isLowInventory ? "#ffcccc" : isHighInventory ? "#ffffcc" : "inherit" }}>
				<TableCell>{data[index].part_number}</TableCell>
				<TableCell>{data[index].dwg_number}</TableCell>
				<TableCell>{data[index].revision}</TableCell>
				<TableCell>{data[index].description}</TableCell>
				<TableCell>{data[index].material}</TableCell>
				<TableCell>{data[index].weight}</TableCell>
				<TableCell>{data[index].factory}</TableCell>
				<TableCell>{data[index].min_inventory}</TableCell>
				<TableCell>{data[index].max_inventory}</TableCell>
				<TableCell>{data[index].quantity}</TableCell>
				<TableCell>
					<Box display="flex" justifyContent="flex-start" alignItems="center">
						<Button onClick={handleEdit} variant="text" color="primary">
							Edit
						</Button>
						<Button onClick={handleDelete} variant="text" color="error" style={{ marginLeft: 8 }}>
							Delete
						</Button>
						<ToggleButton value="check" selected={expanded} onChange={handleToggle}>
							{expanded ? "−" : "+"} {/* Use symbols to represent expand/collapse */}
						</ToggleButton>
					</Box>
				</TableCell>
			</TableRow>
			{expanded && (
				<TableRow style={{ borderBottom: "1px solid #000" }}>
					<TableCell colSpan={12}>
						<Collapse in={expanded} timeout="auto" unmountOnExit>
							<InventoryRecordsTable inventoryItemId={data[index].id} />
						</Collapse>
					</TableCell>
				</TableRow>
			)}
		</>
	);
};

InventoryItemStatic.propTypes = {
	index: PropTypes.number.isRequired,
};

export default InventoryItemStatic;
