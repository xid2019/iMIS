import InvoiceLineEditting from "./InvoiceLineEditting/InvoiceLineEditting";
import InvoiceLineStatic from "./InvoiceLineStatic/InvoiceLineStatic";
import { TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow, Box } from "@mui/material";
import { useSelector } from "react-redux";

const InvoiceTable = () => {
	const { orderLineData, orderLineStaticArr } = useSelector((state) => state.invoiceWindow);
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
						{orderLineData.map((row, index) =>
							orderLineStaticArr[index] ? <InvoiceLineStatic key={index} index={index} /> : <InvoiceLineEditting key={index} index={index} />
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default InvoiceTable;
