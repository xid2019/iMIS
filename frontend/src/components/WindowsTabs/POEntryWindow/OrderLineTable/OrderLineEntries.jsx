import OrderLineStatic from "./OrderLineStatic/OrderLineStatic";
import OrderLineEditting from "./OrderLineEditting/OrderLineEditting";
import { TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow, Box } from "@mui/material";
import PropTypes from "prop-types";

const OrderLineEntries = ({ data, setData, staticArr, setStaticArr }) => {
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
							<TableCell>Status</TableCell>
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row, index) =>
							staticArr[index] ? (
								<OrderLineStatic key={index} index={index} data={data} setData={setData} staticArr={staticArr} setStaticArr={setStaticArr} />
							) : (
								<OrderLineEditting key={index} index={index} data={data} setData={setData} staticArr={staticArr} setStaticArr={setStaticArr} />
							)
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

OrderLineEntries.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			order_id: PropTypes.number.isRequired,
			customer_id: PropTypes.string.isRequired,
			customer_po: PropTypes.string.isRequired,
			order_date: PropTypes.string.isRequired,
			line_number: PropTypes.string.isRequired,
			part_number: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			quantity: PropTypes.number.isRequired,
			ship_via: PropTypes.string.isRequired,
			balance: PropTypes.number.isRequired,
			required_date: PropTypes.string.isRequired,
			confirmed_date: PropTypes.string,
			status: PropTypes.string.isRequired,
		})
	).isRequired,
	setData: PropTypes.func.isRequired,
	staticArr: PropTypes.arrayOf(PropTypes.bool).isRequired,
	setStaticArr: PropTypes.func.isRequired,
};

export default OrderLineEntries;
