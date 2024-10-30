import PropTypes from "prop-types";
import { FormControl, Select, MenuItem, Button, TextField, TableCell, TableRow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const roundToTwoDecimals = (num) => {
	return Math.round(num * 100) / 100;
};
const InvoiceLineEditting = ({ index }) => {
	const dispatch = useDispatch();
	const { orderLineData, orderLineStaticArr } = useSelector((state) => state.invoiceWindow);

	const handleChange = (e) => {
		let { name, value } = e.target;
		let updatedOrderLine = {
			...orderLineData[index],
		};
		if (name === "price" || name === "quantity" || name === "weight" || name === "surcharge_rate" || name === "discount" || name === "balance") {
			value = parseFloat(value) || 0;
		}

		if (name === "price" || name === "quantity" || name === "surcharge_rate" || name === "discount" || name === "balance") {
			let totalPrice;
			let price = orderLineData[index].price || 0;
			let quantity = orderLineData[index].quantity || 0;
			let balance = orderLineData[index].balance || 0;
			let discount = orderLineData[index].discount || 0;
			let surchargeRate = orderLineData[index].surcharge_rate || 0;
			if (name === "price") {
				price = Number(value) || 0;
			} else if (name === "quantity") {
				quantity = value || 0;
			} else if (name === "surcharge_rate") {
				surchargeRate = value || 0;
			} else if (name === "discount") {
				discount = value || 0;
			} else if (name === "balance") {
				balance = value || 0;
			}
			if (updatedOrderLine.include_surcharge === true) {
				totalPrice = roundToTwoDecimals(price * (1 - discount / 100) * (1 + surchargeRate / 100)) * (quantity + balance);
			} else if (updatedOrderLine.surcharge_line === false) {
				totalPrice = roundToTwoDecimals(price * (1 - discount / 100)) * (quantity + balance);
			} else {
				totalPrice = roundToTwoDecimals((price * (1 - discount / 100) * surchargeRate) / 100) * (quantity + balance);
			}

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
				<FormControl variant="outlined">
					<Select name="unit" value={orderLineData[index].unit || ""} onChange={handleChange}>
						<MenuItem value="EACH">EACH</MenuItem>
						<MenuItem value="KG">KG</MenuItem>
					</Select>
				</FormControl>
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
				<TextField value={orderLineData[index].ship_via || ""} name="ship_via" variant="outlined" onChange={handleChange} />
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
