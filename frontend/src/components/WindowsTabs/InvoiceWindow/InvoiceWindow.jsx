import { Paper, Grid, Button } from "@mui/material";
import InvoiceInput from "./InvoiceInput/InvoiceInput";
import InvoiceTable from "./InvoiceTable/InvoiceTable";
import { useState } from "react";
import ExtraChargeTable from "./ExtraChargeTable/ExtraChargeTable";
import ExtraChargeInput from "./ExtraChargeInput/ExtraChargeInput";
import AddressInput from "./AddressInput/AddressInput";

function InvoiceWindow() {
	const [data, setData] = useState({
		invoiceData: [],
		extraChargeData: [],
		addressData: {
			shipToAddressLine1: "",
			shipToAddressLine2: "",
			shipToAddressLine3: "",
			shipToAddressLine4: "",
			billToAddressLine1: "",
			billToAddressLine2: "",
			billToAddressLine3: "",
			billToAddressLine4: "",
		},
	});
	const [invoiceTableStaticArr, setInvoiceTableStaticArr] = useState([]);
	const [extraChargeTableStaticArr, setExtraChargeTableStaticArr] = useState([]);

	const handleGenerateInvoice = () => {
		console.log(data);
	};

	return (
		<Paper>
			<InvoiceInput setData={setData} setInvoiceTableStaticArr={setInvoiceTableStaticArr}></InvoiceInput>
			<InvoiceTable
				invoiceData={data.invoiceData}
				setData={setData}
				invoiceTableStaticArr={invoiceTableStaticArr}
				setInvoiceTableStaticArr={setInvoiceTableStaticArr}
			></InvoiceTable>
			<ExtraChargeInput setData={setData} setExtraChargeTableStaticArr={setExtraChargeTableStaticArr}></ExtraChargeInput>
			<ExtraChargeTable
				setData={setData}
				extraChargeData={data.extraChargeData}
				extraChargeTableStaticArr={extraChargeTableStaticArr}
				setExtraChargeTableStaticArr={setExtraChargeTableStaticArr}
			></ExtraChargeTable>
			<AddressInput
				customerId={data.invoiceData.length > 0 ? data.invoiceData[0].customer_id : ""}
				addressData={data.addressData}
				setData={setData}
			></AddressInput>
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
