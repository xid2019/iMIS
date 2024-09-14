import PropTypes from "prop-types";
import { Button, TextField, TableCell, TableRow } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

const ExtraChargeLineEditting = ({ index }) => {
	const { extraChargeData, extraChargeStaticArr } = useSelector((state) => state.invoiceWindow);
	const dispatch = useDispatch();
	const handleChange = (e) => {
		const { name, value } = e.target;
		const newValue = name === "count" || name === "charge" || name === "expense" ? parseFloat(value) : value;
		const updatedExtraCharge = {
			...extraChargeData[index],
			[name]: newValue,
		};
		dispatch({ type: "invoiceWindow/updateOrderLineInTable", payload: { index, updatedExtraCharge } });
	};

	const handleSave = async () => {
		dispatch({ type: "invoiceWindow/setExtraChargeEditMode", payload: { index, editMode: extraChargeStaticArr[index] } });
	};

	return (
		<TableRow>
			<TableCell>
				<TextField value={extraChargeData[index].extraChargeEntry} name="extraChargeEntry" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={extraChargeData[index].count || ""} type="number" name="count" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={extraChargeData[index].charge || ""} type="number" name="charge" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={extraChargeData[index].expense || ""} type="number" name="expense" variant="outlined" onChange={handleChange} />
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
	index: PropTypes.number.isRequired,
};

export default ExtraChargeLineEditting;
