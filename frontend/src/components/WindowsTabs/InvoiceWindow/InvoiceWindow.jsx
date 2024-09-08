import { Paper } from "@mui/material";
import InvoiceInput from "./InvoiceInput/InvoiceInput";
import InvoiceTable from "./InvoiceTable/InvoiceTable";
import { useState } from "react";

function InvoiceWindow() {
	const [data, setData] = useState([]);
	const [staticArr, setStaticArr] = useState([]);
	return (
		<Paper>
			<InvoiceInput setData={setData} staticArr={staticArr} setStaticArr={setStaticArr}></InvoiceInput>
			<InvoiceTable data={data} setData={setData} staticArr={staticArr} setStaticArr={setStaticArr}></InvoiceTable>
		</Paper>
	);
}

export default InvoiceWindow;
