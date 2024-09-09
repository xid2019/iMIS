import PropTypes from "prop-types";
import { Box, Button, TableCell, TableRow } from "@mui/material";

const InvoiceLineStatic = ({ data, setData, index, staticArr, setStaticArr }) => {
	const handleEdit = () => {
		const newStaticArr = [...staticArr];
		newStaticArr[index] = false;
		setStaticArr(newStaticArr);
	};

	const handleDelete = () => {
		const newData = data.filter((_, i) => i !== index);
		setData(newData);
	};
	return (
		<TableRow>
			<TableCell>{data[index].line_number}</TableCell>
			<TableCell>{data[index].quantity}</TableCell>
			<TableCell>{data[index].unit}</TableCell>
			<TableCell>{data[index].part_number}</TableCell>
			<TableCell>{data[index].dwg_number}</TableCell>
			<TableCell>{data[index].revision}</TableCell>
			<TableCell>{data[index].hts_code}</TableCell>
			<TableCell>{data[index].description}</TableCell>
			<TableCell>{data[index].ship_via}</TableCell>
			<TableCell>{data[index].required_date}</TableCell>
			<TableCell>{data[index].confirmed_date}</TableCell>
			<TableCell>{data[index].material}</TableCell>
			<TableCell>{data[index].weight}</TableCell>
			<TableCell>{data[index].price}</TableCell>
			<TableCell>{data[index].total_price}</TableCell>
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

InvoiceLineStatic.propTypes = {
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

export default InvoiceLineStatic;