import PropTypes from "prop-types";
import { Button, TextField, TableCell, TableRow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateInventoryItem } from "../../../../../redux/inventoryWindowSlice";

const InventoryItemEditting = ({ index }) => {
	const dispatch = useDispatch();
	const { data, staticArr } = useSelector((state) => state.inventoryWindow);

	const handleChange = (e) => {
		const { name, value } = e.target;
		const updatedInventoryItem = {
			...data[index],
			[name]: value,
		};
		dispatch({ type: "inventoryWindow/updateInventoryItem", payload: { index, updatedInventoryItem } });
	};

	const handleSave = (updatedData) => {
		dispatch(updateInventoryItem(updatedData));
		dispatch({ type: "inventoryWindow/setEditMode", payload: { index, editMode: staticArr[index] } });
	};

	return (
		<TableRow>
			<TableCell>{data[index].id || ""}</TableCell>
			<TableCell>
				<TextField value={data[index].part_number || ""} name="part_number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={data[index].dwg_number || ""} name="dwg_number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={data[index].revision || ""} name="revision" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={data[index].description || ""} name="description" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={data[index].material || ""} name="material" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={data[index].weight || ""} name="weight" type="number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={data[index].factory || ""} name="factory" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={data[index].min_inventory || ""} name="min_inventory" type="number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={data[index].max_inventory || ""} name="max_inventory" type="number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>{data[index].quantity}</TableCell>
			<TableCell>
				<Button onClick={() => handleSave(data[index])} variant="text">
					Save
				</Button>
			</TableCell>
		</TableRow>
	);
};

InventoryItemEditting.propTypes = {
	index: PropTypes.number.isRequired,
};

export default InventoryItemEditting;
