import { Grid, TextField, Button } from "@mui/material";
import PropTypes from "prop-types";

const ExtraCharge = ({ formData, setFormData, handleAddExtraExpense }) => {
	const handleExtraChargeEntryChange = (event) => {
		setFormData((prev) => ({
			...prev,
			extraExpenseRow: {
				...prev.extraExpenseRow,
				extraChargeEntry: event.target.value,
			},
		}));
	};

	const handleCountChange = (event) => {
		setFormData((prev) => ({
			...prev,
			extraExpenseRow: {
				...prev.extraExpenseRow,
				count: event.target.value,
			},
		}));
	};

	const handleChargeChange = (event) => {
		setFormData((prev) => ({
			...prev,
			extraExpenseRow: {
				...prev.extraExpenseRow,
				charge: event.target.value,
			},
		}));
	};

	const handleExpenseChange = (event) => {
		setFormData((prev) => ({
			...prev,
			extraExpenseRow: {
				...prev.extraExpenseRow,
				expense: event.target.value,
			},
		}));
	};

	return (
		<Grid container item spacing={2} alignItems="center">
			{/* Extra Charge Entry */}
			<Grid item xs={3}>
				<TextField
					label="Extra Charge Entry"
					variant="outlined"
					fullWidth
					value={formData.extraExpenseRow.extraChargeEntry}
					onChange={handleExtraChargeEntryChange}
				/>
			</Grid>

			{/* Count */}
			<Grid item xs={2}>
				<TextField label="Count" variant="outlined" type="number" fullWidth value={formData.extraExpenseRow.count} onChange={handleCountChange} />
			</Grid>

			{/* Charge */}
			<Grid item xs={2}>
				<TextField label="Charge" variant="outlined" type="number" fullWidth value={formData.extraExpenseRow.charge} onChange={handleChargeChange} />
			</Grid>

			{/* Expense */}
			<Grid item xs={3}>
				<TextField
					label="Expense"
					variant="outlined"
					type="number"
					fullWidth
					value={formData.extraExpenseRow.expense}
					onChange={handleExpenseChange}
				/>
			</Grid>

			{/* Add Button */}
			<Grid item xs={2}>
				<Button variant="contained" color="primary" fullWidth onClick={() => handleAddExtraExpense(formData.extraExpenseRow)}>
					Add Extra Expense
				</Button>
			</Grid>
		</Grid>
	);
};

ExtraCharge.propTypes = {
	handleAddExtraExpense: PropTypes.func.isRequired,
	setFormData: PropTypes.func.isRequired,
	formData: PropTypes.shape({
		extraExpenseRow: PropTypes.shape({
			extraChargeEntry: PropTypes.string,
			count: PropTypes.string,
			charge: PropTypes.string,
			expense: PropTypes.string,
		}).isRequired,
	}).isRequired,
};

export default ExtraCharge;
