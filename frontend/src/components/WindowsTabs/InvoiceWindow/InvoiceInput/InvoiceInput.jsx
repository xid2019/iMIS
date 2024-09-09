import { Grid, Paper, Typography, TextField, Button, Divider, FormControl, Box, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import ExtraChargeRow from "./ExtraCharge/ExtraChargeRow";
import PropTypes from "prop-types";

const InvoiceInput = ({ setData, setStaticArr }) => {
	const [formData, setFormData] = useState({
		customerMapSub: {},
		selectedCustomerId: "",
		selectedSubId: "",
		customerPOMapOrderLines: {},
		selectedCustomerPO: "",
		selectedLineNumber: "",
		extraExpenseRow: {
			extraChargeEntry: "",
			count: "",
			charge: "",
			expense: "",
		},
		shippingAddress: {
			line1: "",
			line2: "",
			line3: "",
			line4: "",
		},
		billingAddress: {
			line1: "",
			line2: "",
			line3: "",
			line4: "",
		},
	});

	const handleCustomerChange = (event) => {
		const newCustomerId = event.target.value;
		setFormData((prev) => ({
			...prev,
			selectedCustomerId: newCustomerId,
			selectedSubId: "",
			selectedCustomerPO: "",
			selectedLineNumber: "",
		}));
	};

	const handleSubIdChange = (event) => {
		const newSubId = event.target.value;
		setFormData((prev) => ({
			...prev,
			selectedSubId: newSubId,
			selectedCustomerPO: "",
			selectedLineNumber: "",
		}));
	};

	const handleCustomerPOChange = (event) => {
		const newCustomerPO = event.target.value;
		setFormData((prev) => ({
			...prev,
			selectedCustomerPO: newCustomerPO,
			selectedLineNumber: "",
		}));
	};

	const handleLineNumberChange = (event) => {
		const newLineNumber = event.target.value;
		setFormData((prev) => ({
			...prev,
			selectedLineNumber: newLineNumber,
		}));
	};

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

	const handleAddInvoiceLine = async () => {
		let customerId = formData.selectedCustomerId;
		if (formData.selectedSubId !== "None") {
			customerId += formData.selectedSubId;
		}

		const queryParams = new URLSearchParams({
			customer_id: customerId,
			customer_po: formData.selectedCustomerPO,
			line_number: formData.selectedLineNumber,
		}).toString();

		let orderLine;
		try {
			const response = await axios.get(`http://localhost:8000/order_lines/get/?${queryParams}`);
			orderLine = response.data[0];
			orderLine.total_price = orderLine.price * orderLine.quantity;
			setData((prev) => [...prev, orderLine]);
		} catch (error) {
			console.error("Failed to fetch invoice line data:", error);
		}
		setStaticArr((prev) => [...prev, true]);
	};

	const handleAddExtraExpense = (extraExpense) => {
		setFormData((prev) => ({
			...prev,
			extraExpenses: [...prev.extraExpenses, extraExpense],
		}));
	};

	useEffect(() => {
		const fetchCustomers = async () => {
			try {
				const response = await axios.get("http://localhost:8000/customers/");
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
				setFormData((prev) => ({
					...prev,
					customerMapSub: map,
				}));
			} catch (err) {
				console.error("Failed to fetch customers:", err);
			}
		};

		fetchCustomers();
	}, []);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				let fullCustomerId = formData.selectedCustomerId;
				if (formData.selectedSubId !== "None") {
					fullCustomerId += formData.selectedSubId;
				}

				const response = await axios.get(`http://localhost:8000/orders/?customer_id=${fullCustomerId}`);
				const orderLines = response.data;
				const map = {};
				for (let orderLine of orderLines) {
					if (!map[orderLine.customer_po]) {
						map[orderLine.customer_po] = [];
					}
					map[orderLine.customer_po].push(orderLine.line_number);
				}
				setFormData((prev) => ({
					...prev,
					customerPOMapOrderLines: map,
				}));
			} catch (err) {
				console.error("Failed to fetch orders:", err);
			}
		};

		fetchOrders();
	}, [formData.selectedSubId]);

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
							<FormControl fullWidth>
								<InputLabel id="customer-id-select-label">Customer ID</InputLabel>
								<Select
									labelId="customer-id-select-label"
									id="customer-id-select"
									value={formData.selectedCustomerId}
									label="Customer ID"
									onChange={handleCustomerChange}
								>
									{Object.keys(formData.customerMapSub).map((key) => (
										<MenuItem key={key} value={key}>
											{key}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>

						{/* Sub ID Dropdown */}
						{formData.selectedCustomerId && (
							<Grid item xs={3}>
								<FormControl fullWidth>
									<InputLabel id="sub-id-select-label">Sub ID</InputLabel>
									<Select labelId="sub-id-select-label" id="sub-id-select" value={formData.selectedSubId} label="Sub ID" onChange={handleSubIdChange}>
										{formData.customerMapSub[formData.selectedCustomerId].length === 0 && <MenuItem value="None">None</MenuItem>}
										{formData.customerMapSub[formData.selectedCustomerId] &&
											formData.customerMapSub[formData.selectedCustomerId].map((subId) => (
												<MenuItem key={subId} value={subId}>
													{subId}
												</MenuItem>
											))}
									</Select>
								</FormControl>
							</Grid>
						)}

						{/* PO Number Dropdown */}
						{formData.selectedSubId && (
							<Grid item xs={3}>
								<FormControl fullWidth>
									<InputLabel id="customer-po-select-label">PO Number</InputLabel>
									<Select
										labelId="customer-po-select-label"
										id="customer-po-select"
										value={formData.selectedCustomerPO}
										label="Customer PO"
										onChange={handleCustomerPOChange}
									>
										{Object.keys(formData.customerPOMapOrderLines).map((key) => (
											<MenuItem key={key} value={key}>
												{key}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
						)}

						{/* Line Number Dropdown */}
						{formData.selectedCustomerPO && (
							<Grid item xs={3}>
								<FormControl fullWidth>
									<InputLabel id="line-number-select-label">Line Number</InputLabel>
									<Select
										labelId="line-number-select-label"
										id="line-number-select"
										value={formData.selectedLineNumber}
										label="Line Number"
										onChange={handleLineNumberChange}
									>
										{formData.customerPOMapOrderLines[formData.selectedCustomerPO].map((lineNumber) => (
											<MenuItem key={lineNumber} value={lineNumber}>
												{lineNumber}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
						)}
						<Grid container item spacing={2}>
							<Grid item xs={3}>
								<Button disabled={!formData.selectedLineNumber} variant="contained" color="primary" onClick={handleAddInvoiceLine} fullWidth>
									Add Invoice Line
								</Button>
							</Grid>
						</Grid>
					</Grid>

					{/* Title for Extra Charge */}
					<Grid item xs={12}>
						<Typography variant="h6">Extra Charge</Typography>
						<Divider />
					</Grid>
					{/* Extra Charge Row */}
					<ExtraChargeRow formData={formData} handleAddExtraExpense={handleAddExtraExpense} setFormData={setFormData} />

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
				</Grid>
			</Box>
		</Paper>
	);
};

InvoiceInput.propTypes = {
	setData: PropTypes.func.isRequired,
	setStaticArr: PropTypes.func.isRequired,
};

export default InvoiceInput;
