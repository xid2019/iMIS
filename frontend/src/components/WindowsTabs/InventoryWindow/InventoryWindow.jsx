import InventoryItemInput from "./InventoryItemInput/InventoryItemInput";
import InventoryItemTable from "./InventoryItemTable/InventoryItemTable";
import { Paper } from "@mui/material";

function InventoryWindow() {
	return (
		<Paper>
			<InventoryItemInput />
			<InventoryItemTable />
			{/* <InventoryRecordTable />
			<InventoryRecordInput /> */}
		</Paper>
	);
}

export default InventoryWindow;
