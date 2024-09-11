import PropTypes from "prop-types";
import { Box, Button, TableCell, TableRow } from "@mui/material";

const ExtraChargeLineStatic = ({ extraChargeData, setData, index, extraChargeTableStaticArr, setExtraChargeTableStaticArr }) => {
	const handleEdit = () => {
		const newExtraChargeTableStaticArr = [...extraChargeTableStaticArr];
		newExtraChargeTableStaticArr[index] = false;
		setExtraChargeTableStaticArr(newExtraChargeTableStaticArr);
	};

	const handleDelete = () => {
		const newData = extraChargeData.filter((_, i) => i !== index);
		setData((prev) => ({
			...prev,
			extraChargeData: newData,
		}));
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

export default ExtraChargeLineStatic;
