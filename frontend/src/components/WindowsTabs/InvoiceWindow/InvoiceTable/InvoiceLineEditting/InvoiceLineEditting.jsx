import PropTypes from "prop-types";
import { FormControl, Select, MenuItem, Button, TextField, TableCell, TableRow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const InvoiceLineEditting = ({ index }) => {
	const dispatch = useDispatch();
	const { orderLineData, orderLineStaticArr } = useSelector((state) => state.invoiceWindow);

	const handleChange = (e) => {
		let { name, value } = e.target;
		let updatedOrderLine = {
			...orderLineData[index],
		};
		if (name === "price" || name === "quantity" || name === "weight" || name === "surcharge_rate" || name === "discount" || name === "balance") {
			value = parseFloat(value);
		}

		if (name === "price" || name === "quantity" || name === "surcharge_rate" || name === "discount" || name === "balance") {
			let totalPrice;
			if (name === "price") {
				totalPrice =
					value *
					(orderLineData[index].quantity + orderLineData[index].balance) *
					(1 - orderLineData[index].discount / 100) *
					(1 + orderLineData[index].surcharge_rate / 100);
			}
			if (name === "quantity") {
				totalPrice =
					(value + orderLineData[index].balance) *
					orderLineData[index].price *
					(1 - orderLineData[index].discount / 100) *
					(1 + orderLineData[index].surcharge_rate / 100);
			}
			if (name === "surcharge_rate") {
				totalPrice =
					orderLineData[index].price *
					(orderLineData[index].quantity + orderLineData[index].balance) *
					(1 - orderLineData[index].discount / 100) *
					(1 + value / 100);
			}
			if (name === "discount") {
				totalPrice =
					orderLineData[index].price *
					(orderLineData[index].quantity + orderLineData[index].balance) *
					(1 - value / 100) *
					(1 + orderLineData[index].surcharge_rate / 100);
			}
			if (name === "balance") {
				totalPrice =
					orderLineData[index].price *
					(orderLineData[index].quantity + value) *
					(1 - orderLineData[index].discount / 100) *
					(1 + orderLineData[index].surcharge_rate / 100);
			}
			totalPrice = totalPrice.toFixed(2);
			updatedOrderLine = {
				...updatedOrderLine,
				[name]: value,
				total_price: totalPrice,
			};
		} else {
			updatedOrderLine = {
				...updatedOrderLine,
				[name]: value,
			};
		}

		dispatch({ type: "invoiceWindow/updateOrderLineInTable", payload: { index, updatedOrderLine } });
	};

	const handleSave = async () => {
		dispatch({ type: "invoiceWindow/setOrderLineEditMode", payload: { index, editMode: orderLineStaticArr[index] } });
	};

	return (
		<TableRow>
			<TableCell>{orderLineData[index].line_number}</TableCell>
			<TableCell>
				<TextField value={orderLineData[index].quantity} type="number" name="quantity" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={orderLineData[index].balance} type="number" name="balance" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={orderLineData[index].unit || ""} name="unit" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={orderLineData[index].part_number || ""} name="part_number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={orderLineData[index].dwg_number || ""} name="dwg_number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={orderLineData[index].revision || ""} name="revision" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={orderLineData[index].hts_code || ""} name="hts_code" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={orderLineData[index].description || ""} name="description" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<FormControl variant="outlined">
					<Select name="ship_via" value={orderLineData[index].ship_via} onChange={handleChange}>
						<MenuItem value="Exp">Exp</MenuItem>
						<MenuItem value="Air">Air</MenuItem>
						<MenuItem value="Sea">Sea</MenuItem>
					</Select>
				</FormControl>
			</TableCell>
			<TableCell>
				<TextField name="required_date" type="date" value={orderLineData[index].required_date || ""} onChange={handleChange} variant="outlined" />
			</TableCell>
			<TableCell>
				<TextField name="confirmed_date" type="date" value={orderLineData[index].confirmed_date || ""} onChange={handleChange} variant="outlined" />
			</TableCell>
			<TableCell>
				<TextField name="material" value={orderLineData[index].material || ""} onChange={handleChange} variant="outlined" />
			</TableCell>
			<TableCell>
				<TextField name="weight" type="number" value={orderLineData[index].weight || ""} onChange={handleChange} variant="outlined" />
			</TableCell>
			<TableCell>
				<TextField value={orderLineData[index].price || ""} name="price" type="number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={orderLineData[index].surcharge || ""} name="surcharge" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={orderLineData[index].surcharge_rate || ""} name="surcharge_rate" type="number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={orderLineData[index].discount || ""} name="discount" type="number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>{orderLineData[index].total_price}</TableCell>
			<TableCell>
				<FormControl variant="outlined">
					<Select name="pay_terms" value={orderLineData[index].pay_terms || ""} onChange={handleChange}>
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

InvoiceLineEditting.propTypes = {
	index: PropTypes.number.isRequired,
};

export default InvoiceLineEditting;
