import {
	TableContainer,
	Checkbox,
	Paper,
	Table,
	TableBody,
	Grid,
	TextField,
	Typography,
	Divider,
	TableCell,
	TableHead,
	FormControlLabel,
	TableRow,
	Box,
	Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import InventoryItemStatic from "./InventoryItemStatic/InventoryItemStatic";
import { useEffect, useState } from "react";
import { fetchInventoryItems, applyFilters } from "../../../../redux/inventoryWindowSlice";
import InventoryItemEditting from "./InventoryItemEditting/InventoryItemEditting";

const InventoryItemTable = () => {
	const { data, staticArr } = useSelector((state) => state.inventoryWindow);
	const dispatch = useDispatch();
	// State for filters
	const [partNumberFilter, setPartNumberFilter] = useState("");
	const [minInventoryActive, setMinInventoryActive] = useState(false);
	const [maxInventoryActive, setMaxInventoryActive] = useState(false);

	useEffect(() => {
		dispatch(fetchInventoryItems());
	}, [dispatch]);

	const getBackgroundColor = (quantity, minInventory, maxInventory) => {
		if (quantity < minInventory) return "#ffcccc";
		if (quantity > maxInventory) return "#ffffcc";
		return "transparent";
	};

	const handleApplyFilters = () => {
		dispatch(
			applyFilters({
				partNumberFilter,
				minInventoryActive,
				maxInventoryActive,
			})
		);
	};

	return (
		<Box sx={{ padding: 2 }}>
			<Grid item xs={12}>
				<Typography variant="h6">Inventory Table</Typography>
				<Divider />
			</Grid>
			{/* Filter Inputs */}
			<Grid container spacing={2} sx={{ marginBottom: 2 }}>
				<Grid item xs={4}>
					<TextField label="Part Number" value={partNumberFilter} onChange={(e) => setPartNumberFilter(e.target.value)} fullWidth />
				</Grid>
				<Grid item xs={3}>
					<FormControlLabel
						control={<Checkbox checked={minInventoryActive} onChange={(e) => setMinInventoryActive(e.target.checked)} />}
						label="Quantity < Min Inventory"
					/>
				</Grid>
				<Grid item xs={3}>
					<FormControlLabel
						control={<Checkbox checked={maxInventoryActive} onChange={(e) => setMaxInventoryActive(e.target.checked)} />}
						label="Quantity > Max Inventory"
					/>
				</Grid>
				<Grid item>
					<Button variant="contained" color="primary" onClick={handleApplyFilters}>
						Apply Filters
					</Button>
				</Grid>
			</Grid>
			<TableContainer component={Paper} sx={{ maxHeight: "800px", minWidth: "1000px", maxWidth: "100%", overflowX: "auto" }}>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Part Number</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>DWG Number</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Revision</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Description</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Material</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Weight</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Factory</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Min Inventory</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Max Inventory</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Quantity</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap" }}>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row, index) => {
							const backgroundColor = getBackgroundColor(row.quantity, row.min_inventory, row.max_inventory);
							return staticArr[index] ? (
								<InventoryItemStatic key={index} index={index} backgroundColor={backgroundColor} />
							) : (
								<InventoryItemEditting key={index} index={index} backgroundColor={backgroundColor} />
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default InventoryItemTable;
