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
							<TableCell sx={{ whiteSpace: "nowrap" }}>Line Number</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Quantity</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Unit</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Part Number</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>DWG Number</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Revision</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>HTS Code</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Description</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Ship Via</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Required Date</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Confirmed Date</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Material</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Unit Weight(KG)</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Unit Price</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Surcharge</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Surcharge Rate (%)</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Discount (%)</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Total Price</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Pay Terms</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Action</TableCell>
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
