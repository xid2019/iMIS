import React from "react";
import { Grid, TextField, Button, Typography, Divider } from "@mui/material";

const AddressInput = ({ formData, handleShippingAddressChange, handleBillingAddressChange, handleAutofill }) => {
	const handleShippingAddressChange = (event) => {
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev,
			shippingAddress: {
				...prev.shippingAddress,
				[name]: value,
			},
		}));
	};

	const handleBillingAddressChange = (event) => {
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev,
			billingAddress: {
				...prev.billingAddress,
				[name]: value,
			},
		}));
	};

	const handleAutofill = async () => {
		try {
			const response = await axios.get(`http://localhost:8000/customers/${formData.selectedCustomerId}/`);
			const {
				ship_to_address_line1,
				ship_to_address_line2,
				ship_to_address_line3,
				ship_to_address_line4,
				sold_to_address_line1,
				sold_to_address_line2,
				sold_to_address_line3,
				sold_to_address_line4,
			} = response.data;

			setFormData((prev) => ({
				...prev,
				shippingAddress: {
					line1: ship_to_address_line1 || "",
					line2: ship_to_address_line2 || "",
					line3: ship_to_address_line3 || "",
					line4: ship_to_address_line4 || "",
				},
				billingAddress: {
					line1: sold_to_address_line1 || "",
					line2: sold_to_address_line2 || "",
					line3: sold_to_address_line3 || "",
					line4: sold_to_address_line4 || "",
				},
			}));
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
						name="line1"
						variant="outlined"
						fullWidth
						value={formData.shippingAddress.line1}
						onChange={handleShippingAddressChange}
						margin="normal"
					/>
					<TextField
						label="Shipping Address Line 2"
						name="line2"
						variant="outlined"
						fullWidth
						value={formData.shippingAddress.line2}
						onChange={handleShippingAddressChange}
						margin="normal"
					/>
					<TextField
						label="Shipping Address Line 3"
						name="line3"
						variant="outlined"
						fullWidth
						value={formData.shippingAddress.line3}
						onChange={handleShippingAddressChange}
						margin="normal"
					/>
					<TextField
						label="Shipping Address Line 4"
						name="line4"
						variant="outlined"
						fullWidth
						value={formData.shippingAddress.line4}
						onChange={handleShippingAddressChange}
						margin="normal"
					/>
				</Grid>

				{/* Billing Address Column */}
				<Grid item xs={3}>
					<TextField
						label="Bill To Address Line 1"
						name="line1"
						variant="outlined"
						fullWidth
						value={formData.billingAddress.line1}
						onChange={handleBillingAddressChange}
						margin="normal"
					/>
					<TextField
						label="Bill To Address Line 2"
						name="line2"
						variant="outlined"
						fullWidth
						value={formData.billingAddress.line2}
						onChange={handleBillingAddressChange}
						margin="normal"
					/>
					<TextField
						label="Bill To Address Line 3"
						name="line3"
						variant="outlined"
						fullWidth
						value={formData.billingAddress.line3}
						onChange={handleBillingAddressChange}
						margin="normal"
					/>
					<TextField
						label="Bill To Address Line 4"
						name="line4"
						variant="outlined"
						fullWidth
						value={formData.billingAddress.line4}
						onChange={handleBillingAddressChange}
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
