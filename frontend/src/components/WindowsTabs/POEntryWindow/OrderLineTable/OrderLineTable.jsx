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
							<TableCell sx={{ whiteSpace: "nowrap" }}>Customer ID</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Customer PO</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Order Date</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Line Number</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Part Number</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Description</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Quantity</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Ship Via</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Balance</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Required Date</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Confirmed Date</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>DWG Number</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Revision</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Unit Price</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Material</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Unit Weight(KG)</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Factory</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Status</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Pay Terms</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Address Line 1</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Address Line 2</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Address Line 3</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Address Line 4</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.length === 0 ? (
							<TableRow>
								<TableCell colSpan={20} style={{ textAlign: "center", color: "gray" }}>
									No Data Input
								</TableCell>
							</TableRow>
						) : (
							data.map((row, index) =>
								staticArr[index] ? <OrderLineStatic key={index} index={index} /> : <OrderLineEditting key={index} index={index} />
							)
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default OrderLineTable;
