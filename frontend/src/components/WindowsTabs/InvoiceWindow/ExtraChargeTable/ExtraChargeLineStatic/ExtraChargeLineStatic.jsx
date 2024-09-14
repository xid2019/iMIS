import PropTypes from "prop-types";
import { Box, Button, TableCell, TableRow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const ExtraChargeLineStatic = ({ index }) => {
	const dispatch = useDispatch();
	const { extraChargeData, extraChargeStaticArr } = useSelector((state) => state.invoiceWindow);
	const handleEdit = () => {
		dispatch({ type: "invoiceWindow/setExtraChargeEditMode", payload: { index, editMode: extraChargeStaticArr[index] } });
	};

	const handleDelete = () => {
		dispatch({ type: "invoiceWindow/deleteExtraChargeInTable", payload: index });
	};
	return (
		<TableRow>
			<TableCell>{extraChargeData[index].extraChargeEntry}</TableCell>
			<TableCell>{extraChargeData[index].count}</TableCell>
			<TableCell>{extraChargeData[index].charge}</TableCell>
			<TableCell>{extraChargeData[index].expense}</TableCell>
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
	);
};

ExtraChargeLineStatic.propTypes = {
	index: PropTypes.number.isRequired,
};

export default ExtraChargeLineStatic;
