import { Paper, Grid, Button } from "@mui/material";
import InvoiceInput from "./InvoiceInput/InvoiceInput";
import InvoiceTable from "./InvoiceTable/InvoiceTable";
import ExtraChargeTable from "./ExtraChargeTable/ExtraChargeTable";
import ExtraChargeInput from "./ExtraChargeInput/ExtraChargeInput";
import AddressInput from "./AddressInput/AddressInput";
import { useSelector } from "react-redux";

function InvoiceWindow() {
	const { orderLineData, extraChargeData } = useSelector((state) => state.invoiceWindow);

	const handleGenerateInvoice = () => {
		console.log(orderLineData, extraChargeData);
	};

	return (
		<Paper>
			<InvoiceInput></InvoiceInput>
			<InvoiceTable></InvoiceTable>
			<ExtraChargeInput></ExtraChargeInput>
			<ExtraChargeTable></ExtraChargeTable>
			<AddressInput></AddressInput>
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
