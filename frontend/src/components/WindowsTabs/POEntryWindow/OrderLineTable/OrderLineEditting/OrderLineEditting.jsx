import PropTypes from "prop-types";
import { FormControl, Select, MenuItem, Button, TextField, TableCell, TableRow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const OrderLineEditting = ({ index }) => {
	const dispatch = useDispatch();
	const { data, staticArr } = useSelector((state) => state.poEntryWindow);

	const handleChange = (e) => {
		const { name, value } = e.target;
		const updatedOrderLine = {
			...data[index],
			[name]: value,
		};
		dispatch({ type: "poEntryWindow/updateOrderLineInTable", payload: { index, updatedOrderLine } });
	};
	const handleSave = async () => {
		dispatch({ type: "poEntryWindow/setEditMode", payload: { index, editMode: staticArr[index] } });
	};

	return (
		<TableRow>
			<TableCell>{data[index].customer_id}</TableCell>
			<TableCell>{data[index].customer_po}</TableCell>
			<TableCell>{data[index].order_date}</TableCell>
			<TableCell>
				<TextField value={data[index].line_number} name="line_number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={data[index].part_number} name="part_number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={data[index].description} name="description" variant="outlined" onChange={handleChange} />
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
				<TextField name="required_date" type="date" value={data[index].required_date} onChange={handleChange} variant="outlined" />
			</TableCell>
			<TableCell>
				<TextField name="confirmed_date" type="date" value={data[index].confirmed_date} onChange={handleChange} variant="outlined" />
			</TableCell>
			<TableCell>
				<TextField name="dwg_number" value={data[index].dwg_number} onChange={handleChange} variant="outlined" />
			</TableCell>
			<TableCell>
				<TextField name="revision" value={data[index].revision} onChange={handleChange} variant="outlined" />
			</TableCell>
			<TableCell>
				<TextField value={data[index].price} name="price" type="number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField name="material" value={data[index].material} onChange={handleChange} variant="outlined" />
			</TableCell>
			<TableCell>
				<TextField value={data[index].weight} name="weight" type="number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={data[index].factory} name="factory" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<FormControl variant="outlined">
					<Select name="status" value={data[index].status} onChange={handleChange}>
						<MenuItem value="OPEN">OPEN</MenuItem>
						<MenuItem value="DELIVERED">DELIVERED</MenuItem>
						<MenuItem value="SHIPPED">SHIPPED</MenuItem>
					</Select>
				</FormControl>
			</TableCell>
			<TableCell>
				<FormControl variant="outlined">
					<Select name="pay_terms" value={data[index].pay_terms} onChange={handleChange}>
						<MenuItem value="net 7 days">Net 7 Days</MenuItem>
						<MenuItem value="net 10 days">Net 10 Days</MenuItem>
						<MenuItem value="net 15 days">Net 15 Days</MenuItem>
						<MenuItem value="net 30 days">Net 30 Days</MenuItem>
						<MenuItem value="net 60 days">Net 60 Days</MenuItem>
						<MenuItem value="net 90 days">Net 90 Days</MenuItem>
						<MenuItem value="due upon receipt">Due Upon Receipt</MenuItem>
					</Select>
				</FormControl>
			</TableCell>
			<TableCell>
				<Button onClick={handleSave} variant="text">
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
