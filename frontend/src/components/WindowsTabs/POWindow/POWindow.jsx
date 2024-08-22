import OrderLineInput from "../../OrderLineInput/OrderLineInput";
import OrderLineTable from "../../OrderLineTable/OrderLineTable";
import { useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";

function POWindow() {
	const [data, setData] = useState([]);
	const [staticArr, setStaticArr] = useState([]);

	const fetchData = async (filters) => {
		const queryParams = new URLSearchParams(filters).toString();
		const url = `http://localhost:8000/orders/?${queryParams}`;

		try {
			const response = await axios.get(url);
			setData(response.data);
			const newStaticArr = new Array(response.data.length).fill(true);
			setStaticArr(newStaticArr);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	return (
		<Grid>
			<OrderLineTable data={data} setData={setData} fetchData={fetchData} staticArr={staticArr} setStaticArr={setStaticArr} />
			<OrderLineInput fetchData={fetchData} />
		</Grid>
	);
}

export default POWindow;
