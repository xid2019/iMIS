import OrderLineStatic from "./OrderLineStatic/OrderLineStatic";
import OrderLineEditting from "./OrderLineEditting/OrderLineEditting";
import { TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow, Box } from "@mui/material";
import { useSelector } from "react-redux";

const OrderLineTable = () => {
	const { data, staticArr } = useSelector((state) => state.poEntryWindow);
	return (
		<Box sx={{ padding: 2 }}>
			<TableContainer component={Paper} sx={{ maxHeight: "500px", minWidth: "1000px", maxWidth: "100%", overflowX: "auto" }}>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell>Customer ID</TableCell>
							<TableCell>Customer PO</TableCell>
							<TableCell>Order Date</TableCell>
							<TableCell>Line Number</TableCell>
							<TableCell>Part Number</TableCell>
							<TableCell>Description</TableCell>
							<TableCell>Quantity</TableCell>
							<TableCell>Ship Via</TableCell>
							<TableCell>Balance</TableCell>
							<TableCell>Required Date</TableCell>
							<TableCell>Confirmed Date</TableCell>
							<TableCell>DWG Number</TableCell>
							<TableCell>Revision</TableCell>
							<TableCell>Unit Price</TableCell>
							<TableCell>Material</TableCell>
							<TableCell>Unit Weight(KG)</TableCell>
							<TableCell>Factory</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row, index) =>
							staticArr[index] ? <OrderLineStatic key={index} index={index} /> : <OrderLineEditting key={index} index={index} />
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default OrderLineTable;
