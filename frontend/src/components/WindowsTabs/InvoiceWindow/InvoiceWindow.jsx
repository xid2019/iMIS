import { Paper, Grid, Button } from "@mui/material";
import InvoiceInput from "./InvoiceInput/InvoiceInput";
import InvoiceTable from "./InvoiceTable/InvoiceTable";
import ExtraChargeTable from "./ExtraChargeTable/ExtraChargeTable";
import ExtraChargeInput from "./ExtraChargeInput/ExtraChargeInput";
import AddressInput from "./AddressInput/AddressInput";
import { useSelector, useDispatch } from "react-redux";
import { updateOrderLine } from "../../../redux/invoiceWindow";
import { useState } from "react";
import axios from "axios";

function InvoiceWindow() {
	const dispatch = useDispatch();
	const [invoiceKey, setInvoiceKey] = useState(0);
	const { orderLineData, extraChargeData, addressData } = useSelector((state) => state.invoiceWindow);

	const handleGenerateInvoice = () => {
		const updatedOrderLineData = orderLineData.map((orderLine) => ({
			...orderLine,
			status: "INVOICED",
		}));
		// dispatch(updateOrderLine(updatedOrderLineData));
		setInvoiceKey(invoiceKey + 1);
		axios.post("http://localhost:8000/invoices/create/", {
			orderLineData,
			extraChargeData,
			addressData,
		});
		console.log(orderLineData, extraChargeData);
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
