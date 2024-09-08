import InvoiceLineEditting from "./InvoiceLineEditting/InvoiceLineEditting";
import InvoiceLineStatic from "./InvoiceLineStatic/InvoiceLineStatic";
import { TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow, Box } from "@mui/material";
import PropTypes from "prop-types";

const InvoiceTable = ({ data, setData, staticArr, setStaticArr }) => {
	return (
		<Box sx={{ padding: 2 }}>
			<TableContainer component={Paper} sx={{ maxHeight: "500px", minWidth: "1000px", maxWidth: "100%", overflowX: "auto" }}>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell>Line Number</TableCell>
							<TableCell>Quantity</TableCell>
							<TableCell>Unit</TableCell>
							<TableCell>Part Number</TableCell>
							<TableCell>DWG Number</TableCell>
							<TableCell>Revision</TableCell>
							<TableCell>HTS Code</TableCell>
							<TableCell>Description</TableCell>
							<TableCell>Ship Via</TableCell>
							<TableCell>Required Date</TableCell>
							<TableCell>Confirmed Date</TableCell>
							<TableCell>Material</TableCell>
							<TableCell>Unit Weight(KG)</TableCell>
							<TableCell>Unit Price</TableCell>
							<TableCell>Total Price</TableCell>
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row, index) =>
							staticArr[index] ? (
								<InvoiceLineStatic key={index} index={index} data={data} setData={setData} staticArr={staticArr} setStaticArr={setStaticArr} />
							) : (
								<InvoiceLineEditting key={index} index={index} data={data} setData={setData} staticArr={staticArr} setStaticArr={setStaticArr} />
							)
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

InvoiceTable.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			line_number: PropTypes.string,
			quantity: PropTypes.number,
			unit: PropTypes.string,
			part_number: PropTypes.string,
			dwg_number: PropTypes.string,
			revision: PropTypes.string,
			hts_code: PropTypes.string,
			description: PropTypes.string,
			ship_via: PropTypes.string,
			required_date: PropTypes.string,
			confirmed_date: PropTypes.string,
			material: PropTypes.string,
			weight: PropTypes.number,
			price: PropTypes.number,
			total_price: PropTypes.number,
		})
	).isRequired,
	setData: PropTypes.func.isRequired,
	staticArr: PropTypes.arrayOf(PropTypes.bool).isRequired,
	setStaticArr: PropTypes.func.isRequired,
};

export default InvoiceTable;
