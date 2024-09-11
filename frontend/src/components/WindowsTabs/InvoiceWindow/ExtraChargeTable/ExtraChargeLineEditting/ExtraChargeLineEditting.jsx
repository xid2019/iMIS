import PropTypes from "prop-types";
import { Button, TextField, TableCell, TableRow } from "@mui/material";
import { useState } from "react";

const ExtraChargeLineEditting = ({ extraChargeData, setData, index, extraChargeTableStaticArr, setExtraChargeTableStaticArr }) => {
	const [formData, setFormData] = useState(extraChargeData[index]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		const newValue = name === "count" || name === "charge" || name === "expense" ? parseFloat(value) : value;
		setFormData((prev) => {
			return {
				...prev,
				[name]: newValue,
			};
		});
	};

	const handleSave = async () => {
		const newExtraChargeData = [...extraChargeData];
		newExtraChargeData[index] = formData;
		setData((prev) => ({
			...prev,
			extraChargeData: newExtraChargeData,
		}));
		const newStaticArr = [...extraChargeTableStaticArr];
		newStaticArr[index] = true;
		setExtraChargeTableStaticArr(newStaticArr);
	};

	return (
		<TableRow>
			<TableCell>
				<TextField value={formData.extraChargeEntry} name="extraChargeEntry" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={formData.count || ""} type="number" name="count" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={formData.charge || ""} type="number" name="charge" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={formData.expense || ""} type="number" name="expense" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<Button onClick={handleSave} variant="text">
					Save
				</Button>
			</TableCell>
		</TableRow>
	);
};

ExtraChargeLineEditting.propTypes = {
	extraChargeData: PropTypes.arrayOf(
		PropTypes.shape({
			extraChargeEntry: PropTypes.string.isRequired,
			count: PropTypes.number.isRequired,
			charge: PropTypes.number.isRequired,
			expense: PropTypes.number.isRequired,
		})
	).isRequired,
	setData: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	extraChargeTableStaticArr: PropTypes.arrayOf(PropTypes.bool),
	setExtraChargeTableStaticArr: PropTypes.func.isRequired,
};

export default ExtraChargeLineEditting;
