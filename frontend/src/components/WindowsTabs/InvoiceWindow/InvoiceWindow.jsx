import { Paper, Grid, Button } from "@mui/material";
import InvoiceInput from "./InvoiceInput/InvoiceInput";
import InvoiceTable from "./InvoiceTable/InvoiceTable";
import ExtraChargeTable from "./ExtraChargeTable/ExtraChargeTable";
import ExtraChargeInput from "./ExtraChargeInput/ExtraChargeInput";
import AddressInput from "./AddressInput/AddressInput";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";

function InvoiceWindow() {
	const dispatch = useDispatch();
	const [invoiceKey, setInvoiceKey] = useState(0);
	const { orderLineData, extraChargeData, addressData } = useSelector((state) => state.invoiceWindow);

	const handleGenerateInvoice = () => {
		setInvoiceKey(invoiceKey + 1);
		axios
			.post("http://localhost:8000/invoices/create/", {
				orderLineData,
				extraChargeData,
				addressData,
			})
			.then(() => {
				dispatch({ type: "invoiceWindow/resetState" });
			})
			.catch((error) => {
				console.error("Failed to create invoice:", error);
			});
	};

	return (
		<Paper>
			<InvoiceInput key={invoiceKey} />
			<InvoiceTable />
			<ExtraChargeInput />
			<ExtraChargeTable />
			<AddressInput />
			<Grid container item spacing={2}>
				<Grid item xs={3}>
					<Button variant="contained" color="primary" onClick={handleGenerateInvoice} fullWidth>
						Generate Invoice
					</Button>
				</Grid>
			</Grid>
		</Paper>
	);
}

export default InvoiceWindow;
