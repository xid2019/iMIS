import OrderLineInput from "../../OrderLineInput/OrderLineInput";
import OrderLineEntries from "./OrderLineTable/OrderLineEntries";
import { useState } from "react";
import { Grid, Button } from "@mui/material";
import axios from "axios";

function POEntryWindow() {
	const [data, setData] = useState([]);
	const [staticArr, setStaticArr] = useState([]);

	const handleSave = async () => {
		try {
			const response = await axios.post("http://localhost:8000/orders/create/", data);
			console.log("Data saved successfully:", response.data);
			setData([]);
			setStaticArr([]);
		} catch (error) {
			console.error("Error saving data:", error);
		}
	};

	return (
		<Grid>
			<OrderLineInput data={data} setData={setData} staticArr={staticArr} setStaticArr={setStaticArr} />
			<OrderLineEntries data={data} setData={setData} staticArr={staticArr} setStaticArr={setStaticArr} />
			{data.length > 0 && (
				<Grid item>
					<Button variant="contained" color="primary" onClick={handleSave}>
						Save and generate PO
					</Button>
				</Grid>
			)}
		</Grid>
	);
}

export default POEntryWindow;
