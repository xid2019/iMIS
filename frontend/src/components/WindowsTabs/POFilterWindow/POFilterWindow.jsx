import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderLines } from "../../../redux/orderLinesSlice";
import OrderLineStatic from "./OrderLineTable/OrderLineStatic/OrderLineStatic";
import OrderLineEditting from "./OrderLineTable/OrderLineEditting/OrderLineEditting";
import { TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow, Grid, TextField, Button, Box, Typography } from "@mui/material";

const OrderLineWindow = () => {
	const dispatch = useDispatch();
	const { data, staticArr } = useSelector((state) => state.orderLines);

	const [filters, setFilters] = useState({
		customer_id: "",
		customer_po: "",
		order_date_after: "",
		order_date_before: "",
		required_date_after: "",
		required_date_before: "",
		status: "",
	});

	// Fetch data from the server using the current filters
	useEffect(() => {
		dispatch(fetchOrderLines(filters));
	}, [dispatch]);

	// Handle filter changes
	const handleFilterChange = (e) => {
		setFilters({ ...filters, [e.target.name]: e.target.value });
	};

	// Submit the filter and refetch data
	const handleFilterSubmit = () => {
		dispatch(fetchOrderLines(filters));
	};

	// Clear all filters
	const handleClearFilters = () => {
		const clearedFilters = {
			customer_id: "",
			customer_po: "",
			order_date_after: "",
			order_date_before: "",
			required_date_after: "",
			required_date_before: "",
			status: "",
		};
		setFilters(clearedFilters);
		dispatch(fetchOrderLines(clearedFilters));
	};

	return (
		<Paper>
			<Box sx={{ padding: 2 }}>
				<Grid container spacing={2} alignItems="center">
					<Grid item xs={12}>
						<Typography variant="h6" gutterBottom>
							Filter PO
						</Typography>
					</Grid>
					<Grid item xs={2}>
						<TextField
							name="customer_id"
							label="Customer ID"
							value={filters.customer_id}
							onChange={handleFilterChange}
							fullWidth
							variant="outlined"
						/>
					</Grid>
					<Grid item xs={2}>
						<TextField
							name="customer_po"
							label="Customer PO"
							value={filters.customer_po}
							onChange={handleFilterChange}
							fullWidth
							variant="outlined"
						/>
					</Grid>
					<Grid item xs={2}>
						<TextField
							name="part_number"
							label="Part Number"
							value={filters.part_number}
							onChange={handleFilterChange}
							fullWidth
							variant="outlined"
						/>
					</Grid>
					<Grid item xs={2}>
						<TextField
							name="order_date_after"
							label="Order Date After"
							type="date"
							value={filters.order_date_after}
							onChange={handleFilterChange}
							fullWidth
							variant="outlined"
							InputLabelProps={{ shrink: true }}
						/>
					</Grid>
					<Grid item xs={2}>
						<TextField
							name="order_date_before"
							label="Order Date Before"
							type="date"
							value={filters.order_date_before}
							onChange={handleFilterChange}
							fullWidth
							variant="outlined"
							InputLabelProps={{ shrink: true }}
						/>
					</Grid>
					<Grid item xs={2}>
						<TextField
							name="required_date_after"
							label="Required Date After"
							type="date"
							value={filters.required_date_after}
							onChange={handleFilterChange}
							fullWidth
							variant="outlined"
							InputLabelProps={{ shrink: true }}
						/>
					</Grid>
					<Grid item xs={2}>
						<TextField
							name="required_date_before"
							label="Required Date Before"
							type="date"
							value={filters.required_date_before}
							onChange={handleFilterChange}
							fullWidth
							variant="outlined"
							InputLabelProps={{ shrink: true }}
						/>
					</Grid>
					<Grid item xs={2}>
						<TextField name="status" label="Status" value={filters.status} onChange={handleFilterChange} fullWidth variant="outlined" />
					</Grid>
					<Grid item xs={12} container spacing={2}>
						<Grid item xs={2}>
							<Button variant="contained" color="primary" fullWidth onClick={handleFilterSubmit}>
								Apply Filters
							</Button>
						</Grid>
						<Grid item xs={2}>
							<Button variant="outlined" color="secondary" fullWidth onClick={handleClearFilters}>
								Clear Filters
							</Button>
						</Grid>
					</Grid>
				</Grid>
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
								staticArr[index] ? <OrderLineStatic key={index} index={index} data={row} /> : <OrderLineEditting key={index} data={row} />
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Paper>
	);
};

export default OrderLineWindow;
