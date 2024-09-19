import PropTypes from "prop-types";
import { FormControl, Select, MenuItem, Button, TextField, TableCell, TableRow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderLine } from "../../../../../redux/poFilterWindowSlice";

const OrderLineEditting = ({ index }) => {
	const dispatch = useDispatch();
	const { data, staticArr } = useSelector((state) => state.poFilterWindow);

	const handleChange = (e) => {
		const { name, value } = e.target;
		const updatedOrderLine = {
			...data[index],
			[name]: value,
		};
		dispatch({ type: "poFilterWindow/updateOrderLine", payload: { index, updatedOrderLine } });
	};

	// Save handler to update the order line
	const handleSave = (updatedData) => {
		dispatch(updateOrderLine(updatedData));
		dispatch({ type: "poFilterWindow/setEditMode", payload: { index, editMode: staticArr[index] } });
	};

	return (
		<TableRow>
			<TableCell>{data[index].customer_id || ""}</TableCell>
			<TableCell>{data[index].customer_po || ""}</TableCell>
			<TableCell>{data[index].order_date || ""}</TableCell>
			<TableCell>
				<TextField value={data[index].line_number || ""} name="line_number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={data[index].part_number || ""} name="part_number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={data[index].description || ""} name="description" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={data[index].quantity || ""} name="quantity" type="number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<FormControl variant="outlined">
					<Select name="ship_via" value={data[index].ship_via} onChange={handleChange}>
						<MenuItem value="Exp">Exp</MenuItem>
						<MenuItem value="Air">Air</MenuItem>
						<MenuItem value="Sea">Sea</MenuItem>
					</Select>
				</FormControl>
			</TableCell>
			<TableCell>
				<TextField value={data[index].balance || ""} name="balance" type="number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField name="required_date" type="date" value={data[index].required_date || ""} onChange={handleChange} variant="outlined" />
			</TableCell>
			<TableCell>
				<TextField name="confirmed_date" type="date" value={data[index].confirmed_date || ""} onChange={handleChange} variant="outlined" />
			</TableCell>
			<TableCell>
				<TextField value={data[index].dwg_number || ""} name="dwg_number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={data[index].revision || ""} name="revision" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={data[index].unit_price || ""} name="dwg_number" type="number" variant="outlined" onChange={handleChange} />
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
				<FormControl variant="outlined">
					<Select name="status" value={data[index].status || ""} onChange={handleChange}>
						<MenuItem value="OPEN">OPEN</MenuItem>
						<MenuItem value="DELIVERED">DELIVERED</MenuItem>
						<MenuItem value="SHIPPED">SHIPPED</MenuItem>
						<MenuItem value="INVOICED">INVOICED</MenuItem>
					</Select>
				</FormControl>
			</TableCell>
			<TableCell>
				<FormControl variant="outlined">
					<Select name="pay_terms" value={data[index].pay_terms || ""} onChange={handleChange}>
						<MenuItem value="Net 7 Days">Net 7 Days</MenuItem>
						<MenuItem value="Net 10 Days">Net 10 Days</MenuItem>
						<MenuItem value="Net 15 Days">Net 15 Days</MenuItem>
						<MenuItem value="Net 30 Days">Net 30 Days</MenuItem>
						<MenuItem value="Net 60 Days">Net 60 Days</MenuItem>
						<MenuItem value="Net 90 Days">Net 90 Days</MenuItem>
						<MenuItem value="Due Upon Receipt">Due Upon Receipt</MenuItem>
					</Select>
				</FormControl>
			</TableCell>
			<TableCell>
				<Button onClick={() => handleSave(data[index])} variant="text">
					Save
				</Button>
			</TableCell>
		</TableRow>
	);
};

OrderLineEditting.propTypes = {
	index: PropTypes.number.isRequired,
};

export default OrderLineEditting;
