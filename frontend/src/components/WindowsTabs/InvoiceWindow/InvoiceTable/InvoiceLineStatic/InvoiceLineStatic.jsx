import PropTypes from "prop-types";
import { Box, Button, TableCell, TableRow } from "@mui/material";

const InvoiceLineStatic = ({ invoiceData, setData, index, invoiceTableStaticArr, setInvoiceTableStaticArr }) => {
	const handleEdit = () => {
		const newInvoiceTableStaticArr = [...invoiceTableStaticArr];
		newInvoiceTableStaticArr[index] = false;
		setInvoiceTableStaticArr(newInvoiceTableStaticArr);
	};

	const handleDelete = () => {
		const newData = invoiceData.filter((_, i) => i !== index);
		setData((prev) => ({
			...prev,
			invoiceData: newData,
		}));
	};
	return (
		<TableRow>
			<TableCell>{invoiceData[index].line_number}</TableCell>
			<TableCell>{invoiceData[index].quantity}</TableCell>
			<TableCell>{invoiceData[index].unit}</TableCell>
			<TableCell>{invoiceData[index].part_number}</TableCell>
			<TableCell>{invoiceData[index].dwg_number}</TableCell>
			<TableCell>{invoiceData[index].revision}</TableCell>
			<TableCell>{invoiceData[index].hts_code}</TableCell>
			<TableCell>{invoiceData[index].description}</TableCell>
			<TableCell>{invoiceData[index].ship_via}</TableCell>
			<TableCell>{invoiceData[index].required_date}</TableCell>
			<TableCell>{invoiceData[index].confirmed_date}</TableCell>
			<TableCell>{invoiceData[index].material}</TableCell>
			<TableCell>{invoiceData[index].weight}</TableCell>
			<TableCell>{invoiceData[index].price}</TableCell>
			<TableCell>{invoiceData[index].total_price}</TableCell>
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
	invoiceData: PropTypes.arrayOf(
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
	invoiceTableStaticArr: PropTypes.arrayOf(PropTypes.bool),
	setInvoiceTableStaticArr: PropTypes.func.isRequired,
};

export default InvoiceLineStatic;
