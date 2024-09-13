import OrderLineInput from "./OrderLineInput/OrderLineInput";
import OrderLineEntries from "./OrderLineTable/OrderLineEntries";
import { Grid, Button, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../../redux/poEntryWindowSlice";

function POEntryWindow() {
	const dispatch = useDispatch();
	const { data } = useSelector((state) => state.poEntryWindow);
	const handleSave = async () => {
		dispatch(addOrder(data));
	};

	return (
		<Paper>
			<OrderLineInput />
			<OrderLineEntries data={data} />
			{data.length > 0 && (
				<Grid item>
					<Button variant="contained" color="primary" onClick={handleSave} sx={{ margin: "16px" }}>
						Save and generate PO
					</Button>
				</Grid>
			)}
		</Paper>
	);
}

export default POEntryWindow;
