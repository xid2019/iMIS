import { TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import InventoryItemStatic from "./InventoryItemStatic/InventoryItemStatic";
import { useEffect } from "react";
import { fetchInventoryItems } from "../../../../redux/inventoryWindowSlice";
import InventoryItemEditting from "./InventoryItemEditting/InventoryItemEditting";

const InventoryItemTable = () => {
	const { data, staticArr } = useSelector((state) => state.inventoryWindow);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchInventoryItems());
	}, [dispatch]);

	return (
		<Box sx={{ padding: 2 }}>
			<TableContainer component={Paper} sx={{ maxHeight: "800px", minWidth: "1000px", maxWidth: "100%", overflowX: "auto" }}>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell sx={{ whiteSpace: "nowrap" }}>ID</TableCell>
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
						{data.map((row, index) =>
							staticArr[index] ? <InventoryItemStatic key={index} index={index} /> : <InventoryItemEditting key={index} index={index} />
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default InventoryItemTable;
