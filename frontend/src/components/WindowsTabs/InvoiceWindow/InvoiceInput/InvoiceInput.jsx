import { Grid, Paper, Typography, TextField, Button, Divider, FormControl, Box, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import ExtraChargeRow from "./ExtraCharge/ExtraChargeRow";

const InvoiceInput = () => {
	const [customerMapSub, setCustomerMapSub] = useState({});
	const [selectedCustomerId, setSelectedCustomerId] = useState("");
	const [selectedSubId, setSelectedSubId] = useState("");
	const [customerPOMapOrderLines, setCustomerPOMapOrderLines] = useState({});
	const [selectedCustomerPO, setSelectedCustomerPO] = useState("");
	const [selectedLineNumber, setSelectedLineNumber] = useState("");
	const [extraExpenseRow, setExtraExpenseRow] = useState({
		extraChargeEntry: "",
		count: "",
		charge: "",
		expense: "",
	});
	// State for Shipping Address
	const [shippingAddress, setShippingAddress] = useState({
		line1: "",
		line2: "",
		line3: "",
		line4: "",
	});

	// State for Billing Address
	const [billingAddress, setBillingAddress] = useState({
		line1: "",
		line2: "",
		line3: "",
		line4: "",
	});

	const handleAddExtraExpense = (newExtraExpenseRow) => {
		setExtraExpenseRow(newExtraExpenseRow);
	};

	const handleCustomerChange = (event) => {
		setSelectedCustomerId(event.target.value);
		setSelectedSubId("");
		setSelectedCustomerPO("");
		setSelectedLineNumber("");
	};

	const handleSubIdChange = (event) => {
		setSelectedSubId(event.target.value);
		setSelectedCustomerPO("");
		setSelectedLineNumber("");
	};

	const handleCustomerPOChange = (event) => {
		setSelectedCustomerPO(event.target.value);
		setSelectedLineNumber("");
	};

	const handleLineNumberChange = (event) => {
		setSelectedLineNumber(event.target.value);
	};

	const handleShippingAddressChange = (event) => {
		const { name, value } = event.target;
		setShippingAddress((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleBillingAddressChange = (event) => {
		const { name, value } = event.target;
		setBillingAddress((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Handler for Autofill Button Click
	const handleAutofill = async () => {
		try {
			// Example GET request to fetch addresses
			const response = await axios.get(`http://localhost:8000/customers/${selectedCustomerId}/`);
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

			// Update state with fetched data
			setShippingAddress({
				line1: ship_to_address_line1 || "",
				line2: ship_to_address_line2 || "",
				line3: ship_to_address_line3 || "",
				line4: ship_to_address_line4 || "",
			});
			setBillingAddress({
				line1: sold_to_address_line1 || "",
				line2: sold_to_address_line2 || "",
				line3: sold_to_address_line3 || "",
				line4: sold_to_address_line4 || "",
			});
		} catch (error) {
			console.error("Failed to autofill addresses:", error);
		}
	};

	// State and handlers would go here
	useEffect(() => {
		// Function to fetch customer data
		const fetchCustomers = async () => {
			try {
				// Send GET request to the backend server
				const response = await axios.get("http://localhost:8000/customers/");
				// Update the state with the fetched data
				const customers = response.data;
				const map = {};
				for (let customer of customers) {
					const customerName = customer.name;
					if (customerName.length === 2 || customerName.length === 3) {
						map[customerName] = [];
					} else if (customerName.length === 5) {
						const customerId = customerName.slice(0, 2);
						const subId = customerName.slice(2, 5);
						if (!map[customerId]) {
							map[customerId] = [];
						}
						map[customerId].push(subId);
					} else if (customerName.length === 6) {
						const customerId = customerName.slice(0, 3);
						const subId = customerName.slice(3, 6);
						if (!map[customerId]) {
							map[customerId] = [];
						}
						map[customerId].push(subId);
					}
				}
				setCustomerMapSub(map);
			} catch (err) {
				return err;
			}
		};

		// Call the function to fetch the data
		fetchCustomers();
	}, []);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				let fullCustomerId = selectedCustomerId;
				if (selectedSubId !== "None") {
					fullCustomerId += selectedSubId;
				}

				// Send GET request to the backend server
				const response = await axios.get(`http://localhost:8000/orders/?customer_id=${fullCustomerId}`);
				// Update the state with the fetched data
				const orderLines = response.data;
				const map = {};
				for (let orderLine of orderLines) {
					if (!map[orderLine.customer_po]) {
						map[orderLine.customer_po] = [];
					}
					map[orderLine.customer_po].push(orderLine.line_number);
				}
				setCustomerPOMapOrderLines(map);
			} catch (err) {
				return err;
			}
		};

		// Call the function to fetch the data
		fetchOrders();
	}, [selectedSubId]);

	return (
		<Paper sx={{ padding: "16px" }}>
			<Box component="form" noValidate autoComplete="off">
				<Grid container spacing={2}>
					{/* Title for Input Info */}
					<Grid item xs={12}>
						<Typography variant="h6">Input Info</Typography>
						<Divider />
					</Grid>
					{/* Input Info Row */}
					<Grid container item spacing={2}>
						{/* Customer ID Dropdown */}
						<Grid item xs={3}>
							{" "}
							{/* Adjust the size as needed */}
							<FormControl fullWidth>
								<InputLabel id="customer-id-select-label">Customer ID</InputLabel>
								<Select
									labelId="customer-id-select-label"
									id="customer-id-select"
									value={selectedCustomerId}
									label="Customer ID"
									onChange={handleCustomerChange}
								>
									{Object.keys(customerMapSub).map((key) => (
										<MenuItem key={key} value={key}>
											{key}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>

						{/* Sub ID Dropdown */}
						{selectedCustomerId && (
							<Grid item xs={3}>
								{" "}
								{/* Adjust the size as needed */}
								<FormControl fullWidth>
									<InputLabel id="sub-id-select-label">Sub ID</InputLabel>
									<Select labelId="sub-id-select-label" id="sub-id-select" value={selectedSubId} label="Sub ID" onChange={handleSubIdChange}>
										{customerMapSub[selectedCustomerId].length === 0 && <MenuItem value="None">None</MenuItem>}
										{customerMapSub[selectedCustomerId] &&
											customerMapSub[selectedCustomerId].map((subId) => (
												<MenuItem key={subId} value={subId}>
													{subId}
												</MenuItem>
											))}
									</Select>
								</FormControl>
							</Grid>
						)}

						{selectedSubId && (
							<Grid item xs={3}>
								{" "}
								<FormControl fullWidth>
									<InputLabel id="customer-po-select-label">PO Number</InputLabel>
									<Select
										labelId="customer-po-select-label"
										id="customer-po-select"
										value={selectedCustomerPO}
										label="Customer PO"
										onChange={handleCustomerPOChange}
									>
										{Object.keys(customerPOMapOrderLines).map((key) => (
											<MenuItem key={key} value={key}>
												{key}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
						)}

						{/* Line Number Dropdown */}
						{selectedCustomerPO && (
							<Grid item xs={3}>
								{" "}
								{/* Adjust the size as needed */}
								<FormControl fullWidth>
									<InputLabel id="line-number-select-label">Line Number</InputLabel>
									<Select
										labelId="line-number-select-label"
										id="line-number-select"
										value={selectedLineNumber}
										label="Line Number"
										onChange={handleLineNumberChange}
									>
										{customerPOMapOrderLines[selectedCustomerPO].map((lineNumber) => (
											<MenuItem key={lineNumber} value={lineNumber}>
												{lineNumber}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
						)}
					</Grid>

					{/* Title for Extra Charge */}
					<Grid item xs={12}>
						<Typography variant="h6">Extra Charge</Typography>
						<Divider />
					</Grid>
					{/* Extra Charge Row */}
					<ExtraChargeRow
						extraExpenseRow={extraExpenseRow}
						setExtraExpenseRow={setExtraExpenseRow}
						handleAddExtraExpense={handleAddExtraExpense}
					></ExtraChargeRow>

					{/* Title for Surcharge */}
					<Grid item xs={12}>
						<Typography variant="h6">Surcharge</Typography>
						<Divider />
					</Grid>
					{/* Surcharge Row */}
					<Grid container item spacing={2}>
						<Grid item xs={2}>
							{/* Dropdown or Input Field */}
						</Grid>
						<Grid item xs={2}>
							{/* Input Field */}
						</Grid>
					</Grid>
					{/* Title for Shipping Info */}
					<Grid item xs={12}>
						<Typography variant="h6">Shipping Info</Typography>
						<Divider />
					</Grid>
					{/* Shipping Info Row */}
					<Grid container spacing={2}>
						{/* Shipping Address Column */}
						<Grid item xs={3}>
							<TextField
								label="Shipping Address Line 1"
								name="line1"
								variant="outlined"
								fullWidth
								value={shippingAddress.line1}
								onChange={handleShippingAddressChange}
								margin="normal"
							/>
							<TextField
								label="Shipping Address Line 2"
								name="line2"
								variant="outlined"
								fullWidth
								value={shippingAddress.line2}
								onChange={handleShippingAddressChange}
								margin="normal"
							/>
							<TextField
								label="Shipping Address Line 3"
								name="line3"
								variant="outlined"
								fullWidth
								value={shippingAddress.line3}
								onChange={handleShippingAddressChange}
								margin="normal"
							/>
							<TextField
								label="Shipping Address Line 4"
								name="line4"
								variant="outlined"
								fullWidth
								value={shippingAddress.line4}
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
								value={billingAddress.line1}
								onChange={handleBillingAddressChange}
								margin="normal"
							/>
							<TextField
								label="Bill To Address Line 2"
								name="line2"
								variant="outlined"
								fullWidth
								value={billingAddress.line2}
								onChange={handleBillingAddressChange}
								margin="normal"
							/>
							<TextField
								label="Bill To Address Line 3"
								name="line3"
								variant="outlined"
								fullWidth
								value={billingAddress.line3}
								onChange={handleBillingAddressChange}
								margin="normal"
							/>
							<TextField
								label="Bill To Address Line 4"
								name="line4"
								variant="outlined"
								fullWidth
								value={billingAddress.line4}
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
				</Grid>
			</Box>
		</Paper>
	);
};

InvoiceInput.propTypes = {};

export default InvoiceInput;
