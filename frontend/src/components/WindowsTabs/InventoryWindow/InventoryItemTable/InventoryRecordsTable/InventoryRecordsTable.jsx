import { Table, TableBody, TableCell, TableHead, TableRow, Box, Button, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchInventoryRecords, addInventoryRecord, deleteInventoryRecord, applyFilters } from "../../../../../redux/inventoryWindowSlice";

const InventoryRecordsTable = ({ inventoryItemId }) => {
	const dispatch = useDispatch();
	const [records, setRecords] = useState([]);
	const [newRecord, setNewRecord] = useState({
		quantity: "",
		description: "",
		time: new Date().toISOString().split("T")[0],
	}); // State for the new record

	// Select filters from the Redux state
	const currentFilters = useSelector((state) => state.inventoryWindow.filters);

	useEffect(() => {
		const loadInventoryRecords = async () => {
			const fetchedRecords = await dispatch(fetchInventoryRecords(inventoryItemId));
			setRecords(fetchedRecords.payload);
		};

		loadInventoryRecords();
	}, [dispatch, inventoryItemId]);

	// Handle changes in input fields for new record
	const handleInputChange = (e) => {
		setNewRecord({ ...newRecord, [e.target.name]: e.target.value });
	};

	// Handle submission of new inventory record
	const handleAddRecord = async () => {
		if (newRecord.quantity && newRecord.time) {
			// Add the new record
			const addedRecord = await dispatch(addInventoryRecord({ inventoryItemId, newRecord }));
			dispatch(applyFilters(currentFilters));

			// Update local state for records and reset newRecord input
			setRecords((prevRecords) => [...prevRecords, addedRecord.payload.newRecord]);
			setNewRecord({
				quantity: "",
				description: "",
				time: new Date().toISOString().split("T")[0],
			});
		} else {
			alert("Please fill in both the quantity and time.");
		}
	};

	const handleDeleteRecord = async (recordId) => {
		await dispatch(deleteInventoryRecord(recordId));
		setRecords((prevRecords) => prevRecords.filter((record) => record.id !== recordId));
		dispatch(applyFilters(currentFilters)); // Reapply filters after deletion
	};

	return (
		<Box margin={1} border={1} borderColor="grey.400" borderRadius="4px" padding={2}>
			{/* Input fields for adding new record */}
			<Box display="flex" justifyContent="flex-start" marginBottom={2} gap={2}>
				<TextField
					name="quantity"
					label="Quantity"
					type="number"
					value={newRecord.quantity}
					onChange={handleInputChange}
					variant="outlined"
					size="small"
				/>
				<TextField
					name="description"
					label="Description"
					value={newRecord.description}
					onChange={handleInputChange}
					variant="outlined"
					size="small"
				/>
				<TextField name="time" type="date" label="Time" value={newRecord.time} onChange={handleInputChange} variant="outlined" size="small" />
				<Button onClick={handleAddRecord} variant="contained" color="primary">
					Add Record
				</Button>
			</Box>
			<Box sx={{ maxHeight: 400, overflow: "auto" }}>
				<Table>
					<TableHead sx={{ position: "sticky", top: 0, backgroundColor: "white", zIndex: 1 }}>
						<TableRow>
							<TableCell>Quantity</TableCell>
							<TableCell>Description</TableCell>
							<TableCell>Time</TableCell>
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{records.length > 0 ? (
							records.map((record) => (
								<TableRow key={record.id}>
									<TableCell>{record.quantity}</TableCell>
									<TableCell>{record.description}</TableCell>
									<TableCell>{record.time}</TableCell>
									<TableCell>
										<Box display="flex" justifyContent="flex-start" alignItems="center">
											<Button onClick={() => handleDeleteRecord(record.id)} variant="text" color="error" style={{ marginLeft: 8 }}>
												Delete
											</Button>
										</Box>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={4} align="center">
									No records found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</Box>
		</Box>
	);
};

InventoryRecordsTable.propTypes = {
	inventoryItemId: PropTypes.number.isRequired,
};

export default InventoryRecordsTable;
