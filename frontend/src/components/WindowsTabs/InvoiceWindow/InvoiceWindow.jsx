import { Paper, Grid, Button } from "@mui/material";
import InvoiceInput from "./InvoiceInput/InvoiceInput";
import InvoiceTable from "./InvoiceTable/InvoiceTable";
import { useState } from "react";
import ExtraChargeTable from "./ExtraChargeTable/ExtraChargeTable";

function InvoiceWindow() {
	const [data, setData] = useState([]);
	const [staticArr, setStaticArr] = useState([]);
	const handleGenerateInvoice = () => {
		console.log(data);
	};

	return (
		<Paper>
			<InvoiceInput setData={setData} staticArr={staticArr} setStaticArr={setStaticArr}></InvoiceInput>
			<InvoiceTable data={data} setData={setData} staticArr={staticArr} setStaticArr={setStaticArr}></InvoiceTable>
			<ExtraChargeTable></ExtraChargeTable>
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
