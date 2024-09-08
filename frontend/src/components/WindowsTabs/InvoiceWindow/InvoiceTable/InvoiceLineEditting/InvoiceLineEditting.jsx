import PropTypes from "prop-types";
import { FormControl, Select, MenuItem, Button, TextField, TableCell, TableRow } from "@mui/material";
import { useState } from "react";

const InvoiceLineEditting = ({ data, setData, index, staticArr, setStaticArr }) => {
	const [formData, setFormData] = useState(data[index]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		const newValue = name === "price" || name === "quantity" || name === "weight" ? parseFloat(value) : value;
		setFormData((prev) => ({
			...prev,
			[name]: newValue,
			total_price: prev.price * prev.quantity,
		}));
	};

	const handleSave = async () => {
		const newData = [...data];
		newData[index] = formData;
		setData(newData);
		const newStaticArr = [...staticArr];
		newStaticArr[index] = true;
		setStaticArr(newStaticArr);
	};

	return (
		<TableRow>
			<TableCell>{formData.line_number}</TableCell>
			<TableCell>
				<TextField value={formData.quantity} type="number" name="quantity" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={formData.unit || ""} name="unit" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={formData.part_number || ""} name="part_number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={formData.dwg_number || ""} name="dwg_number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={formData.revision || ""} name="revision" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={formData.hts_code || ""} name="hts_code" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={formData.description || ""} name="description" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<FormControl variant="outlined">
					<Select name="ship_via" value={formData.ship_via} onChange={handleChange}>
						<MenuItem value="Exp">Exp</MenuItem>
						<MenuItem value="Air">Air</MenuItem>
						<MenuItem value="Sea">Sea</MenuItem>
					</Select>
				</FormControl>
			</TableCell>
			<TableCell>
				<TextField name="required_date" type="date" value={formData.required_date || ""} onChange={handleChange} variant="outlined" />
			</TableCell>
			<TableCell>
				<TextField name="confirmed_date" type="date" value={formData.confirmed_date || ""} onChange={handleChange} variant="outlined" />
			</TableCell>
			<TableCell>
				<TextField name="material" value={formData.material || ""} onChange={handleChange} variant="outlined" />
			</TableCell>
			<TableCell>
				<TextField name="weight" type="number" value={formData.weight || ""} onChange={handleChange} variant="outlined" />
			</TableCell>
			<TableCell>
				<TextField value={formData.price || ""} name="price" type="number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>{formData.total_price}</TableCell>
			<TableCell>
				<Button onClick={handleSave} variant="text">
					Save
				</Button>
			</TableCell>
		</TableRow>
	);
};

InvoiceLineEditting.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			line_number: PropTypes.string.isRequired,
			part_number: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			quantity: PropTypes.number.isRequired,
			unit: PropTypes.string,
			ship_via: PropTypes.string.isRequired,
			required_date: PropTypes.string.isRequired,
			confirmed_date: PropTypes.string,
			dwg_number: PropTypes.string.isRequired,
			revision: PropTypes.string.isRequired,
			material: PropTypes.string.isRequired,
			weight: PropTypes.number.isRequired,
			price: PropTypes.number.isRequired,
			hts_code: PropTypes.string,
			total_price: PropTypes.number,
		})
	).isRequired,
	setData: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	staticArr: PropTypes.arrayOf(PropTypes.bool),
	setStaticArr: PropTypes.func.isRequired,
};

export default InvoiceLineEditting;
