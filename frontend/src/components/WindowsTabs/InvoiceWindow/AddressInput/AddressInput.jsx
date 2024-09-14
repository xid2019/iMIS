import { Grid, TextField, Button, Typography, Divider } from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const AddressInput = () => {
	const dispatch = useDispatch();
	const { addressData, customerId } = useSelector((state) => state.invoiceWindow);
	const handleAddressChange = (event) => {
		const { name, value } = event.target;
		const updatedAddressData = {
			...addressData,
			[name]: value,
		};
		dispatch({ type: "invoiceWindow/updateAddressData", payload: updatedAddressData });
	};

	const handleAutofill = async () => {
		try {
			const response = await axios.get(`http://localhost:8000/customers/${customerId}/`);
			const newAddressData = {
				shipToAddressLine1: response.data.ship_to_address_line1 || "",
				shipToAddressLine2: response.data.ship_to_address_line2 || "",
				shipToAddressLine3: response.data.ship_to_address_line3 || "",
				shipToAddressLine4: response.data.ship_to_address_line4 || "",
				billToAddressLine1: response.data.sold_to_address_line1 || "",
				billToAddressLine2: response.data.sold_to_address_line2 || "",
				billToAddressLine3: response.data.sold_to_address_line3 || "",
				billToAddressLine4: response.data.sold_to_address_line4 || "",
			};
			dispatch({ type: "invoiceWindow/updateAddressData", payload: newAddressData });
		} catch (error) {
			console.error("Failed to autofill addresses:", error);
		}
	};
	return (
		<>
			<Grid item xs={12}>
				<Typography variant="h6">Shipping Info</Typography>
				<Divider />
			</Grid>
			<Grid container spacing={2}>
				{/* Shipping Address Column */}
				<Grid item xs={3}>
					<TextField
						label="Shipping Address Line 1"
						name="shipToAddressLine1"
						variant="outlined"
						fullWidth
						value={addressData.shipToAddressLine1}
						onChange={handleAddressChange}
						margin="normal"
					/>
					<TextField
						label="Shipping Address Line 2"
						name="shipToAddressLine2"
						variant="outlined"
						fullWidth
						value={addressData.shipToAddressLine2}
						onChange={handleAddressChange}
						margin="normal"
					/>
					<TextField
						label="Shipping Address Line 3"
						name="shipToAddressLine3"
						variant="outlined"
						fullWidth
						value={addressData.shipToAddressLine3}
						onChange={handleAddressChange}
						margin="normal"
					/>
					<TextField
						label="Shipping Address Line 4"
						name="shipToAddressLine4"
						variant="outlined"
						fullWidth
						value={addressData.shipToAddressLine4}
						onChange={handleAddressChange}
						margin="normal"
					/>
				</Grid>

				{/* Billing Address Column */}
				<Grid item xs={3}>
					<TextField
						label="Bill To Address Line 1"
						name="billToAddressLine1"
						variant="outlined"
						fullWidth
						value={addressData.billToAddressLine1}
						onChange={handleAddressChange}
						margin="normal"
					/>
					<TextField
						label="Bill To Address Line 2"
						name="billToAddressLine2"
						variant="outlined"
						fullWidth
						value={addressData.billToAddressLine2}
						onChange={handleAddressChange}
						margin="normal"
					/>
					<TextField
						label="Bill To Address Line 3"
						name="billToAddressLine3"
						variant="outlined"
						fullWidth
						value={addressData.billToAddressLine3}
						onChange={handleAddressChange}
						margin="normal"
					/>
					<TextField
						label="Bill To Address Line 4"
						name="billToAddressLine4"
						variant="outlined"
						fullWidth
						value={addressData.billToAddressLine4}
						onChange={handleAddressChange}
						margin="normal"
					/>
				</Grid>

				{/* Autofill Button */}
				<Grid item xs={12}>
					<Button variant="contained" color="primary" onClick={handleAutofill}>
						Autofill
					</Button>
				</Grid>
			</Grid>
		</>
	);
};

export default AddressInput;
