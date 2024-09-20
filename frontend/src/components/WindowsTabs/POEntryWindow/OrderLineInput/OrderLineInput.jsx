import { useState } from "react";
import {
	TextField,
	Grid,
	TableRow,
	Table,
	TableCell,
	Paper,
	TableContainer,
	Button,
	Typography,
	Divider,
	InputLabel,
	FormControl,
	Select,
	TableHead,
	MenuItem,
	TableBody,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";

const OrderLineInput = () => {
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		customer_id: "",
		customer_po: "",
		buyer: "",
		order_date: new Date().toISOString().split("T")[0],
		line_number: "",
		part_number: "",
		dwg_number: "",
		revision: "",
		quantity: "",
		description: "",
		price: "",
		cost: "",
		unit: "",
		pay_terms: "",
		required_date: "",
		due_date: "",
		material: "",
		weight: "",
		schd_days: "",
		factory: "",
		ship_via: "Sea",
		shipping_address1: "",
		shipping_address2: "",
		shipping_address3: "",
		shipping_address4: "",
		status: "OPEN",
	});
	const [searchedParts, setSearchedParts] = useState([]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		const updatedFormData = {
			...formData,
			[name]: value,
		};

		if (name === "due_date" || name === "schd_days") {
			const { due_date, schd_days } = updatedFormData;

			if (due_date && schd_days) {
				const requiredDate = dayjs(due_date).subtract(schd_days, "day").format("YYYY-MM-DD");
				updatedFormData.required_date = requiredDate;
			}
		}

		setFormData(updatedFormData);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: "poEntryWindow/addOrderLineInTable", payload: formData });
	};

	const handleSearchPart = async () => {
		try {
			// Construct the query parameters from formData
			const { customer_id, part_number, dwg_number, revision } = formData;
			const queryParams = new URLSearchParams({
				customer_id,
				part_number,
				dwg_number,
				revision,
			}).toString();

			const response = await axios.get(`http://localhost:8000/parts/?${queryParams}`);
			setSearchedParts(response.data);
			let selectedPart;
			if (formData.part_number !== "" || formData.dwg_number !== "") {
				let currentQuantity = 0;
				for (let partData of response.data) {
					if (!partData.order_quantity) {
						partData.order_quantity = 0;
					}
					if (partData.order_quantity <= formData.quantity && partData.order_quantity >= currentQuantity) {
						currentQuantity = partData.order_quantity;
						selectedPart = partData;
					}
				}
			}
			if (selectedPart) {
				let updatedFormData = {
					...formData,
					price: selectedPart.price || "",
					cost: selectedPart.cost || "",
					material: selectedPart.material || "",
					weight: selectedPart.weight || "",
					factory: selectedPart.factory || "",
					description: selectedPart.description || "",
				};
				setFormData(updatedFormData);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const handleSearchAddress = async () => {
		try {
			// Construct the query parameters from formData
			const { customer_id } = formData;

			const response = await axios.get(`http://localhost:8000/customers/${customer_id}/`);

			const updatedFormData = {
				...formData,
				shipping_address1: response.data.ship_to_address_line1 || "",
				shipping_address2: response.data.ship_to_address_line2 || "",
				shipping_address3: response.data.ship_to_address_line3 || "",
				shipping_address4: response.data.ship_to_address_line4 || "",
			};

			setFormData(updatedFormData);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	return (
		<Paper sx={{ padding: "16px" }}>
			<form onSubmit={handleSubmit}>
				<Grid container spacing={2}>
					{/* Title for First Row */}
					<Grid item xs={12}>
						<Typography variant="h6">Basic Information</Typography>
						<Divider />
					</Grid>
					{/* First Row */}
					<Grid container item spacing={2}>
						<Grid item xs={2}>
							<TextField name="customer_po" label="Customer PO" value={formData.customer_PO} onChange={handleChange} fullWidth variant="outlined" />
						</Grid>
						<Grid item xs={2}>
							<TextField name="buyer" label="Buyer" value={formData.buyer} onChange={handleChange} fullWidth variant="outlined" />
						</Grid>
						<Grid item xs={2}>
							<FormControl fullWidth variant="outlined">
								<InputLabel>Pay Terms</InputLabel>
								<Select name="pay_terms" value={formData.pay_terms} onChange={handleChange} label="Pay Terms">
									<MenuItem value="Net 7 Days">Net 7 Days</MenuItem>
									<MenuItem value="Net 10 Days">Net 10 Days</MenuItem>
									<MenuItem value="Net 15 Days">Net 15 Days</MenuItem>
									<MenuItem value="Net 30 Days">Net 30 Days</MenuItem>
									<MenuItem value="Net 60 Days">Net 60 Days</MenuItem>
									<MenuItem value="Net 90 Days">Net 90 Days</MenuItem>
									<MenuItem value="Due Upon Receipt">Due Upon Receipt</MenuItem>
								</Select>
							</FormControl>
						</Grid>
					</Grid>

					{/* Title for Second Row */}
					<Grid item xs={12}>
						<Typography variant="h6">Part Details</Typography>
						<Divider />
					</Grid>
					{/* Second Row */}
					<Grid container item spacing={2}>
						<Grid container item spacing={2}>
							<Grid item xs={2}>
								<TextField name="customer_id" label="Customer ID" value={formData.customer_id} onChange={handleChange} fullWidth variant="outlined" />
							</Grid>
							<Grid item xs={2}>
								<TextField name="part_number" label="Part Number" value={formData.part_number} onChange={handleChange} fullWidth variant="outlined" />
							</Grid>
							<Grid item xs={2}>
								<TextField name="dwg_number" label="DWG Number" value={formData.dwg_number} onChange={handleChange} fullWidth variant="outlined" />
							</Grid>
							<Grid item xs={2}>
								<TextField name="revision" label="Revision" value={formData.revision} onChange={handleChange} fullWidth variant="outlined" />
							</Grid>
							<Grid item xs={2}>
								<TextField
									name="quantity"
									label="Quantity"
									type="number"
									value={formData.quantity}
									onChange={handleChange}
									fullWidth
									variant="outlined"
								/>
							</Grid>
							<Grid item xs={2}>
								<Button onClick={handleSearchPart} variant="contained" color="primary" fullWidth>
									Search and auto fill part info
								</Button>
							</Grid>
						</Grid>
						{searchedParts.length > 0 && (
							<TableContainer component={Paper} sx={{ margin: "16px", maxHeight: "400px", minWidth: "1000px", maxWidth: "100%", overflowX: "auto" }}>
								<Table stickyHeader>
									<TableHead>
										<TableRow>
											<TableCell>Customer ID</TableCell>
											<TableCell>Part Number</TableCell>
											<TableCell>DWG Number</TableCell>
											<TableCell>Revision</TableCell>
											<TableCell>Description</TableCell>
											<TableCell>Price</TableCell>
											<TableCell>Cost</TableCell>
											<TableCell>Material</TableCell>
											<TableCell>Weight</TableCell>
											<TableCell>Order Quantity</TableCell>
											<TableCell>Factory</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{searchedParts.map((part, index) => (
											<TableRow key={index}>
												<TableCell>{part.customer_id}</TableCell>
												<TableCell>{part.part_number}</TableCell>
												<TableCell>{part.dwg_number}</TableCell>
												<TableCell>{part.revision}</TableCell>
												<TableCell>{part.description}</TableCell>
												<TableCell>{part.price}</TableCell>
												<TableCell>{part.cost}</TableCell>
												<TableCell>{part.material}</TableCell>
												<TableCell>{part.weight}</TableCell>
												<TableCell>{part.order_quantity}</TableCell>
												<TableCell>{part.factory}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						)}
						<Grid container item spacing={2}>
							<Grid item xs={2}>
								<TextField name="price" label="Price" type="number" value={formData.price} onChange={handleChange} fullWidth variant="outlined" />
							</Grid>
							<Grid item xs={2}>
								<TextField name="cost" label="Cost" type="number" value={formData.cost} onChange={handleChange} fullWidth variant="outlined" />
							</Grid>
							<Grid item xs={2}>
								<TextField name="material" label="Material" value={formData.material} onChange={handleChange} fullWidth variant="outlined" />
							</Grid>
							<Grid item xs={2}>
								<TextField
									name="weight"
									label="Weight(KG)"
									type="number"
									value={formData.weight}
									onChange={handleChange}
									fullWidth
									variant="outlined"
								/>
							</Grid>
							<Grid item xs={2}>
								<TextField name="factory" label="Factory" value={formData.factory} onChange={handleChange} fullWidth variant="outlined" />
							</Grid>
							<Grid item xs={4}>
								<TextField name="description" label="Description" value={formData.description} onChange={handleChange} fullWidth variant="outlined" />
							</Grid>
						</Grid>
						<Grid item xs={2}>
							<TextField name="line_number" label="Line Number" value={formData.line_number} onChange={handleChange} fullWidth variant="outlined" />
						</Grid>
						<Grid item xs={2}>
							<FormControl fullWidth variant="outlined">
								<InputLabel id="unit-select-label">Unit</InputLabel>
								<Select labelId="unit-select-label" id="unit-select" name="unit" value={formData.unit} onChange={handleChange} label="Unit">
									<MenuItem value="EACH">EACH</MenuItem>
									<MenuItem value="KG">KG</MenuItem>
								</Select>
							</FormControl>
						</Grid>
					</Grid>

					{/* Title for Third Row */}
					<Grid item xs={12}>
						<Typography variant="h6">Shipping Information</Typography>
						<Divider />
					</Grid>
					{/* Third Row */}
					<Grid container item xs={12} spacing={2}>
						<Grid container item direction="column" xs={4} spacing={2}>
							<Button onClick={handleSearchAddress} variant="contained" color="primary" fullWidth sx={{ margin: "16px" }}>
								Auto fill shipping address by customer id
							</Button>
							<Grid item>
								<TextField
									name="shipping_address1"
									label="Shipping Address Line 1"
									value={formData.shipping_address1}
									onChange={handleChange}
									fullWidth
									variant="outlined"
								/>
							</Grid>
							<Grid item>
								<TextField
									name="shipping_address2"
									label="Shipping Address Line 2"
									value={formData.shipping_address2}
									onChange={handleChange}
									fullWidth
									variant="outlined"
								/>
							</Grid>
							<Grid item>
								<TextField
									name="shipping_address3"
									label="Shipping Address Line 3"
									value={formData.shipping_address3}
									onChange={handleChange}
									fullWidth
									variant="outlined"
								/>
							</Grid>
							<Grid item>
								<TextField
									name="shipping_address4"
									label="Shipping Address Line 4"
									value={formData.shipping_address4}
									onChange={handleChange}
									fullWidth
									variant="outlined"
								/>
							</Grid>
						</Grid>
					</Grid>
					<Grid container item spacing={2}>
						<Grid item xs={2}>
							<FormControl variant="outlined">
								<InputLabel id="ship-via-label">Ship Via</InputLabel>
								<Select labelId="ship-via-label" name="ship_via" value={formData.ship_via || "Sea"} onChange={handleChange} label="Ship Via">
									<MenuItem value="Exp">Exp</MenuItem>
									<MenuItem value="Air">Air</MenuItem>
									<MenuItem value="Sea">Sea</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid container item spacing={2}>
							<Grid item xs={2}>
								<TextField
									name="due_date"
									label="Due Date"
									type="date"
									value={formData.due_date}
									onChange={handleChange}
									fullWidth
									variant="outlined"
									InputLabelProps={{ shrink: true }}
								/>
							</Grid>
							<Grid item xs={2}>
								<TextField
									name="schd_days"
									label="Sch'd Days"
									type="number"
									value={formData.schd_days}
									onChange={handleChange}
									fullWidth
									variant="outlined"
								/>
							</Grid>
							<Grid item xs={2}>
								<TextField
									name="required_date"
									label="Required Date"
									type="date"
									value={formData.required_date}
									onChange={handleChange}
									fullWidth
									variant="outlined"
									InputLabelProps={{ shrink: true }}
								/>
							</Grid>
						</Grid>
					</Grid>

					{/* Submit Button Row */}
					<Grid container spacing={2} sx={{ mt: 2 }}>
						<Grid item xs={2}>
							<Button type="submit" variant="contained" color="primary" fullWidth sx={{ margin: "16px" }}>
								Add
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</form>
		</Paper>
	);
};

export default OrderLineInput;
