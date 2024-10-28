import { TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import InventoryItemLine from "./InventoryItemLine/InventoryItemLine";
import { useEffect } from "react";
import { fetchInventoryItems } from "../../../../redux/inventoryWindowSlice";

const InventoryItemTable = () => {
	const { data } = useSelector((state) => state.inventoryWindow);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchInventoryItems());
	}, [dispatch, data]);

	return (
		<Box sx={{ padding: 2 }}>
			<TableContainer component={Paper} sx={{ maxHeight: "500px", minWidth: "1000px", maxWidth: "100%", overflowX: "auto" }}>
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
							<TableCell sx={{ whiteSpace: "nowrap" }}>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row, index) => (
							<InventoryItemLine key={index} index={index} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default InventoryItemTable;
