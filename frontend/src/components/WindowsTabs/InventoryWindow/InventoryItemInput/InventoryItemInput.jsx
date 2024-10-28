import { Grid, TextField, Button, Paper, Box, Typography, Divider } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux"; // or use for API call
import { createInventoryItem, fetchInventoryItems } from "../../../../redux/inventoryWindowSlice";

const InventoryItemInput = () => {
	const [formData, setFormData] = useState({
		part_number: "",
		dwg_number: "",
		revision: "",
		description: "",
		material: "",
		weight: "",
		factory: "",
		min_inventory: "",
		max_inventory: "",
	});

	const dispatch = useDispatch(); // Redux action, can be replaced with API call

	// Handlers for each form field
	const handleChange = (event) => {
		setFormData((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	const handleAddItem = async () => {
		await dispatch(createInventoryItem(formData));
		dispatch(fetchInventoryItems());
	};

	return (
		<Paper sx={{ padding: "16px" }}>
			<Box component="form" noValidate autoComplete="off">
				<Grid container item spacing={2} alignItems="center">
					{/* Title for Inventory Item */}
					<Grid item xs={12}>
						<Typography variant="h6">Add Inventory Item</Typography>
						<Divider />
					</Grid>

					{/* Part Number */}
					<Grid item xs={2}>
						<TextField label="Part Number" variant="outlined" fullWidth name="part_number" value={formData.part_number} onChange={handleChange} />
					</Grid>

					{/* DWG Number */}
					<Grid item xs={2}>
						<TextField label="DWG Number" variant="outlined" fullWidth name="dwg_number" value={formData.dwg_number} onChange={handleChange} />
					</Grid>

					{/* Revision */}
					<Grid item xs={2}>
						<TextField label="Revision" variant="outlined" fullWidth name="revision" value={formData.revision} onChange={handleChange} />
					</Grid>

					{/* Description */}
					<Grid item xs={2}>
						<TextField label="Description" variant="outlined" fullWidth name="description" value={formData.description} onChange={handleChange} />
					</Grid>

					{/* Material */}
					<Grid item xs={2}>
						<TextField label="Material" variant="outlined" fullWidth name="material" value={formData.material} onChange={handleChange} />
					</Grid>

					{/* Weight */}
					<Grid item xs={2}>
						<TextField label="Weight" variant="outlined" type="number" fullWidth name="weight" value={formData.weight} onChange={handleChange} />
					</Grid>

					{/* Factory */}
					<Grid item xs={2}>
						<TextField label="Factory" variant="outlined" fullWidth name="factory" value={formData.factory} onChange={handleChange} />
					</Grid>

					{/* Min Inventory */}
					<Grid item xs={2}>
						<TextField
							label="Min Inventory"
							variant="outlined"
							type="number"
							fullWidth
							name="min_inventory"
							value={formData.min_inventory}
							onChange={handleChange}
						/>
					</Grid>

					{/* Max Inventory */}
					<Grid item xs={2}>
						<TextField
							label="Max Inventory"
							variant="outlined"
							type="number"
							fullWidth
							name="max_inventory"
							value={formData.max_inventory}
							onChange={handleChange}
						/>
					</Grid>

					{/* Add Button */}
					<Grid item xs={2}>
						<Button variant="contained" color="primary" fullWidth onClick={handleAddItem}>
							Add Item
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Paper>
	);
};

export default InventoryItemInput;
