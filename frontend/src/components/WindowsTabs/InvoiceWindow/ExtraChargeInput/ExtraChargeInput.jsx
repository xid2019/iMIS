import { Grid, TextField, Button, Paper, Box, Typography, Divider } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

const ExtraChargeInput = ({ setData, setExtraChargeTableStaticArr }) => {
	const [formData, setFormData] = useState({
		extraChargeEntry: "",
		count: "",
		charge: "",
		expense: "",
	});
	const handleExtraChargeEntryChange = (event) => {
		setFormData((prev) => ({
			...prev,
			extraChargeEntry: event.target.value,
		}));
	};

	const handleCountChange = (event) => {
		setFormData((prev) => ({
			...prev,
			count: event.target.value,
		}));
	};

	const handleChargeChange = (event) => {
		setFormData((prev) => ({
			...prev,
			charge: event.target.value,
		}));
	};

	const handleExpenseChange = (event) => {
		setFormData((prev) => ({
			...prev,
			expense: event.target.value,
		}));
	};

	const handleAddExtraExpense = () => {
		setData((prev) => ({ ...prev, extraChargeData: [...prev.extraChargeData, formData] }));
		setExtraChargeTableStaticArr((prev) => [...prev, true]);
	};

	return (
		<Paper sx={{ padding: "16px" }}>
			<Box component="form" noValidate autoComplete="off">
				<Grid container item spacing={2} alignItems="center">
					{/* Title for Extra Charge Info */}
					<Grid item xs={12}>
						<Typography variant="h6">Extra Charge Info</Typography>
						<Divider />
					</Grid>
					{/* Extra Charge Entry */}
					<Grid item xs={3}>
						<TextField
							label="Extra Charge Entry"
							variant="outlined"
							fullWidth
							value={formData.extraChargeEntry}
							onChange={handleExtraChargeEntryChange}
						/>
					</Grid>

					{/* Count */}
					<Grid item xs={2}>
						<TextField label="Count" variant="outlined" type="number" fullWidth value={formData.count} onChange={handleCountChange} />
					</Grid>

					{/* Charge */}
					<Grid item xs={2}>
						<TextField label="Charge" variant="outlined" type="number" fullWidth value={formData.charge} onChange={handleChargeChange} />
					</Grid>

					{/* Expense */}
					<Grid item xs={3}>
						<TextField label="Expense" variant="outlined" type="number" fullWidth value={formData.expense} onChange={handleExpenseChange} />
					</Grid>

					{/* Add Button */}
					<Grid item xs={2}>
						<Button variant="contained" color="primary" fullWidth onClick={handleAddExtraExpense}>
							Add Extra Expense
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Paper>
	);
};

ExtraChargeInput.propTypes = {
	setData: PropTypes.func.isRequired,
	setExtraChargeTableStaticArr: PropTypes.func.isRequired,
};

export default ExtraChargeInput;
